import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { S as SimpleFooter } from './SimpleFooter-D9-KqSlu.mjs';
import './server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}><div class="max-w-4xl mx-auto px-4 py-6 w-full flex-1"><div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10"><div class="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">\u514D\u8D23\u58F0\u660E</h1><p class="text-sm text-gray-400 dark:text-gray-500 mt-2">\u6700\u540E\u66F4\u65B0\uFF1A2026 \u5E74 5 \u6708 15 \u65E5</p></div><div class="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed"><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u4E00\u3001\u4FE1\u606F\u4EC5\u4F9B\u53C2\u8003</h2><p>\u672C\u7F51\u7AD9\uFF08EasyBlog\uFF09\u53D1\u5E03\u7684\u6280\u672F\u6587\u7AE0\u3001\u4EE3\u7801\u793A\u4F8B\u3001AI \u63A2\u7D22\u7B14\u8BB0\u7B49\u5185\u5BB9\uFF0C\u4EC5\u4F9B\u5B66\u4E60\u4EA4\u6D41\u53C2\u8003\uFF0C\u4E0D\u6784\u6210\u4EFB\u4F55\u4E13\u4E1A\u5EFA\u8BAE\u6216\u6B63\u5F0F\u6307\u5BFC\u3002\u8BFB\u8005\u5728\u53C2\u8003\u672C\u7AD9\u5185\u5BB9\u8FDB\u884C\u4EFB\u4F55\u64CD\u4F5C\u524D\uFF0C\u5E94\u7ED3\u5408\u81EA\u8EAB\u5B9E\u9645\u60C5\u51B5\u72EC\u7ACB\u5224\u65AD\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u4E8C\u3001\u98CE\u9669\u81EA\u62C5</h2><p>\u8BFB\u8005\u57FA\u4E8E\u672C\u7AD9\u5185\u5BB9\u6240\u505A\u51FA\u7684\u4EFB\u4F55\u51B3\u7B56\u6216\u64CD\u4F5C\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u4EE3\u7801\u90E8\u7F72\u3001\u7CFB\u7EDF\u914D\u7F6E\u3001\u5DE5\u5177\u4F7F\u7528\u7B49\uFF09\uFF0C\u5176\u98CE\u9669\u7531\u8BFB\u8005\u81EA\u884C\u627F\u62C5\u3002\u56E0\u53C2\u7167\u672C\u7AD9\u5185\u5BB9\u64CD\u4F5C\u800C\u5BFC\u81F4\u7684\u6570\u636E\u4E22\u5931\u3001\u7CFB\u7EDF\u6545\u969C\u3001\u5B89\u5168\u6F0F\u6D1E\u6216\u5176\u4ED6\u4EFB\u4F55\u635F\u5931\uFF0C\u672C\u7AD9\u53CA\u4F5C\u8005\u4E0D\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u4E09\u3001\u65F6\u6548\u6027\u58F0\u660E</h2><p>\u6280\u672F\u9886\u57DF\u8FED\u4EE3\u8FC5\u901F\uFF0C\u672C\u7AD9\u6587\u7AE0\u5185\u5BB9\u53EF\u80FD\u968F\u65F6\u95F4\u63A8\u79FB\u800C\u8FC7\u65F6\u3002\u90E8\u5206\u6280\u672F\u65B9\u6848\u3001API \u63A5\u53E3\u3001\u5DE5\u5177\u7248\u672C\u7B49\u4FE1\u606F\u53EF\u80FD\u4E0E\u5F53\u524D\u6700\u65B0\u7248\u672C\u5B58\u5728\u5DEE\u5F02\u3002\u5EFA\u8BAE\u8BFB\u8005\u5728\u4F7F\u7528\u524D\u6838\u5B9E\u76F8\u5173\u6280\u672F\u7684\u6700\u65B0\u6587\u6863\u548C\u5B98\u65B9\u8D44\u6599\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u56DB\u3001\u7B2C\u4E09\u65B9\u5185\u5BB9</h2><p>\u672C\u7AD9\u53EF\u80FD\u5F15\u7528\u6216\u94FE\u63A5\u81F3\u7B2C\u4E09\u65B9\u7F51\u7AD9\u3001\u5DE5\u5177\u3001\u5F00\u6E90\u9879\u76EE\u7B49\u5185\u5BB9\u3002\u8FD9\u4E9B\u7B2C\u4E09\u65B9\u5185\u5BB9\u7531\u5176\u5404\u81EA\u7684\u6240\u6709\u8005\u6216\u8FD0\u8425\u8005\u8D1F\u8D23\uFF0C\u672C\u7AD9\u4E0D\u5BF9\u7B2C\u4E09\u65B9\u5185\u5BB9\u7684\u51C6\u786E\u6027\u3001\u5B8C\u6574\u6027\u3001\u5B89\u5168\u6027\u505A\u4EFB\u4F55\u4FDD\u8BC1\u3002\u8BBF\u95EE\u7B2C\u4E09\u65B9\u94FE\u63A5\u4EA7\u751F\u7684\u98CE\u9669\u7531\u7528\u6237\u81EA\u884C\u627F\u62C5\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u4E94\u3001AI \u76F8\u5173\u63A2\u7D22\u5185\u5BB9</h2><p>\u672C\u7AD9\u53D1\u5E03\u7684 AI \u76F8\u5173\u63A2\u7D22\u6027\u5185\u5BB9\uFF08\u5305\u62EC\u5927\u8BED\u8A00\u6A21\u578B\u5E94\u7528\u3001RAG \u7CFB\u7EDF\u3001Agent \u5F00\u53D1\u7B49\uFF09\u5747\u4E3A\u4F5C\u8005\u4E2A\u4EBA\u5B66\u4E60\u5B9E\u8DF5\u8BB0\u5F55\u3002AI \u6280\u672F\u7684\u5B9E\u9A8C\u7ED3\u679C\u53D7\u6A21\u578B\u7248\u672C\u3001\u53C2\u6570\u914D\u7F6E\u3001\u8FD0\u884C\u73AF\u5883\u7B49\u591A\u79CD\u56E0\u7D20\u5F71\u54CD\uFF0C\u4E0D\u540C\u73AF\u5883\u4E0B\u53EF\u80FD\u4EA7\u751F\u4E0D\u540C\u7ED3\u679C\uFF0C\u8BF7\u8C28\u614E\u53C2\u8003\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u516D\u3001\u77E5\u8BC6\u4EA7\u6743</h2><p>\u672C\u7AD9\u539F\u521B\u5185\u5BB9\u7684\u7248\u6743\u5F52\u4F5C\u8005\u6240\u6709\u3002\u672A\u7ECF\u6388\u6743\uFF0C\u4E0D\u5F97\u5C06\u672C\u7AD9\u5185\u5BB9\u7528\u4E8E\u5546\u4E1A\u7528\u9014\u6216\u5927\u89C4\u6A21\u590D\u5236\u5206\u53D1\u3002\u5408\u7406\u5F15\u7528\u65F6\u8BF7\u6CE8\u660E\u51FA\u5904\u53CA\u539F\u6587\u94FE\u63A5\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u4E03\u3001\u514D\u8D23\u58F0\u660E\u7684\u4FEE\u6539</h2><p>\u672C\u7AD9\u4FDD\u7559\u968F\u65F6\u4FEE\u6539\u672C\u514D\u8D23\u58F0\u660E\u7684\u6743\u5229\u3002\u4FEE\u6539\u540E\u7684\u58F0\u660E\u5C06\u5373\u65F6\u751F\u6548\uFF0C\u6055\u4E0D\u53E6\u884C\u901A\u77E5\u3002\u5EFA\u8BAE\u60A8\u5B9A\u671F\u67E5\u9605\u672C\u9875\u9762\u4EE5\u4E86\u89E3\u6700\u65B0\u6761\u6B3E\u3002</p></section><section><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">\u516B\u3001\u8054\u7CFB\u6211\u4EEC</h2><p>\u5982\u60A8\u5BF9\u672C\u514D\u8D23\u58F0\u660E\u6709\u4EFB\u4F55\u7591\u95EE\uFF0C\u53EF\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u8054\u7CFB\uFF1A</p><ul class="list-disc list-inside mt-2 space-y-1"><li>\u4E2A\u4EBA\u4E3B\u9875\uFF1A<a href="https://www.xinxinnote.tech/about" target="_blank" class="text-primary hover:underline">xinxinnote.tech/about</a></li><li>\u90AE\u7BB1\uFF1A\u901A\u8FC7\u4E2A\u4EBA\u4E3B\u9875\u83B7\u53D6\u8054\u7CFB\u65B9\u5F0F</li></ul></section></div></div></div>`);
      _push(ssrRenderComponent(SimpleFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/disclaimer/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C_rZ_RgR.mjs.map
