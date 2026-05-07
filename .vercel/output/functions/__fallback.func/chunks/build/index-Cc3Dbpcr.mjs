import { _ as __nuxt_component_0 } from './nuxt-link-CLFMLnn_.mjs';
import { ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { S as SimpleFooter } from './SimpleFooter-D9-KqSlu.mjs';
import { u as useBlogStore } from './blog-DxN2HMop.mjs';
import { u as useFetch } from './fetch-Be3q_yDP.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@vue/shared';
import './asyncData-XcM_Kn_o.mjs';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const blogStore = useBlogStore();
    const loaded = ref(false);
    const { data: apiData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/articles",
      {
        key: "sitemap-articles"
      },
      "$Q5IpTFwoU_"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const articles = computed(() => {
      var _a;
      const storeArticles = blogStore.articles || [];
      const source = storeArticles.length > 0 ? storeArticles : ((_a = apiData.value) == null ? void 0 : _a.articles) || [];
      return [...source].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))} data-v-a9ad4e9f><div class="max-w-6xl mx-auto px-4 py-6 w-full flex-1" data-v-a9ad4e9f><div class="flex flex-col lg:flex-row gap-6" data-v-a9ad4e9f><div class="lg:w-1/3 space-y-4" data-v-a9ad4e9f><div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "0ms" })}" data-v-a9ad4e9f><h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2" data-v-a9ad4e9f><span data-v-a9ad4e9f><svg t="1777919701989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4986" width="20" height="20" data-v-a9ad4e9f><path d="M356.550194 280.27871c0-20.48 16.615226-37.128258 37.095225-37.128258h411.581936a37.128258 37.128258 0 0 1 0 74.223483h-411.581936a37.062194 37.062194 0 0 1-37.095225-37.095225z m448.578064 200.406709H393.645419a37.128258 37.128258 0 0 0 0 74.223484h411.581936a37.128258 37.128258 0 1 0-0.099097-74.223484z m0 237.501936H393.645419a37.128258 37.128258 0 0 0 0 74.223484h411.581936a37.128258 37.128258 0 1 0-0.099097-74.223484zM233.472 468.958968c-28.572903 0-51.794581 23.518968-51.794581 52.620387 0 29.068387 23.155613 52.620387 51.794581 52.620387a52.190968 52.190968 0 0 0 51.827613-52.620387 52.190968 52.190968 0 0 0-51.827613-52.620387z m0-240.64C204.899097 228.318968 181.677419 251.837935 181.677419 280.939355s23.155613 52.620387 51.794581 52.620387a52.190968 52.190968 0 0 0 51.827613-52.620387c0-29.002323-23.25471-52.620387-51.827613-52.620387z m0 473.68258A52.190968 52.190968 0 0 0 181.677419 754.621935c0 29.101419 23.155613 52.620387 51.794581 52.620388a52.190968 52.190968 0 0 0 51.827613-52.620388 52.190968 52.190968 0 0 0-51.827613-52.620387z" fill="#418BFF" p-id="4987" data-v-a9ad4e9f></path></svg></span> \u4E3B\u8981\u529F\u80FD </h2><div class="space-y-2" data-v-a9ad4e9f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" data-v-a9ad4e9f${_scopeId}></span> \u9996\u9875 `);
          } else {
            return [
              createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" }),
              createTextVNode(" \u9996\u9875 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/archive",
        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" data-v-a9ad4e9f${_scopeId}></span> \u6587\u7AE0\u5F52\u6863 `);
          } else {
            return [
              createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" }),
              createTextVNode(" \u6587\u7AE0\u5F52\u6863 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "80ms" })}" data-v-a9ad4e9f><h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2" data-v-a9ad4e9f><span data-v-a9ad4e9f><svg t="1777919792159" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7127" width="20" height="20" data-v-a9ad4e9f><path d="M528.5888 547.84A226.3552 226.3552 0 1 0 286.72 547.84a339.3024 339.3024 0 0 0-217.9072 316.416 28.16 28.16 0 0 0 56.32 0 282.8288 282.8288 0 0 1 266.24-281.9584c5.12 0.4096 10.8032 0.6656 16.3328 0.6656s10.9056 0 16.3328-0.6656a282.8288 282.8288 0 0 1 266.24 281.9584 28.16 28.16 0 1 0 56.32 0 339.3536 339.3536 0 0 0-218.0096-316.416zM237.7216 356.5056a170.0352 170.0352 0 1 1 185.8048 169.2672c-5.12 0-10.24-0.3584-15.7696-0.3584s-10.5472 0-15.8208 0.3584a170.24 170.24 0 0 1-154.2144-169.2672z" fill="#4E8CEE" p-id="7128" data-v-a9ad4e9f></path><path d="M793.2416 528.7424a187.8016 187.8016 0 0 0-109.0048-340.7872 28.16 28.16 0 0 0 0 56.32A131.584 131.584 0 0 1 696.7808 506.88c-4.1984 0-8.3456-0.3072-12.544-0.3072a28.16 28.16 0 0 0-28.16 28.16v0.9216a28.16 28.16 0 0 0 28.16 28.16c4.4032 0 8.7552 0 13.1072-0.512a222.464 222.464 0 0 1 208.896 221.696 28.16 28.16 0 0 0 56.32 0 278.9376 278.9376 0 0 0-169.3184-256.256z" fill="#4E8CEE" p-id="7129" data-v-a9ad4e9f></path></svg></span> \u5173\u4E8E </h2><div class="space-y-2" data-v-a9ad4e9f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" data-v-a9ad4e9f${_scopeId}></span> \u5173\u4E8E\u672C\u7AD9 `);
          } else {
            return [
              createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" }),
              createTextVNode(" \u5173\u4E8E\u672C\u7AD9 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "160ms" })}" data-v-a9ad4e9f><h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2" data-v-a9ad4e9f><span data-v-a9ad4e9f>\u2696\uFE0F</span> \u6CD5\u5F8B\u6587\u6863 </h2><div class="space-y-2" data-v-a9ad4e9f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/disclaimer",
        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" data-v-a9ad4e9f${_scopeId}></span> \u514D\u8D23\u58F0\u660E `);
          } else {
            return [
              createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" }),
              createTextVNode(" \u514D\u8D23\u58F0\u660E ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" data-v-a9ad4e9f${_scopeId}></span> \u9690\u79C1\u534F\u8BAE `);
          } else {
            return [
              createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" }),
              createTextVNode(" \u9690\u79C1\u534F\u8BAE ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/service-protocol",
        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" data-v-a9ad4e9f${_scopeId}></span> \u7528\u6237\u534F\u8BAE `);
          } else {
            return [
              createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors" }),
              createTextVNode(" \u7528\u6237\u534F\u8BAE ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="lg:w-2/3" data-v-a9ad4e9f><div class="${ssrRenderClass(["bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 md:p-6 article-fade-in", { "is-loaded": unref(loaded) }])}" style="${ssrRenderStyle({ "transition-delay": "240ms" })}" data-v-a9ad4e9f><h2 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between" data-v-a9ad4e9f><span class="flex items-center gap-2" data-v-a9ad4e9f><span data-v-a9ad4e9f>\u{1F4C4}</span> \u5168\u90E8\u6587\u7AE0</span><span class="text-xs font-normal text-gray-400 dark:text-gray-500" data-v-a9ad4e9f>${ssrInterpolate(unref(articles).length)} \u7BC7</span></h2>`);
      if (unref(articles).length === 0) {
        _push(`<div class="text-sm text-gray-400 dark:text-gray-500 py-8 text-center" data-v-a9ad4e9f>\u6682\u65E0\u6587\u7AE0</div>`);
      } else {
        _push(`<div class="divide-y divide-gray-50 dark:divide-gray-800" data-v-a9ad4e9f><!--[-->`);
        ssrRenderList(unref(articles), (article, idx) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: article.slug,
            to: "/article/" + article.slug,
            class: "flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group no-underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-3 min-w-0 flex-1" data-v-a9ad4e9f${_scopeId}><span class="text-xs text-gray-300 dark:text-gray-600 flex-shrink-0 w-6 text-right" data-v-a9ad4e9f${_scopeId}>${ssrInterpolate(String(idx + 1).padStart(2, "0"))}</span><span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors truncate" data-v-a9ad4e9f${_scopeId}>${ssrInterpolate(article.title)}</span></div><span class="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4" data-v-a9ad4e9f${_scopeId}>${ssrInterpolate(formatDate(article.date))}</span>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-3 min-w-0 flex-1" }, [
                    createVNode("span", { class: "text-xs text-gray-300 dark:text-gray-600 flex-shrink-0 w-6 text-right" }, toDisplayString(String(idx + 1).padStart(2, "0")), 1),
                    createVNode("span", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors truncate" }, toDisplayString(article.title), 1)
                  ]),
                  createVNode("span", { class: "text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4" }, toDisplayString(formatDate(article.date)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(SimpleFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sitemap/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a9ad4e9f"]]);

export { index as default };
//# sourceMappingURL=index-Cc3Dbpcr.mjs.map
