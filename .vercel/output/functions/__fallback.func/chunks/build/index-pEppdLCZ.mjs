import { ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const showCollection = ref(true);
    const collections = [
      { slug: "backend-practice", title: "\u540E\u7AEF\u5DE5\u7A0B\u5B9E\u8DF5", description: "\u4ECE\u96F6\u6784\u5EFA\u9AD8\u53EF\u7528\u540E\u7AEF\u7CFB\u7EDF\uFF0C\u6DB5\u76D6\u5FAE\u670D\u52A1\u67B6\u6784\u3001\u6570\u636E\u5E93\u4F18\u5316\u3001\u7F13\u5B58\u7B56\u7565\u3001\u6D88\u606F\u961F\u5217\u7B49\u6838\u5FC3\u4E3B\u9898\u3002", price: "\xA599", articleCount: 12 },
      { slug: "ai-exploration", title: "AI \u63A2\u7D22\u7B14\u8BB0", description: "AI \u5E94\u7528\u5F00\u53D1\u5B9E\u6218\u8BB0\u5F55\uFF0C\u4ECE LLM \u539F\u7406\u5230 RAG \u7CFB\u7EDF\u3001Agent \u5F00\u53D1\u7684\u5B8C\u6574\u5B66\u4E60\u8DEF\u5F84\u3002", price: "\xA549", articleCount: 8 },
      { slug: "devops-toolkit", title: "DevOps \u5DE5\u5177\u7BB1", description: "CI/CD\u3001\u5BB9\u5668\u5316\u3001Kubernetes\u3001\u76D1\u63A7\u544A\u8B66\u7B49\u8FD0\u7EF4\u5F00\u53D1\u5B9E\u8DF5\u6307\u5357\u3002", price: "\xA569", articleCount: 10 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(showCollection)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto px-4 py-6" }, _attrs))}><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">\u4E13\u680F</h1><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(collections, (col) => {
          _push(`<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 flex flex-col"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div><div><h3 class="font-bold text-gray-900 dark:text-white">${ssrInterpolate(col.title)}</h3><span class="text-xs text-gray-400 dark:text-gray-500">${ssrInterpolate(col.articleCount)} \u7BC7\u6587\u7AE0</span></div></div><p class="text-sm text-gray-500 dark:text-gray-400 flex-1">${ssrInterpolate(col.description)}</p><div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800"><span class="text-lg font-bold text-primary">${ssrInterpolate(col.price)}</span><button class="bg-primary text-white px-5 py-2 rounded-lg text-sm hover:bg-primary-hover transition-colors">\u8BA2\u9605\u4E13\u680F</button></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/collections/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-pEppdLCZ.mjs.map
