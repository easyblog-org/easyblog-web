import { _ as __nuxt_component_0 } from './nuxt-link-CLFMLnn_.mjs';
import { ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
    const loading = ref(true);
    const { data: apiData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/articles",
      {
        key: "archive-articles"
      },
      "$UZUvQlidzv"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const articles = computed(() => {
      var _a;
      const storeArticles = blogStore.articles || [];
      if (storeArticles.length > 0) return storeArticles;
      return ((_a = apiData.value) == null ? void 0 : _a.articles) || [];
    });
    const groupedArticles = computed(() => {
      const map = {};
      for (const a of articles.value) {
        const d = a.date ? new Date(a.date) : null;
        if (!d || isNaN(d.getTime())) continue;
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const key = y + "-" + m;
        if (!map[key]) map[key] = { year: y, month: parseInt(m), yearMonth: key, articles: [] };
        map[key].articles.push(a);
      }
      return Object.values(map).sort((a, b) => b.yearMonth.localeCompare(a.yearMonth)).map((g) => ({ ...g, monthName: g.month + "\u6708" }));
    });
    function formatDay(date) {
      if (!date) return "";
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      return String(d.getDate()).padStart(2, "0");
    }
    watch(articles, (val) => {
      if (val.length > 0 && loading.value) {
        setTimeout(() => {
          loading.value = false;
        }, 80);
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))} data-v-60a49f35><div class="max-w-6xl mx-auto px-4 py-6 w-full flex-1" data-v-60a49f35><h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6" data-v-60a49f35>\u6587\u7AE0\u5F52\u6863</h1>`);
      if (unref(loading)) {
        _push(`<div class="archive-skeleton" data-v-60a49f35><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="mb-8" data-v-60a49f35><div class="flex items-center gap-3 mb-4" data-v-60a49f35><div class="skeleton-line" style="${ssrRenderStyle({ "width": "50px", "height": "22px", "border-radius": "4px" })}" data-v-60a49f35></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "40px", "height": "24px", "border-radius": "12px" })}" data-v-60a49f35></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "30px", "height": "16px", "border-radius": "4px" })}" data-v-60a49f35></div></div><div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800" data-v-60a49f35><!--[-->`);
          ssrRenderList(n === 1 ? 2 : 5, (m) => {
            _push(`<div class="flex items-center justify-between px-5 py-3" data-v-60a49f35><div class="flex items-center gap-4 min-w-0" data-v-60a49f35><div class="skeleton-line" style="${ssrRenderStyle({ "width": "20px", "height": "14px", "border-radius": "3px" })}" data-v-60a49f35></div><div class="skeleton-line" style="${ssrRenderStyle({ width: m % 2 ? "60%" : "45%", height: "14px", borderRadius: "4px" })}" data-v-60a49f35></div><div class="skeleton-line hidden sm:block" style="${ssrRenderStyle({ "width": "36px", "height": "18px", "border-radius": "4px" })}" data-v-60a49f35></div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(groupedArticles).length === 0) {
          _push(`<div class="text-center text-gray-400 dark:text-gray-500 py-12" data-v-60a49f35><svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-60a49f35><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" data-v-60a49f35></path></svg><p data-v-60a49f35>\u6682\u65E0\u6587\u7AE0</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(groupedArticles), (group, gIdx) => {
          _push(`<div class="mb-8 archive-group" style="${ssrRenderStyle({ animationDelay: gIdx * 0.12 + "s" })}" data-v-60a49f35><div class="flex items-center gap-3 mb-4" data-v-60a49f35><span class="text-lg font-bold text-primary" data-v-60a49f35>${ssrInterpolate(group.year)}</span><span class="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full" data-v-60a49f35>${ssrInterpolate(group.monthName)}</span><span class="text-xs text-gray-400 dark:text-gray-500" data-v-60a49f35>${ssrInterpolate(group.articles.length)} \u7BC7</span></div><div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800 archive-list" style="${ssrRenderStyle({ animationDelay: gIdx * 0.12 + 0.08 + "s" })}" data-v-60a49f35><!--[-->`);
          ssrRenderList(group.articles, (article, idx) => {
            _push(`<div class="flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors archive-row" style="${ssrRenderStyle({ animationDelay: gIdx * 0.12 + 0.08 + idx * 0.04 + "s" })}" data-v-60a49f35><div class="flex items-center gap-4 min-w-0" data-v-60a49f35><span class="text-sm text-gray-400 dark:text-gray-500 flex-shrink-0 w-10 text-right font-mono" data-v-60a49f35>${ssrInterpolate(formatDay(article.date))}</span>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/article/" + article.slug,
              class: "text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors no-underline truncate"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(article.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(article.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (article.category) {
              _push(`<span class="hidden sm:inline-block flex-shrink-0 text-[11px] bg-primary/10 dark:bg-primary/20 text-primary px-1.5 py-0.5 rounded" data-v-60a49f35>${ssrInterpolate(article.category)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(articles).length > 0) {
          _push(`<div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center" data-v-60a49f35><p class="text-sm text-gray-400 dark:text-gray-500" data-v-60a49f35>\u5171 ${ssrInterpolate(unref(articles).length)} \u7BC7\u6587\u7AE0</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(SimpleFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/archive/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-60a49f35"]]);

export { index as default };
//# sourceMappingURL=index-B9WiWN4t.mjs.map
