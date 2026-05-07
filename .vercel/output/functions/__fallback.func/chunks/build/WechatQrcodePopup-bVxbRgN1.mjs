import { ref, watch, nextTick, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/gzh_qrcode_wx.jpg");
const _sfc_main = {
  __name: "WechatQrcodePopup",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ["input"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const popup = ref(null);
    const visible = ref(props.value);
    watch(() => props.value, (val) => {
      visible.value = val;
      if (val) {
        nextTick(() => moveToBody());
      } else {
        moveToSelf();
      }
    });
    function moveToBody() {
      const el = popup.value;
      if (el && el.parentNode !== (void 0).body) {
        el.style.display = "";
        (void 0).body.appendChild(el);
      }
    }
    function moveToSelf() {
      const el = popup.value;
      if (el && el.parentNode === (void 0).body) {
        el.style.display = "none";
        el.parentNode.removeChild(el);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(visible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          ref_key: "popup",
          ref: popup,
          class: "wechat-popup-wrapper",
          style: { "display": "none" }
        }, _attrs))} data-v-2bcc6bbc><div class="fixed inset-0 z-[9999] flex items-center justify-center" data-v-2bcc6bbc><div class="absolute inset-0 bg-black/50 backdrop-blur-sm" data-v-2bcc6bbc></div><div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 max-w-xs w-full z-10" data-v-2bcc6bbc><button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" data-v-2bcc6bbc><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bcc6bbc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-2bcc6bbc></path></svg></button><div class="text-center" data-v-2bcc6bbc><p class="text-lg font-semibold text-gray-900 dark:text-white mb-1" data-v-2bcc6bbc>\u5173\u6CE8\u516C\u4F17\u53F7</p><p class="text-sm text-gray-500 dark:text-gray-400 mb-4" data-v-2bcc6bbc>\u626B\u7801\u83B7\u53D6\u66F4\u591A\u7CBE\u5F69\u5185\u5BB9</p><div class="bg-white p-3 rounded-xl inline-block shadow-inner" data-v-2bcc6bbc><img${ssrRenderAttr("src", _imports_0)} alt="\u5FAE\u4FE1\u516C\u4F17\u53F7\u4E8C\u7EF4\u7801" class="w-48 h-48 object-contain" data-v-2bcc6bbc></div><p class="text-xs text-gray-400 dark:text-gray-500 mt-4" data-v-2bcc6bbc>\u5FAE\u4FE1\u626B\u4E00\u626B\u5173\u6CE8</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/WechatQrcodePopup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2bcc6bbc"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=WechatQrcodePopup-bVxbRgN1.mjs.map
