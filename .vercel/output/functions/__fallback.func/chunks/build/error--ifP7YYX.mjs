import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CLFMLnn_.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'vue-router';

const _imports_0 = "" + buildAssetsURL("404_bg.C5b-K3YP.png");
const _sfc_main = {
  name: "ErrorLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.error.statusCode === 404 ? "404 Not Found" : "An error occurred"
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-[#f4f5f5]" }, _attrs))}>`);
  if ($props.error.statusCode === 404) {
    _push(`<div class="text-center"><img${ssrRenderAttr("src", _imports_0)} alt="404" class="w-96 mx-auto"><h1 class="text-2xl font-bold text-gray-800 mt-6">\u9875\u9762\u4E0D\u5B58\u5728\uFF01</h1><p class="text-gray-500 mt-2">${ssrInterpolate($props.error.message || "\u8BF7\u68C0\u67E5URL\u5730\u5740\u662F\u5426\u6B63\u786E")}</p>`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: "/",
      class: "inline-block mt-6 bg-[#1e80ff] text-white px-6 py-2 rounded hover:bg-[#1171ee] transition-colors no-underline"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` \u56DE\u5230\u9996\u9875 `);
        } else {
          return [
            createTextVNode(" \u56DE\u5230\u9996\u9875 ")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else {
    _push(`<div class="text-center"><h1 class="text-2xl font-bold text-gray-800">An error occurred</h1>`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: "/",
      class: "inline-block mt-6 bg-[#1e80ff] text-white px-6 py-2 rounded hover:bg-[#1171ee] transition-colors no-underline"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(` \u56DE\u5230\u9996\u9875 `);
        } else {
          return [
            createTextVNode(" \u56DE\u5230\u9996\u9875 ")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { error as default };
//# sourceMappingURL=error--ifP7YYX.mjs.map
