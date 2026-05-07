import { _ as __nuxt_component_0 } from './nuxt-link-CLFMLnn_.mjs';
import { computed, withAsyncContext, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './WechatQrcodePopup-bVxbRgN1.mjs';
import { S as SimpleFooter } from './SimpleFooter-D9-KqSlu.mjs';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { u as useBlogStore } from './blog-DxN2HMop.mjs';
import { u as useFetch } from './fetch-Be3q_yDP.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'vue-router';
import '@vue/shared';
import './asyncData-XcM_Kn_o.mjs';
import 'perfect-debounce';

const _sfc_main$2 = {
  name: "PostTOC",
  props: {
    headings: { type: Array, default: () => [] }
  },
  data() {
    return {
      activeId: "",
      _observer: null
    };
  },
  watch: {
    headings: {
      handler() {
        this.$nextTick(() => this.setupObserver());
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => this.setupObserver());
  },
  beforeDestroy() {
    if (this._observer) this._observer.disconnect();
  },
  methods: {
    scrollTo(id) {
      const el = (void 0).getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + (void 0).pageYOffset - offset;
        (void 0).scrollTo({ top, behavior: "smooth" });
        this.activeId = id;
      }
    },
    setupObserver() {
      if (this._observer) this._observer.disconnect();
      if (!this.headings.length || typeof IntersectionObserver === "undefined") return;
      const headingEls = [];
      this.headings.forEach((h) => {
        const el = (void 0).getElementById(h.id);
        if (el) headingEls.push(el);
      });
      if (!headingEls.length) return;
      this._observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length) {
            const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            this.activeId = sorted[0].target.id;
          }
        },
        { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
      );
      headingEls.forEach((el) => this._observer.observe(el));
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($props.headings.length > 0) {
    _push(`<nav${ssrRenderAttrs(mergeProps({ class: "space-y-1" }, _attrs))}><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">\u76EE\u5F55</h3><ul class="space-y-1 text-sm"><!--[-->`);
    ssrRenderList($props.headings, (h, i) => {
      _push(`<li><a${ssrRenderAttr("href", "#" + h.id)} class="${ssrRenderClass([
        "block no-underline transition-colors duration-200 hover:text-primary",
        h.level === 2 ? "text-gray-600 dark:text-gray-400" : "text-gray-400 dark:text-gray-500 pl-3 text-xs",
        $data.activeId === h.id ? "text-primary font-medium border-l-2 border-primary pl-2" : "border-l-2 border-transparent pl-2"
      ])}">${ssrInterpolate(h.text)}</a></li>`);
    });
    _push(`<!--]--></ul></nav>`);
  } else {
    _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">\u76EE\u5F55</h3><p class="text-sm text-gray-400 dark:text-gray-500">\u6682\u65E0\u76EE\u5F55</p></div>`);
  }
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/PostTOC.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  name: "AuthorCard",
  components: { WechatQrcodePopup: __nuxt_component_0$1 },
  data() {
    return {
      showWechatQrcode: false
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_WechatQrcodePopup = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex items-start gap-4" }, _attrs))}><a href="https://www.xinxinnote.tech/about" target="_blank" rel="noopener" class="flex-shrink-0 group" title="\u8BBF\u95EE\u4E2A\u4EBA\u4E3B\u9875"><div class="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary/30 transition-all overflow-hidden"><img src="https://www.xinxinnote.tech/images/my.webp" alt="Frank" class="w-full h-full object-cover"></div></a><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><h4 class="font-semibold text-gray-900 dark:text-white text-sm">\u9EC4\u946B (Frank)</h4><a href="https://www.xinxinnote.tech/about" target="_blank" rel="noopener" class="text-[11px] text-primary hover:text-primary-hover transition-colors no-underline whitespace-nowrap"> \u67E5\u770B\u8BE6\u60C5 \u2192 </a></div><p class="text-xs text-gray-500 dark:text-gray-400 mt-1">\u540E\u7AEF\u5DE5\u7A0B\u5E08 &amp; AI \u5DE5\u7A0B\u5316\u63A2\u7D22\u8005\u3002\u4FDD\u6301\u597D\u5947\uFF0C\u8010\u5FC3\u6253\u78E8\u3002</p><div class="flex items-center gap-3 mt-2"><a href="https://github.com" target="_blank" rel="noopener" class="text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a><a href="https://juejin.cn" target="_blank" rel="noopener" class="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary transition-colors" title="\u6398\u91D1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7796" width="24" height="24"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="currentColor" p-id="7797"></path></svg></a><button class="text-gray-400 hover:text-[#29AE66] dark:text-[#29AE66]dark:hover:text-[#29AE66] transition-colors cursor-pointer bg-transparent border-0 p-0" title="\u5FAE\u4FE1\u516C\u4F17\u53F7"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.3c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"></path></svg></button></div></div>`);
  _push(ssrRenderComponent(_component_WechatQrcodePopup, {
    value: $data.showWechatQrcode,
    onInput: ($event) => $data.showWechatQrcode = $event
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/AuthorCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const renderer = new marked.Renderer();
    renderer.code = function({ text, lang }) {
      const language = lang || "plaintext";
      let highlighted;
      try {
        highlighted = hljs.highlight(text, { language }).value;
      } catch (e) {
        highlighted = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      const lines = text.split("\n");
      const lineNumbersHtml = lines.map((_, i) => `<span class="ln">${i + 1}</span>`).join("");
      const codeId = "code-" + Math.random().toString(36).substr(2, 9);
      return `
    <figure class="code-block" data-lang="${language}">
      <figcaption class="code-header">
        <span class="code-lang-dot">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </span>
        <span class="code-lang-name">${language}</span>
        <button class="code-copy" data-target="${codeId}" onclick="const t=this;const c=document.getElementById(t.dataset.target);navigator.clipboard.writeText(c.textContent).then(()=>{t.classList.add('copied');t.innerHTML='<svg viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='currentColor' stroke-width='2'><polyline points='20 6 9 17 4 12'/></svg>\u5DF2\u590D\u5236';setTimeout(()=>{t.classList.remove('copied');t.innerHTML='<svg viewBox='\\'0 0 24 24\\' width=\\'14\\' height=\\'14\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><rect x=\\'9\\' y=\\'9\\' width=\\'13\\' height=\\'13\\' rx=\\'2\\' ry=\\'2\\'></rect><path d=\\'M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1\\'></path></svg>\u590D\u5236\u4EE3\u7801';},2000)})">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
          \u590D\u5236\u4EE3\u7801
        </button>
      </figcaption>
      <div class="code-body">
        <div class="line-numbers" aria-hidden="true">${lineNumbersHtml}</div>
        <pre class="code-pre"><code id="${codeId}" class="hljs language-${language}">${highlighted}</code></pre>
      </div>
    </figure>
  `;
    };
    marked.setOptions({
      breaks: true,
      gfm: true,
      renderer
    });
    const route = useRoute();
    const blogStore = useBlogStore();
    const slug = computed(() => route.params.slug);
    const { data: apiData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/articles",
      {
        key: "articles-data"
      },
      "$o2z8xWIpWF"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const allArticles = computed(() => {
      var _a;
      const storeArticles = blogStore.articles || [];
      if (storeArticles.length > 0) return storeArticles;
      return ((_a = apiData.value) == null ? void 0 : _a.articles) || [];
    });
    const article = computed(() => {
      const articles = allArticles.value || [];
      const found = articles.find((a) => a.slug === slug.value);
      if (found) {
        return { ...found, _rawBody: found.body || "" };
      }
      return { title: "\u6587\u7AE0\u672A\u627E\u5230", slug: slug.value, date: "", _rawBody: "", tags: [], category: "" };
    });
    const renderedBody = computed(() => {
      const body = article.value._rawBody || "";
      if (!body) return "";
      return marked.parse(body);
    });
    const currentIndex = computed(() => allArticles.value.findIndex((a) => a.slug === slug.value));
    const prevArticle = computed(() => {
      if (currentIndex.value > 0) return allArticles.value[currentIndex.value - 1];
      return null;
    });
    const nextArticle = computed(() => {
      if (currentIndex.value >= 0 && currentIndex.value < allArticles.value.length - 1) return allArticles.value[currentIndex.value + 1];
      return null;
    });
    const tocHeadings = ref([]);
    const viewCount = ref(0);
    const likeCount = ref(0);
    const liked = ref(false);
    const loaded = ref(false);
    const showToast = ref(false);
    const readingTime = computed(() => {
      let body = article.value._rawBody || "";
      if (!body && typeof article.value.body === "string") {
        body = article.value.body;
      }
      if (!body) return 1;
      const text = String(body).replace(/[#*`\-()[\]{}>!|\\]/g, "").replace(/\s+/g, "");
      const charCount = text.length;
      const minutes = Math.max(1, Math.ceil(charCount / 300));
      return minutes;
    });
    const relatedArticles = computed(() => {
      const all = allArticles.value || [];
      const currentSlug = article.value.slug || "";
      const currentTags = article.value.tags || [];
      const currentCategory = article.value.category || "";
      return all.filter((a) => a.slug !== currentSlug).map((a) => {
        let score = 0;
        if (currentCategory && a.category === currentCategory) score += 2;
        (a.tags || []).forEach((t) => {
          if (currentTags.includes(t)) score += 1;
        });
        return { ...a, _score: score };
      }).filter((a) => a._score > 0).sort((a, b) => b._score - a._score).slice(0, 5);
    });
    function formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_PostTOC = __nuxt_component_1;
      const _component_AuthorCard = __nuxt_component_2;
      const _component_SimpleFooter = SimpleFooter;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))} data-v-8c3b5191>`);
      if (unref(showToast)) {
        _push(`<div class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none" data-v-8c3b5191> \u94FE\u63A5\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-6xl mx-auto px-4 py-6 w-full flex-1" data-v-8c3b5191><div class="flex flex-col-reverse lg:flex-row gap-6" data-v-8c3b5191><div class="lg:w-3/4" data-v-8c3b5191><article class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 article-fade-in", { "is-loaded": unref(loaded) }])}" data-v-8c3b5191><h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3" data-v-8c3b5191>${ssrInterpolate(unref(article).title || "\u52A0\u8F7D\u4E2D...")}</h1><div class="${ssrRenderClass(["flex items-center gap-3 mb-6 text-sm text-gray-400 dark:text-gray-500 flex-wrap article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "80ms" })}" data-v-8c3b5191><span data-v-8c3b5191>${ssrInterpolate(formatDate(unref(article).date))}</span>`);
      if (unref(article).category) {
        _push(`<span data-v-8c3b5191>\xB7 ${ssrInterpolate(unref(article).category)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-8c3b5191>\xB7 ${ssrInterpolate(unref(viewCount))} \u6B21\u9605\u8BFB</span><span data-v-8c3b5191>\xB7 \u9605\u8BFB\u7EA6 ${ssrInterpolate(unref(readingTime))} \u5206\u949F</span></div><div class="${ssrRenderClass([{ "is-loaded": unref(loaded) }, "nuxt-content prose prose-sm dark:prose-invert max-w-none article-fade-in"])}" style="${ssrRenderStyle({ "transition-delay": "160ms" })}" data-v-8c3b5191><div class="text-gray-700 dark:text-gray-300 leading-relaxed" data-v-8c3b5191>${(_a = unref(renderedBody)) != null ? _a : ""}</div></div><div class="${ssrRenderClass(["mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "200ms" })}" data-v-8c3b5191><div class="flex items-center justify-between" data-v-8c3b5191><button class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" data-v-8c3b5191><svg class="${ssrRenderClass(["w-5 h-5", unref(liked) ? "text-red-500 fill-red-500" : ""])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8c3b5191><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-8c3b5191></path></svg><span data-v-8c3b5191>${ssrInterpolate(unref(likeCount))}</span></button><button class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" data-v-8c3b5191><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8c3b5191><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" data-v-8c3b5191></path></svg><span data-v-8c3b5191>\u5206\u4EAB</span></button></div></div></article>`);
      if (unref(prevArticle) || unref(nextArticle)) {
        _push(`<div class="${ssrRenderClass(["mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "260ms" })}" data-v-8c3b5191>`);
        if (unref(prevArticle)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/article/" + unref(prevArticle).slug,
            class: "bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 no-underline hover:border-primary/30 dark:hover:border-primary/30 transition-colors group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-gray-400 dark:text-gray-500" data-v-8c3b5191${_scopeId}>\u2190 \u4E0A\u4E00\u7BC7</span><p class="text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1" data-v-8c3b5191${_scopeId}>${ssrInterpolate(unref(prevArticle).title)}</p>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-gray-400 dark:text-gray-500" }, "\u2190 \u4E0A\u4E00\u7BC7"),
                  createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1" }, toDisplayString(unref(prevArticle).title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="hidden sm:block" data-v-8c3b5191></div>`);
        }
        if (unref(nextArticle)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/article/" + unref(nextArticle).slug,
            class: "bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 no-underline hover:border-primary/30 dark:hover:border-primary/30 transition-colors group text-right"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-gray-400 dark:text-gray-500" data-v-8c3b5191${_scopeId}>\u4E0B\u4E00\u7BC7 \u2192</span><p class="text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1" data-v-8c3b5191${_scopeId}>${ssrInterpolate(unref(nextArticle).title)}</p>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-gray-400 dark:text-gray-500" }, "\u4E0B\u4E00\u7BC7 \u2192"),
                  createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white mt-1 group-hover:text-primary transition-colors line-clamp-1" }, toDisplayString(unref(nextArticle).title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(["mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "320ms" })}" data-v-8c3b5191><h3 class="font-semibold text-gray-900 dark:text-white mb-4 text-sm" data-v-8c3b5191>\u8BC4\u8BBA</h3><p class="text-sm text-gray-400 dark:text-gray-500" data-v-8c3b5191>\u8BC4\u8BBA\u529F\u80FD\u5373\u5C06\u4E0A\u7EBF\uFF0C\u656C\u8BF7\u671F\u5F85...</p></div></div><div class="lg:w-1/4 hidden lg:block" data-v-8c3b5191><div class="sticky top-20 space-y-4" data-v-8c3b5191><div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "200ms" })}" data-v-8c3b5191>`);
      _push(ssrRenderComponent(_component_PostTOC, { headings: unref(tocHeadings) }, null, _parent));
      _push(`</div>`);
      if (unref(relatedArticles).length > 0) {
        _push(`<div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "280ms" })}" data-v-8c3b5191><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm" data-v-8c3b5191>\u{1F4CC} \u63A8\u8350\u9605\u8BFB</h3><div class="space-y-3" data-v-8c3b5191><!--[-->`);
        ssrRenderList(unref(relatedArticles), (ra) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: ra.slug,
            to: "/article/" + ra.slug,
            class: "block group no-underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2 leading-snug" data-v-8c3b5191${_scopeId}>${ssrInterpolate(ra.title)}</p>`);
                if (ra.category) {
                  _push2(`<span class="text-xs text-gray-400 dark:text-gray-500 mt-1 block" data-v-8c3b5191${_scopeId}>${ssrInterpolate(ra.category)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createVNode("p", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2 leading-snug" }, toDisplayString(ra.title), 1),
                  ra.category ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-xs text-gray-400 dark:text-gray-500 mt-1 block"
                  }, toDisplayString(ra.category), 1)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(article).tags && unref(article).tags.length > 0) {
        _push(`<div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "360ms" })}" data-v-8c3b5191><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm" data-v-8c3b5191>\u{1F3F7}\uFE0F \u6587\u7AE0\u6807\u7B7E</h3><div class="flex flex-wrap gap-2" data-v-8c3b5191><!--[-->`);
        ssrRenderList(unref(article).tags, (tag) => {
          _push(`<span class="text-xs px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full" data-v-8c3b5191>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(["article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "420ms" })}" data-v-8c3b5191>`);
      _push(ssrRenderComponent(_component_AuthorCard, null, null, _parent));
      _push(`</div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_SimpleFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c3b5191"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-CDFR8Slu.mjs.map
