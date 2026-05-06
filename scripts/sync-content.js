const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const CONTENT_REPO = process.env.CONTENT_REPO_URL || 'https://github.com/easyblog-org/oh_my_note.git'
const CONTENT_BRANCH = process.env.CONTENT_REPO_BRANCH || 'main'
const ARTICLES_DIR = path.resolve(__dirname, '../content/articles')
const TEMP_DIR = path.resolve(__dirname, '../.temp-content')

function log(msg) {
  console.log(`[sync-content] ${new Date().toISOString()} ${msg}`)
}

function run(cmd) {
  return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' })
}

function hashDir(dir) {
  const files = []
  function walk(d) {
    if (!fs.existsSync(d)) return
    fs.readdirSync(d).forEach(f => {
      const fp = path.join(d, f)
      if (fs.statSync(fp).isDirectory()) walk(fp)
      else if (f.endsWith('.md')) files.push(fp)
    })
  }
  walk(dir)
  if (!files.length) return 'empty'
  files.sort()
  const content = files.map(f => fs.readFileSync(f, 'utf-8')).join('---SEP---')
  return crypto.createHash('md5').update(content).digest('hex')
}

function findArticlesSource(repoDir) {
  const candidates = [
    path.join(repoDir, 'content/articles'),
    path.join(repoDir, 'articles'),
    path.join(repoDir, 'content'),
    repoDir,
  ]
  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      const mdFiles = []
      function walk(d) {
        fs.readdirSync(d).forEach(f => {
          const fp = path.join(d, f)
          if (fs.statSync(fp).isDirectory()) walk(fp)
          else if (f.endsWith('.md')) mdFiles.push(fp)
        })
      }
      walk(dir)
      if (mdFiles.length > 0) {
        log(`Found ${mdFiles.length} .md files in: ${path.relative(repoDir, dir) || '(root)'}`)
        return dir
      }
    }
  }
  return null
}

function main() {
  log('Starting content sync...')
  log(`Repo: ${CONTENT_REPO}`)
  log(`Branch: ${CONTENT_BRANCH}`)
  log(`Target: ${ARTICLES_DIR}`)

  const currentHash = hashDir(ARTICLES_DIR)
  log(`Current hash: ${currentHash}`)

  if (fs.existsSync(TEMP_DIR)) {
    run(`rm -rf "${TEMP_DIR}"`)
  }

  try {
    log('Cloning content repo...')
    run(`git clone --depth 1 --branch ${CONTENT_BRANCH} "${CONTENT_REPO}" "${TEMP_DIR}" 2>&1`)
  } catch (e) {
    log(`⚠️ Clone failed (repo may be empty): ${e.message.split('\n')[0]}`)
    if (fs.existsSync(TEMP_DIR)) run(`rm -rf "${TEMP_DIR}"`)
    log('Skipping sync - keeping current articles')
    return
  }

  const sourceDir = findArticlesSource(TEMP_DIR)
  if (!sourceDir) {
    log('⚠️ No .md files found in content repo')
    run(`rm -rf "${TEMP_DIR}"`)
    return
  }

  const newHash = hashDir(sourceDir)
  log(`New hash: ${newHash}`)

  if (currentHash === newHash) {
    log('No content changes. Skipping sync.')
    run(`rm -rf "${TEMP_DIR}"`)
    return
  }

  log('Content changed! Syncing...')
  if (fs.existsSync(ARTICLES_DIR)) {
    run(`rm -rf "${ARTICLES_DIR}"`)
  }
  fs.mkdirSync(ARTICLES_DIR, { recursive: true })
  run(`cp -r "${sourceDir}/." "${ARTICLES_DIR}/"`)

  const count = (function walk(d) {
    let n = 0
    fs.readdirSync(d).forEach(f => {
      const fp = path.join(d, f)
      if (fs.statSync(fp).isDirectory()) n += walk(fp)
      else if (f.endsWith('.md')) n++
    })
    return n
  })(ARTICLES_DIR)
  log(`✅ Synced ${count} articles`)

  run(`rm -rf "${TEMP_DIR}"`)
}

main()
