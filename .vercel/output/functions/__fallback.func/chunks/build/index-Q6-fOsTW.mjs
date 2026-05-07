import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { S as SimpleFooter } from './SimpleFooter-D9-KqSlu.mjs';
import { u as useHead } from './v3-BPB63jf9.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'unhead/utils';
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
    const loaded = ref(false);
    const now = /* @__PURE__ */ new Date();
    const lastUpdated = `${now.getFullYear()} \u5E74 ${now.getMonth() + 1} \u6708`;
    useHead({
      title: "\u5173\u4E8E\u8FD9\u4E2A\u7F51\u7AD9 | EasyBlog",
      meta: [
        { name: "description", content: "EasyBlog \u80CC\u540E\u7684\u6280\u672F\u9009\u578B\u4E0E\u8BBE\u8BA1\u601D\u8003\u2014\u2014Nuxt3\u3001TailwindCSS\u3001Redis\u3001Vercel \u81EA\u52A8\u90E8\u7F72\u3002" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900" }, _attrs))} data-v-e473706e><div class="flex-1 w-full max-w-3xl mx-auto px-6 py-12" data-v-e473706e><div class="${ssrRenderClass(["about-fade-in mb-12", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "0ms" })}" data-v-e473706e><div class="text-sm text-neutral-500 dark:text-neutral-400 mb-3 font-mono" data-v-e473706e> \u6700\u540E\u66F4\u65B0 \xB7 ${ssrInterpolate(lastUpdated)}</div><h1 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight" data-v-e473706e> \u5173\u4E8E\u8FD9\u4E2A\u7F51\u7AD9 </h1><p class="text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed" data-v-e473706e> Nuxt3 + TailwindCSS + Vercel + Redis \u2014\u2014 \u4E00\u4E2A\u540E\u7AEF\u5DE5\u7A0B\u5E08\u7684\u5168\u6808\u5B9E\u8DF5\u3002 </p></div><section class="${ssrRenderClass(["about-fade-in mb-12", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "80ms" })}" data-v-e473706e><h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4" data-v-e473706e> \u7F18\u8D77\uFF1A\u4E3A\u4EC0\u4E48\u4E0D\u76F4\u63A5\u7528\u73B0\u6210\u7684\uFF1F </h2><div class="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed" data-v-e473706e><p data-v-e473706e> \u5E02\u9762\u4E0A\u4E0D\u7F3A\u597D\u7528\u7684\u535A\u5BA2\u6846\u67B6\uFF0CHexo \u5FEB\uFF0CHugo \u66F4\u5FEB\uFF0CWordPress \u529F\u80FD\u4E30\u5BCC\u3002 \u4F46\u6211\u6700\u7EC8\u8FD8\u662F\u9009\u62E9\u4ECE\u96F6\u5F00\u59CB\u642D\u4E00\u5957 \u2014\u2014 \u5E76\u4E0D\u662F\u56E0\u4E3A\u73B0\u6210\u7684\u4E0D\u597D\uFF0C\u800C\u662F\u60F3\u5728\u8FD9\u4E2A\u8FC7\u7A0B\u91CC\u628A Nuxt 3 \u7684\u5168\u6808\u80FD\u529B\u3001Tailwind \u7684\u6837\u5F0F\u7CFB\u7EDF\u3001Redis \u6301\u4E45\u5316\u5B58\u50A8\u3001Git \u9A71\u52A8\u7684\u90E8\u7F72\u4E32\u8D77\u6765\u5B8C\u6574\u8DD1\u4E00\u904D\u3002 </p><p data-v-e473706e> \u8FD9\u7BC7\u535A\u5BA2\u5C31\u662F\u8FD9\u5957\u6D41\u7A0B\u7684\u4EA7\u7269\uFF0C\u4E5F\u662F\u6211\u6301\u7EED\u8FED\u4EE3\u7684\u4E00\u4E2A\u6280\u672F\u7EC3\u5175\u573A\u3002 \u4ECE\u6700\u521D\u7684 Nuxt 2 \u5230\u5168\u9762\u8FC1\u79FB\u81F3 Nuxt 3\uFF0C\u6BCF\u4E00\u6B21\u91CD\u6784\u90FD\u662F\u5BF9\u73B0\u4EE3\u524D\u7AEF\u5DE5\u7A0B\u5316\u7684\u6DF1\u5165\u7406\u89E3\u3002 </p></div></section><section class="${ssrRenderClass(["about-fade-in mb-12", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "160ms" })}" data-v-e473706e><h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4" data-v-e473706e> \u6280\u672F\u9009\u578B </h2><div class="space-y-6" data-v-e473706e><div data-v-e473706e><h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2" data-v-e473706e> Nuxt 3 \xB7 \u5168\u6808\u6846\u67B6 </h3><p class="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-v-e473706e> \u57FA\u4E8E Vue 3 \u7684\u73B0\u4EE3\u5316\u5168\u6808\u6846\u67B6\uFF0C\u91C7\u7528 Composition API \u548C &lt;script setup&gt; \u8BED\u6CD5\u3002 \u670D\u52A1\u7AEF\u6E32\u67D3\uFF08SSR\uFF09\u4E0E\u9759\u6001\u751F\u6210\uFF08SSG\uFF09\u7075\u6D3B\u5207\u6362\uFF0C\u5185\u7F6E\u6587\u4EF6\u8DEF\u7531\u7CFB\u7EDF\uFF0C \u4F7F\u7528 Pinia \u66FF\u4EE3 Vuex \u8FDB\u884C\u72B6\u6001\u7BA1\u7406\u3002Nuxt 3 \u5BF9 Node.js 20+ \u7684\u5B8C\u7F8E\u652F\u6301\uFF0C \u8BA9\u90E8\u7F72\u5728 Vercel \u4E0A\u66F4\u52A0\u987A\u7545\u3002 </p></div><div data-v-e473706e><h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2" data-v-e473706e> TailwindCSS \xB7 \u6837\u5F0F\u7CFB\u7EDF </h3><p class="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-v-e473706e> \u4E0D\u7528\u518D\u4E3A\u7C7B\u540D\u7EA0\u7ED3\uFF0C\u76F4\u63A5\u5728\u6A21\u677F\u4E0A\u7EC4\u5408\u5B9E\u7528\u7C7B\u3002\u6697\u8272\u6A21\u5F0F\u901A\u8FC7 Tailwind \u7684 <code class="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm" data-v-e473706e>dark:</code> \u53D8\u4F53\u5B9E\u73B0\uFF0C\u914D\u5408\u7CFB\u7EDF\u4E3B\u9898\u8DDF\u968F\uFF0C\u65E5\u95F4\u548C\u591C\u95F4\u7684\u9605\u8BFB\u4F53\u9A8C\u90FD\u8FD8\u8BF4\u5F97\u8FC7\u53BB\u3002 </p></div><div data-v-e473706e><h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2" data-v-e473706e> Marked + Highlight.js \xB7 \u5185\u5BB9\u6E32\u67D3 </h3><p class="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-v-e473706e> \u4F7F\u7528 Marked \u89E3\u6790 Markdown \u5185\u5BB9\uFF0C\u914D\u5408 Highlight.js \u5B9E\u73B0\u4EE3\u7801\u9AD8\u4EAE\u3002 \u81EA\u5B9A\u4E49\u4EE3\u7801\u5757\u6837\u5F0F\uFF0C\u652F\u6301\u8BED\u8A00\u6807\u7B7E\u3001\u884C\u53F7\u663E\u793A\u3001\u4E00\u952E\u590D\u5236\u7B49\u529F\u80FD\uFF0C \u6253\u9020\u63A5\u8FD1\u6398\u91D1\u98CE\u683C\u7684\u9605\u8BFB\u4F53\u9A8C\u3002 </p></div><div data-v-e473706e><h3 class="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2" data-v-e473706e> GitHub + Vercel \xB7 \u81EA\u52A8\u90E8\u7F72 </h3><p class="text-neutral-600 dark:text-neutral-300 leading-relaxed" data-v-e473706e> \u4EE3\u7801\u6258\u7BA1\u5728 GitHub \u7EC4\u7EC7\u4ED3\u5E93 easyblog-org/easyblog-web\uFF0C\u6BCF\u6B21 push \u5230 main \u5206\u652F\uFF0C Webhook \u89E6\u53D1 Vercel \u91CD\u65B0\u6784\u5EFA\uFF0C\u5927\u7EA6 20 \u79D2\u540E\u65B0\u7248\u5C31\u80FD\u4E0A\u7EBF\u3002 \u6574\u4E2A\u8FC7\u7A0B\u4E0D\u7528\u624B\u52A8\u4F20\u6587\u4EF6\uFF0C\u4E5F\u4E0D\u7528\u64CD\u5FC3\u670D\u52A1\u5668\u8FD0\u7EF4\u3002 </p></div></div></section><section class="${ssrRenderClass(["about-fade-in mb-12", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "240ms" })}" data-v-e473706e><h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4" data-v-e473706e> \u6697\u8272\u6A21\u5F0F \xB7 \u4E00\u70B9\u70B9\u5B9E\u73B0\u7EC6\u8282 </h2><div class="text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-3" data-v-e473706e><p data-v-e473706e> Tailwind \u5185\u7F6E\u7684 dark \u53D8\u4F53\u5DF2\u7ECF\u89E3\u51B3\u4E86\u5927\u534A\u95EE\u9898\u3002\u5269\u4E0B\u7684\u4E3B\u8981\u662F\u5168\u5C40\u80CC\u666F\u5207\u6362\uFF0C\u4EE5\u53CA\u9700\u8981\u81EA\u5B9A\u4E49\u51E0\u5904\u6DF1\u8272\u4E3B\u9898\u4E0B\u7684\u5BB9\u5668\u9634\u5F71\u3002 \u901A\u8FC7\u5728 HTML \u6839\u5143\u7D20\u4E0A\u52A8\u6001\u6DFB\u52A0/\u79FB\u9664 <code class="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-sm" data-v-e473706e>dark</code> \u7C7B\u540D\u6765\u5B9E\u73B0\u4E3B\u9898\u5207\u6362\u3002 </p><pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto text-sm font-mono" data-v-e473706e><code data-v-e473706e>&lt;!-- \u65E5\u95F4\u6A21\u5F0F --&gt;
&lt;div class=&quot;bg-white&quot;&gt;&lt;/div&gt;

&lt;!-- \u624B\u52A8\u89E6\u53D1\u6697\u8272\u6A21\u5F0F --&gt;
&lt;div class=&quot;dark:bg-neutral-900&quot;&gt;&lt;/div&gt;

&lt;!-- \u8DDF\u968F\u7CFB\u7EDF\u4E3B\u9898 --&gt;
&lt;script&gt;
if (window.matchMedia(&#39;(prefers-color-scheme:dark)&#39;).matches) {
  document.documentElement.classList.add(&#39;dark&#39;)
}
&lt;/script&gt;</code></pre><p class="text-sm text-neutral-500 dark:text-neutral-400" data-v-e473706e> \u5B8C\u6574\u4EE3\u7801\u53EF\u4EE5\u5728 GitHub \u4ED3\u5E93\u770B\u5230\uFF0C\u8FD9\u91CC\u53EA\u8D34\u6700\u6838\u5FC3\u7684\u4E00\u5C0F\u6BB5\u793A\u610F\u3002 </p></div></section><section class="${ssrRenderClass(["about-fade-in mb-12 pb-8 border-b border-neutral-200 dark:border-neutral-800", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "320ms" })}" data-v-e473706e><h2 class="text-xl font-semibold text-neutral-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4" data-v-e473706e> \u5173\u4E8E\u6211 </h2><div class="flex items-start gap-4 flex-wrap sm:flex-nowrap" data-v-e473706e><div class="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0 overflow-hidden" data-v-e473706e><img src="https://www.xinxinnote.tech/images/my.webp" alt="Frank" class="w-full h-full object-cover" data-v-e473706e></div><div data-v-e473706e><p class="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2" data-v-e473706e> \u540E\u7AEF\u5DE5\u7A0B\u5E08 &amp; AI \u5DE5\u7A0B\u5316\u63A2\u7D22\u8005\u3002\u65E5\u5E38\u5199 Java \u548C Python\uFF0C\u5BF9\u5E72\u51C0\u3001\u514B\u5236\u7684\u8BBE\u8BA1\u6709\u6267\u5FF5\u3002 \u76F8\u4FE1\u597D\u7684\u5DE5\u5177\u80FD\u8BA9\u5F00\u53D1\u8005\u66F4\u4E13\u6CE8\u4E8E\u521B\u9020\u672C\u8EAB\u3002 </p><a href="https://www.xinxinnote.tech/about" class="inline-flex items-center text-amber-600 dark:text-amber-400 hover:underline text-sm" target="_blank" rel="noopener" data-v-e473706e> \u5B8C\u6574\u5C65\u5386\u548C\u4E2A\u4EBA\u4ECB\u7ECD \u2192 </a></div></div></section><div class="${ssrRenderClass(["about-fade-in flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "400ms" })}" data-v-e473706e><div class="flex gap-4" data-v-e473706e><a href="https://github.com/easyblog-org/easyblog-web" target="_blank" rel="noopener" class="hover:text-neutral-700 dark:hover:text-neutral-300" data-v-e473706e>GitHub \u4ED3\u5E93</a><span class="text-neutral-300 dark:text-neutral-600" data-v-e473706e>\xB7</span><span class="relative group cursor-default select-none" data-v-e473706e> RSS \u8BA2\u9605 <span class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 text-xs text-neutral-50 bg-neutral-700 dark:bg-neutral-300 dark:text-neutral-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" data-v-e473706e>\u5373\u5C06\u4E0A\u7EBF\uFF0C\u656C\u8BF7\u671F\u5F85</span></span></div><div class="flex items-center gap-2" data-v-e473706e><span class="inline-block w-2 h-2 rounded-full bg-green-500" data-v-e473706e></span><span data-v-e473706e>Vercel \u6784\u5EFA\u72B6\u6001\uFF1A\u6B63\u5E38</span></div></div></div>`);
      _push(ssrRenderComponent(SimpleFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e473706e"]]);

export { index as default };
//# sourceMappingURL=index-Q6-fOsTW.mjs.map
