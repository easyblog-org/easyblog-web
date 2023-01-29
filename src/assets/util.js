import {SYSTEM_CONSTANTS} from "@/assets/global";

export const _code_chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export const _code_color1 = ['#fffff0', '#f0ffff', '#f0fff0', '#fff0f0']
export const _code_color2 = ['#FF0033', '#006699', '#993366', '#FF9900', '#66CC66', '#FF33CC']

/**
 * 判断是否移动端
 * @returns {boolean}
 */
export function isMobile() {
  if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    //移动端
    return true
  }
  return false
}

/**
 * 请求是否成功
 * @param rc
 * @returns {boolean}
 */
export function isSuccess(rc) {
  return SYSTEM_CONSTANTS.SUCCESS === rc;
}

export function resetSize(vm) {
  //图片的宽度、高度，移动条的宽度、高度
  var img_width, img_height, bar_width, bar_height, block_width, block_height, circle_radius

  var parentWidth = vm.$el.parentNode.offsetWidth || window.offsetWidth
  var parentHeight = vm.$el.parentNode.offsetHeight || window.offsetHeight
  if (vm.imgSize.width.indexOf('%') !== -1) {
    img_width = parseInt(this.imgSize.width) / 100 * parentWidth + 'px'
  } else {
    img_width = this.imgSize.width
  }

  if (vm.imgSize.height.indexOf('%') !== -1) {
    img_height = parseInt(this.imgSize.height) / 100 * parentHeight + 'px'
  } else {
    img_height = this.imgSize.height
  }

  if (vm.barSize.width.indexOf('%') !== -1) {
    bar_width = parseInt(this.barSize.width) / 100 * parentWidth + 'px'
  } else {
    bar_width = this.barSize.width
  }

  if (vm.barSize.height.indexOf('%') !== -1) {
    bar_height = parseInt(this.barSize.height) / 100 * parentHeight + 'px'
  } else {
    bar_height = this.barSize.height
  }

  if (vm.blockSize) {
    if (vm.blockSize.width.indexOf('%') !== -1) {
      block_width = parseInt(this.blockSize.width) / 100 * parentWidth + 'px'
    } else {
      block_width = this.blockSize.width
    }
    if (vm.blockSize.height.indexOf('%') !== -1) {
      block_height = parseInt(this.blockSize.height) / 100 * parentHeight + 'px'
    } else {
      block_height = this.blockSize.height
    }
  }
  if (vm.circleRadius.indexOf('%') !== -1) {
    circle_radius = parseInt(this.circleRadius) / 100 * parentHeight + 'px'
  } else {
    circle_radius = this.circleRadius
  }

  return {
    imgWidth: img_width,
    imgHeight: img_height,
    barWidth: bar_width,
    barHeight: bar_height,
    circleRadius: circle_radius,
    blockWidth: block_width,
    blockHeight: block_height
  }
}

/**
 * 格式化时间
 * @param timestamp  时间戳
 * @param pattern    时间样式
 * @returns {string}
 */
export function formatDate(timestamp, pattern) {
  if (timestamp != null) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const mon = (date.getMonth() + 1 + '').padStart(2, '0')
    const day = (date.getMonth() + 1 + '').padStart(2, '0')
    const hour = (date.getMonth() + 1 + '').padStart(2, '0')
    const min = (date.getMonth() + 1 + '').padStart(2, '0')
    const sec = (date.getMonth() + 1 + '').padStart(2, '0')

    if (pattern === 'yyyy-MM-dd HH:mm:ss') {
      return `${year}-${mon}-${day} ${hour}:${min}:${sec}`
    } else if (pattern === 'yyyy-MM-dd HH:mm') {
      return `${year}-${mon}-${day} ${hour}:${min}`
    } else if (pattern === 'yyyy-MM-dd HH') {
      return `${year}-${mon}-${day} ${hour}`
    } else if (pattern === 'yyyy-MM-dd') {
      return `${year}-${mon}-${day}`
    } else if (pattern === 'yyyy-MM') {
      return `${year}-${mon}`
    } else if (pattern === 'yyyy') {
      return `${year}`
    } else if (pattern === 'HH:mm:ss') {
      return `${hour}:${min}:${sec}`
    }
  }
  return ''
}
