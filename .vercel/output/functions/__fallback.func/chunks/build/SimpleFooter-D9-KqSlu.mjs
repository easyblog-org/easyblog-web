import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  name: "SimpleFooter",
  computed: {
    currentYear() {
      return (/* @__PURE__ */ new Date()).getFullYear();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center my-6 lg:my-0 lg:mt-auto lg:py-5" }, _attrs))}><p class="text-sm text-gray-500 dark:text-gray-500"> \xA9${ssrInterpolate($options.currentYear)} EasyBlog \u7248\u6743\u6240\u6709. Powered by Nuxt. </p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SimpleFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SimpleFooter = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { SimpleFooter as S };
//# sourceMappingURL=SimpleFooter-D9-KqSlu.mjs.map
