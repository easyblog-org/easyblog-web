import { _ as __nuxt_component_0 } from './nuxt-link-CLFMLnn_.mjs';
import { ref, computed, watch, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, mergeProps, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, a as useRouter } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './WechatQrcodePopup-bVxbRgN1.mjs';
import { u as useBlogStore } from './blog-DxN2HMop.mjs';
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

function lsGet(key, fallback) {
  return fallback;
}
function lsSet(key, value) {
  return;
}
async function getBatchStats(slugs) {
  if (!slugs || !slugs.length) return { viewsMap: {}, likesMap: {} };
  const viewsMap = {};
  const likesMap = {};
  slugs.forEach((slug) => {
    viewsMap[slug] = lsGet(`views:${slug}`, Math.floor(Math.random() * 9e3 + 1e3));
    likesMap[slug] = lsGet(`likes:${slug}`, Math.floor(Math.random() * 50 + 5));
    if (!localStorage.getItem(`views:${slug}:init`)) {
      lsSet(`views:${slug}`, viewsMap[slug]);
      lsSet(`likes:${slug}`, likesMap[slug]);
    }
  });
  return { viewsMap, likesMap };
}
async function toggleLike(slug) {
  const key = `likes:${slug}`;
  const likedKey = `${key}:_liked`;
  const isLiked = localStorage.getItem(likedKey) === "1";
  let count = lsGet(key, 0);
  if (count === 0) {
    count = Math.floor(Math.random() * 50 + 5);
  }
  if (isLiked) {
    count = Math.max(0, count - 1);
    localStorage.removeItem(likedKey);
    return { count, liked: false };
  }
  count++;
  return { count, liked: true };
}
const _sfc_main$2 = {
  name: "ArticleList",
  props: {
    articles: { type: Array, default: () => [] },
    showLoadMore: { type: Boolean, default: true },
    pageSize: { type: Number, default: 10 }
  },
  data() {
    return {
      displayCount: 10,
      _scrollObserver: null,
      viewsMap: {},
      likesMap: {},
      _statsLoaded: false
    };
  },
  computed: {
    visibleArticles() {
      if (!this.showLoadMore) return this.articles;
      return this.articles.slice(0, this.displayCount);
    },
    allLoaded() {
      return this.displayCount >= this.articles.length;
    }
  },
  watch: {
    articles() {
      this.displayCount = this.pageSize;
      this.$nextTick(() => this.initScrollObserver());
      this.fetchStats();
    }
  },
  mounted() {
    this.displayCount = this.pageSize;
    this.$nextTick(() => {
      this.initScrollObserver();
      this.fetchStats();
    });
  },
  beforeDestroy() {
    if (this._scrollObserver) {
      this._scrollObserver.disconnect();
      this._scrollObserver = null;
    }
  },
  methods: {
    initScrollObserver() {
      if (!("IntersectionObserver" in void 0)) return;
      const sentinel = this.$refs.scrollSentinel;
      if (!sentinel) return;
      if (this._scrollObserver) this._scrollObserver.disconnect();
      this._scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.allLoaded) {
            this.loadMore();
          }
        });
      }, { rootMargin: "120px" });
      this._scrollObserver.observe(sentinel);
    },
    loadMore() {
      if (this.allLoaded) return;
      this.displayCount += this.pageSize;
    },
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    },
    displayTags(tags) {
      if (!tags || !tags.length) return [];
      if (tags.length <= 5) return tags;
      return [...tags.slice(0, 5), "..."];
    },
    goTag(tag) {
      this.$router.push({ path: "/", query: { tag } });
    },
    async fetchStats() {
      if (!this.articles.length || this._statsLoaded) return;
      this._statsLoaded = true;
      try {
        const slugs = this.articles.map((a) => a.slug);
        const { viewsMap, likesMap } = await getBatchStats(slugs);
        this.viewsMap = viewsMap || {};
        this.likesMap = likesMap || {};
      } catch (e) {
        console.warn("[ArticleList] fetchStats failed:", e.message);
        this._statsLoaded = false;
      }
    },
    getViewCount(article) {
      const val = (this.viewsMap || {})[article.slug];
      return typeof val === "number" ? val : article.views || 0;
    },
    getLikeCount(article) {
      const val = (this.likesMap || {})[article.slug];
      return typeof val === "number" ? val : article.likes || 0;
    },
    async handleLike(article, e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const result = await toggleLike(article.slug);
      if (!this.likesMap) this.likesMap = {};
      this.likesMap[article.slug] = result.count;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "jj-desktop-feed" }, _attrs))} data-v-513283ac><!--[-->`);
  ssrRenderList($options.visibleArticles, (article) => {
    _push(`<div class="jj-desktop-item" data-v-513283ac>`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: "/article/" + article.slug,
      class: ["jj-desktop-body", { "jj-desktop-body--cover": article.cover }]
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<div class="jj-desktop-content" data-v-513283ac${_scopeId}><h3 class="jj-desktop-title" data-v-513283ac${_scopeId}>${ssrInterpolate(article.title)} `);
          if (article.featured) {
            _push2(`<span class="jj-desktop-badge" data-v-513283ac${_scopeId}>\u2605</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</h3>`);
          if (article.summary) {
            _push2(`<p class="jj-desktop-summary" data-v-513283ac${_scopeId}>${ssrInterpolate(article.summary)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="jj-desktop-meta" data-v-513283ac${_scopeId}><div class="jj-desktop-author" data-v-513283ac${_scopeId}><div class="jj-avatar jj-avatar--md" data-v-513283ac${_scopeId}><span class="jj-avatar-text" data-v-513283ac${_scopeId}>${ssrInterpolate((article.author || article.category || "\u535A").charAt(0))}</span></div><span class="jj-author-name" data-v-513283ac${_scopeId}>${ssrInterpolate(article.author || article.category || "EasyBlog")}</span></div><div class="jj-desktop-stats" data-v-513283ac${_scopeId}><span class="jj-stat-item" data-v-513283ac${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-513283ac${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-513283ac${_scopeId}></path></svg> ${ssrInterpolate($options.formatDate(article.date))}</span><span class="jj-stat-item" data-v-513283ac${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-513283ac${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-513283ac${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-513283ac${_scopeId}></path></svg> ${ssrInterpolate($options.getViewCount(article).toLocaleString())}</span><span class="jj-stat-item cursor-pointer hover:text-red-500 transition-colors" data-v-513283ac${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-513283ac${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" data-v-513283ac${_scopeId}></path></svg> ${ssrInterpolate($options.getLikeCount(article))}</span></div>`);
          if (article.tags && article.tags.length) {
            _push2(`<div class="jj-desktop-tags" data-v-513283ac${_scopeId}><!--[-->`);
            ssrRenderList($options.displayTags(article.tags), (tag, tIdx) => {
              _push2(`<!--[-->`);
              if (tag !== "...") {
                _push2(`<a href="#" class="jj-tag-pill" data-v-513283ac${_scopeId}>${ssrInterpolate(tag)}</a>`);
              } else {
                _push2(`<span class="jj-tag-ellipsis" data-v-513283ac${_scopeId}>...</span>`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
          if (article.cover) {
            _push2(`<div class="jj-desktop-cover" data-v-513283ac${_scopeId}><img${ssrRenderAttr("src", article.cover)}${ssrRenderAttr("alt", article.title)} loading="lazy" data-v-513283ac${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            createVNode("div", { class: "jj-desktop-content" }, [
              createVNode("h3", { class: "jj-desktop-title" }, [
                createTextVNode(toDisplayString(article.title) + " ", 1),
                article.featured ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "jj-desktop-badge"
                }, "\u2605")) : createCommentVNode("", true)
              ]),
              article.summary ? (openBlock(), createBlock("p", {
                key: 0,
                class: "jj-desktop-summary"
              }, toDisplayString(article.summary), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "jj-desktop-meta" }, [
                createVNode("div", { class: "jj-desktop-author" }, [
                  createVNode("div", { class: "jj-avatar jj-avatar--md" }, [
                    createVNode("span", { class: "jj-avatar-text" }, toDisplayString((article.author || article.category || "\u535A").charAt(0)), 1)
                  ]),
                  createVNode("span", { class: "jj-author-name" }, toDisplayString(article.author || article.category || "EasyBlog"), 1)
                ]),
                createVNode("div", { class: "jj-desktop-stats" }, [
                  createVNode("span", { class: "jj-stat-item" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString($options.formatDate(article.date)), 1)
                  ]),
                  createVNode("span", { class: "jj-stat-item" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      }),
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString($options.getViewCount(article).toLocaleString()), 1)
                  ]),
                  createVNode("span", {
                    class: "jj-stat-item cursor-pointer hover:text-red-500 transition-colors",
                    onClick: ($event) => $options.handleLike(article, $event)
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString($options.getLikeCount(article)), 1)
                  ], 8, ["onClick"])
                ]),
                article.tags && article.tags.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "jj-desktop-tags"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList($options.displayTags(article.tags), (tag, tIdx) => {
                    return openBlock(), createBlock(Fragment, null, [
                      tag !== "..." ? (openBlock(), createBlock("a", {
                        key: "t-" + tIdx,
                        href: "#",
                        class: "jj-tag-pill",
                        onClick: withModifiers(($event) => $options.goTag(tag), ["prevent"])
                      }, toDisplayString(tag), 9, ["onClick"])) : (openBlock(), createBlock("span", {
                        key: "ellipsis-" + tIdx,
                        class: "jj-tag-ellipsis"
                      }, "..."))
                    ], 64);
                  }), 256))
                ])) : createCommentVNode("", true)
              ])
            ]),
            article.cover ? (openBlock(), createBlock("div", {
              key: 0,
              class: "jj-desktop-cover"
            }, [
              createVNode("img", {
                src: article.cover,
                alt: article.title,
                loading: "lazy"
              }, null, 8, ["src", "alt"])
            ])) : createCommentVNode("", true)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--><div class="jj-sentinel" data-v-513283ac></div>`);
  if ($options.allLoaded && $props.articles.length > $props.pageSize) {
    _push(`<div class="py-8 text-center" data-v-513283ac><span class="text-xs tracking-widest text-gray-400 dark:text-gray-600" data-v-513283ac>\u2014 \u5DF2\u7ECF\u5230\u5E95\u4E86 \u2014</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/ArticleList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ArticleList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-513283ac"]]);
const CATEGORY_ICONS = [
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
  '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>'
];
const _sfc_main$1 = {
  name: "SidebarComponent",
  components: { WechatQrcodePopup: __nuxt_component_0$1 },
  props: {
    categories: { type: Array, default: () => [] },
    tags: { type: Array, default: () => [] },
    collections: { type: Array, default: () => [] }
  },
  data() {
    return {
      showCollection: false,
      showWechatQrcode: false
    };
  },
  computed: {
    currentYear() {
      return (/* @__PURE__ */ new Date()).getFullYear();
    },
    activeCategory() {
      return this.$route.query.category || "";
    }
  },
  methods: {
    getCategoryIcon(idx) {
      return CATEGORY_ICONS[idx % CATEGORY_ICONS.length] || CATEGORY_ICONS[0];
    },
    handleSubscribe(col) {
      alert("\u8BA2\u9605\u4E13\u680F\uFF1A" + col.title + "\uFF08\u529F\u80FD\u5F00\u53D1\u4E2D\uFF09");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_WechatQrcodePopup = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4 lg:block" }, _attrs))} data-v-b6c2b0b2><div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4" data-v-b6c2b0b2><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm" data-v-b6c2b0b2>\u5206\u7C7B</h3>`);
  if ($props.categories.length === 0) {
    _push(`<div class="text-sm text-gray-400" data-v-b6c2b0b2>\u6682\u65E0\u5206\u7C7B</div>`);
  } else {
    _push(`<div class="space-y-0.5" data-v-b6c2b0b2>`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: { path: "/" },
      class: ["jj-cat-item", { "jj-cat-item--active": !$options.activeCategory }]
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<svg class="w-4 h-4 jj-cat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b6c2b0b2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-b6c2b0b2${_scopeId}></path></svg><span data-v-b6c2b0b2${_scopeId}>\u5168\u90E8</span>`);
        } else {
          return [
            (openBlock(), createBlock("svg", {
              class: "w-4 h-4 jj-cat-icon",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              createVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M4 6h16M4 12h16M4 18h16"
              })
            ])),
            createVNode("span", null, "\u5168\u90E8")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<!--[-->`);
    ssrRenderList($props.categories, (cat, idx) => {
      _push(ssrRenderComponent(_component_NuxtLink, {
        key: cat.name,
        to: { path: "/", query: { category: cat.name } },
        class: ["jj-cat-item", { "jj-cat-item--active": $options.activeCategory === cat.name }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a;
          if (_push2) {
            _push2(`<span class="jj-cat-icon-wrap" data-v-b6c2b0b2${_scopeId}>${(_a = $options.getCategoryIcon(idx)) != null ? _a : ""}</span><span data-v-b6c2b0b2${_scopeId}>${ssrInterpolate(cat.name)}</span><span class="jj-cat-count" data-v-b6c2b0b2${_scopeId}>${ssrInterpolate(cat.count)}</span>`);
          } else {
            return [
              createVNode("span", {
                innerHTML: $options.getCategoryIcon(idx),
                class: "jj-cat-icon-wrap"
              }, null, 8, ["innerHTML"]),
              createVNode("span", null, toDisplayString(cat.name), 1),
              createVNode("span", { class: "jj-cat-count" }, toDisplayString(cat.count), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div><div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4" data-v-b6c2b0b2><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm" data-v-b6c2b0b2>\u6807\u7B7E</h3>`);
  if ($props.tags.length === 0) {
    _push(`<div class="text-sm text-gray-400" data-v-b6c2b0b2>\u6682\u65E0\u6807\u7B7E</div>`);
  } else {
    _push(`<div class="flex flex-wrap gap-2" data-v-b6c2b0b2><!--[-->`);
    ssrRenderList($props.tags, (tag) => {
      _push(ssrRenderComponent(_component_NuxtLink, {
        key: tag.name,
        to: { path: "/", query: { tag: tag.name } },
        class: "text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 no-underline transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(tag.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(tag.name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div>`);
  if ($data.showCollection && $props.collections && $props.collections.length) {
    _push(`<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4" data-v-b6c2b0b2><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm" data-v-b6c2b0b2>\u63A8\u8350\u4E13\u680F</h3><div class="space-y-3" data-v-b6c2b0b2><!--[-->`);
    ssrRenderList($props.collections, (col) => {
      _push(`<div class="border border-gray-100 dark:border-gray-800 rounded-lg p-3 hover:border-primary/30 dark:hover:border-primary/30 transition-colors" data-v-b6c2b0b2><h4 class="text-sm font-semibold text-gray-900 dark:text-white" data-v-b6c2b0b2>${ssrInterpolate(col.title)}</h4><p class="text-xs text-gray-500 dark:text-gray-400 mt-1" data-v-b6c2b0b2>${ssrInterpolate(col.description)}</p><div class="flex items-center justify-between mt-2" data-v-b6c2b0b2><span class="text-sm font-bold text-primary" data-v-b6c2b0b2>${ssrInterpolate(col.price)}</span><button class="text-xs bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-hover transition-colors" data-v-b6c2b0b2>\u8BA2\u9605</button></div></div>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4" data-v-b6c2b0b2><div class="flex items-center justify-between mb-3" data-v-b6c2b0b2><h3 class="font-semibold text-gray-900 dark:text-white text-sm" data-v-b6c2b0b2>\u5173\u4E8E\u4F5C\u8005</h3><a href="https://www.xinxinnote.tech/about" target="_blank" rel="noopener" class="text-[11px] text-primary hover:text-primary-hover transition-colors no-underline whitespace-nowrap" data-v-b6c2b0b2> \u67E5\u770B\u8BE6\u60C5 \u2192 </a></div><p class="text-xs text-gray-500 dark:text-gray-400 mb-3" data-v-b6c2b0b2>\u540E\u7AEF\u5DE5\u7A0B\u5E08\uFF0CAI \u5DE5\u7A0B\u5316\u63A2\u7D22\u8005\u3002\u4FDD\u6301\u597D\u5947\uFF0C\u8010\u5FC3\u6253\u78E8\u3002</p><div class="flex items-center gap-3" data-v-b6c2b0b2><a href="https://github.com/easyblog-org/easyblog-web" target="_blank" rel="noopener" class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-primary transition-colors" data-v-b6c2b0b2><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-b6c2b0b2><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-v-b6c2b0b2></path></svg></a><a href="https://juejin.cn" target="_blank" rel="noopener" class="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary transition-colors" title="\u6398\u91D1" data-v-b6c2b0b2><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7796" width="24" height="24" data-v-b6c2b0b2><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="currentColor" p-id="7797" data-v-b6c2b0b2></path></svg></a><button class="text-gray-400 hover:text-[#29AE66] dark:text-[#29AE66]dark:hover:text-[#29AE66] transition-colors cursor-pointer bg-transparent border-0 p-0" title="\u5FAE\u4FE1\u516C\u4F17\u53F7" data-v-b6c2b0b2><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-b6c2b0b2><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.3c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z" data-v-b6c2b0b2></path></svg></button>`);
  _push(ssrRenderComponent(_component_WechatQrcodePopup, {
    value: $data.showWechatQrcode,
    onInput: ($event) => $data.showWechatQrcode = $event
  }, null, _parent));
  _push(`</div></div><div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4" data-v-b6c2b0b2><h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm" data-v-b6c2b0b2>\u5173\u4E8E\u672C\u7AD9</h3><nav class="flex flex-wrap gap-x-3 gap-y-1.5 mb-3" data-v-b6c2b0b2>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about",
    class: "text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u5173\u4E8E\u7F51\u7AD9`);
      } else {
        return [
          createTextVNode("\u5173\u4E8E\u7F51\u7AD9")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/disclaimer",
    class: "text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u514D\u8D23\u58F0\u660E`);
      } else {
        return [
          createTextVNode("\u514D\u8D23\u58F0\u660E")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/privacy",
    class: "text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u9690\u79C1\u534F\u8BAE`);
      } else {
        return [
          createTextVNode("\u9690\u79C1\u534F\u8BAE")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/service-protocol",
    class: "text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u7528\u6237\u534F\u8BAE`);
      } else {
        return [
          createTextVNode("\u7528\u6237\u534F\u8BAE")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/sitemap",
    class: "text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors no-underline"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`\u7F51\u7AD9\u5730\u56FE`);
      } else {
        return [
          createTextVNode("\u7F51\u7AD9\u5730\u56FE")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav><p class="text-xs text-gray-400 dark:text-gray-600" data-v-b6c2b0b2>\xA9 ${ssrInterpolate($options.currentYear)} EasyBlog \u7248\u6743\u6240\u6709 \xB7 Powered by Nuxt</p></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b6c2b0b2"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const blogStore = useBlogStore();
    ref(0);
    ref(null);
    ref(null);
    const displayCount = ref(10);
    ref(10);
    const loading = ref(true);
    const _mobileViewsMap = ref({});
    const _mobileLikesMap = ref({});
    const _mobileStatsLoaded = ref(false);
    ref(null);
    const allArticles = computed(() => blogStore.articles || []);
    const categories = computed(() => blogStore.categories || []);
    const tags = computed(() => blogStore.tags || []);
    const collections = computed(() => [
      { slug: "backend-practice", title: "\u540E\u7AEF\u5DE5\u7A0B\u5B9E\u8DF5", description: "\u4ECE\u96F6\u6784\u5EFA\u9AD8\u53EF\u7528\u540E\u7AEF\u7CFB\u7EDF", price: "\xA599", articleCount: 12 },
      { slug: "ai-exploration", title: "AI \u63A2\u7D22\u7B14\u8BB0", description: "AI \u5E94\u7528\u5F00\u53D1\u5B9E\u6218\u8BB0\u5F55", price: "\xA549", articleCount: 8 }
    ]);
    const filteredArticles = computed(() => {
      let result = allArticles.value;
      const category = route.query.category;
      const tag = route.query.tag;
      const q = route.query.q;
      if (category) result = result.filter((a) => a.category === category);
      if (tag) result = result.filter((a) => a.tags && a.tags.includes(tag));
      if (q) {
        const lower = q.toLowerCase();
        result = result.filter(
          (a) => a.title && a.title.toLowerCase().includes(lower) || a.summary && a.summary.toLowerCase().includes(lower)
        );
      }
      return [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    const heroArticles = computed(() => {
      const allFeatured = [...filteredArticles.value].filter((a) => a.featured).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
      if (allFeatured.length > 0) return allFeatured;
      return filteredArticles.value.slice(0, 1);
    });
    const restArticles = computed(() => {
      const heroSlugs = new Set(heroArticles.value.map((a) => a.slug));
      const rest = filteredArticles.value.filter((a) => !heroSlugs.has(a.slug));
      const extraFeatured = rest.filter((a) => a.featured).sort((a, b) => new Date(b.date) - new Date(a.date));
      const normal = rest.filter((a) => !a.featured);
      return [...extraFeatured, ...normal];
    });
    const visibleRestArticles = computed(() => {
      if (activeCategory.value) return filteredArticles.value;
      return restArticles.value.slice(0, displayCount.value);
    });
    const allLoaded = computed(() => {
      if (activeCategory.value) return true;
      return displayCount.value >= restArticles.value.length;
    });
    const activeCategory = computed(() => route.query.tag || "");
    const navCategories = computed(() => (tags.value || []).slice(0, 12));
    function formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    async function fetchMobileStats() {
      if (!restArticles.value.length || _mobileStatsLoaded.value) return;
      _mobileStatsLoaded.value = true;
      try {
        const slugs = restArticles.value.map((a) => a.slug);
        const { viewsMap, likesMap } = await getBatchStats(slugs);
        _mobileViewsMap.value = viewsMap || {};
        _mobileLikesMap.value = likesMap || {};
      } catch (e) {
        console.warn("[Index] fetchMobileStats failed:", e.message);
        _mobileStatsLoaded.value = false;
      }
    }
    function getMobileViews(article) {
      const val = (_mobileViewsMap.value || {})[article.slug];
      return typeof val === "number" ? val : article.views || 0;
    }
    function getMobileLikes(article) {
      const val = (_mobileLikesMap.value || {})[article.slug];
      return typeof val === "number" ? val : article.likes || 0;
    }
    async function handleMobileLike(article, e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const result = await toggleLike(article.slug);
      if (!_mobileLikesMap.value) _mobileLikesMap.value = {};
      _mobileLikesMap.value[article.slug] = result.count;
    }
    watch(allArticles, (val) => {
      if (val.length > 0 && loading.value) {
        setTimeout(() => {
          loading.value = false;
        }, 80);
        fetchMobileStats();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-c666bc29>`);
      if (unref(navCategories).length > 0) {
        _push(`<div class="lg:hidden jj-nav-bar" data-v-c666bc29><div class="jj-nav-scroll" data-v-c666bc29><button class="${ssrRenderClass(["jj-nav-tab", { "jj-nav-tab--active": !unref(activeCategory) }])}" data-v-c666bc29>\u5168\u90E8</button><!--[-->`);
        ssrRenderList(unref(navCategories), (cat) => {
          _push(`<button class="${ssrRenderClass(["jj-nav-tab", { "jj-nav-tab--active": unref(activeCategory) === cat.name }])}" data-v-c666bc29>${ssrInterpolate(cat.name)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-6xl mx-auto px-4 pt-4 pb-6" data-v-c666bc29><div class="lg:hidden" data-v-c666bc29>`);
      if (unref(loading)) {
        _push(`<div class="jj-feed-list" data-v-c666bc29><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="jj-feed-item" data-v-c666bc29><div class="jj-feed-body p-4" data-v-c666bc29><div class="skeleton-line" style="${ssrRenderStyle({ "width": "70%", "height": "20px", "margin-bottom": "10px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "100%", "height": "14px", "margin-bottom": "8px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "45%", "height": "14px", "margin-bottom": "12px" })}" data-v-c666bc29></div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px" })}" data-v-c666bc29><div class="skeleton-avatar" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "60px", "height": "13px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "80px", "height": "13px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "50px", "height": "13px" })}" data-v-c666bc29></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(filteredArticles).length === 0) {
        _push(`<div class="text-center py-16 px-4" data-v-c666bc29>`);
        if (_ctx.$route.query.q) {
          _push(`<div class="empty-state" data-v-c666bc29><svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-c666bc29></path></svg><p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2" data-v-c666bc29>\u6CA1\u6709\u627E\u5230\u76F8\u5173\u6587\u7AE0</p><p class="text-sm text-gray-400 dark:text-gray-500 mb-5" data-v-c666bc29>\u641C\u7D22\u300C<span class="text-primary font-medium" data-v-c666bc29>${ssrInterpolate(_ctx.$route.query.q)}</span>\u300D\u672A\u5339\u914D\u5230\u4EFB\u4F55\u5185\u5BB9</p><button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" data-v-c666bc29> \u8FD4\u56DE\u9996\u9875 </button></div>`);
        } else if (_ctx.$route.query.category || _ctx.$route.query.tag) {
          _push(`<div class="empty-state" data-v-c666bc29><svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-c666bc29></path></svg><p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2" data-v-c666bc29>\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u6587\u7AE0</p><p class="text-sm text-gray-400 dark:text-gray-500 mb-5" data-v-c666bc29>\u5C1D\u8BD5\u5207\u6362\u5176\u4ED6\u5206\u7C7B\u6216\u6D4F\u89C8\u5168\u90E8\u6587\u7AE0</p><button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" data-v-c666bc29><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-c666bc29></path></svg> \u8FD4\u56DE\u9996\u9875 </button></div>`);
        } else {
          _push(`<div class="empty-state" data-v-c666bc29><svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-c666bc29></path></svg><p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2" data-v-c666bc29>\u6587\u7AE0\u6B63\u5728\u8DEF\u4E0A</p><p class="text-sm text-gray-400 dark:text-gray-500" data-v-c666bc29>\u4F5C\u8005\u8FD8\u5728\u52AA\u529B\u521B\u4F5C\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85</p></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[-->`);
        if (unref(heroArticles).length > 0) {
          _push(`<div class="relative mb-3" data-v-c666bc29><div class="overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 pb-2 pl-2 pr-5" data-v-c666bc29><!--[-->`);
          ssrRenderList(unref(heroArticles), (article, idx) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: article.slug,
              to: "/article/" + article.slug,
              class: ["flex-shrink-0 w-[calc(100%-1rem)] no-underline group snap-start mobile-card overflow-hidden", idx === unref(heroArticles).length - 1 ? "mr-4" : ""]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="relative rounded-[var(--radius-card)] overflow-hidden h-full" data-v-c666bc29${_scopeId}>`);
                  if (article.cover) {
                    _push2(`<div class="aspect-[16/9] w-full overflow-hidden" data-v-c666bc29${_scopeId}><img${ssrRenderAttr("src", article.cover)}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-v-c666bc29${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" data-v-c666bc29${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 p-5" data-v-c666bc29${_scopeId}><div class="flex items-center gap-2 mb-2" data-v-c666bc29${_scopeId}>`);
                    if (article.category) {
                      _push2(`<span class="mobile-hero-tag text-white font-medium" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.category)}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div><h2 class="text-[20px] font-bold text-white leading-snug line-clamp-2" style="${ssrRenderStyle({ "text-shadow": "0 1px 3px rgba(0,0,0,0.3)" })}" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.title)}</h2>`);
                    if (article.summary) {
                      _push2(`<p class="mt-1.5 text-[13px] text-white/80 leading-relaxed line-clamp-2" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.summary)}</p>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div>`);
                  } else {
                    _push2(`<div class="relative overflow-hidden p-6 pb-7 min-h-[160px]" style="${ssrRenderStyle({ "background": "var(--gradient-hero)" })}" data-v-c666bc29${_scopeId}><div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" data-v-c666bc29${_scopeId}></div><div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" data-v-c666bc29${_scopeId}></div><div class="absolute top-1/2 right-8 w-2 h-20 bg-white/20 rounded-full -translate-y-1/2 rotate-12" data-v-c666bc29${_scopeId}></div><div class="absolute top-8 left-12 w-16 h-2 bg-white/15 rounded-full rotate-[-20deg]" data-v-c666bc29${_scopeId}></div><div class="relative z-10" data-v-c666bc29${_scopeId}><div class="flex items-center gap-2 mb-3" data-v-c666bc29${_scopeId}><span class="mobile-hero-tag inline-flex items-center gap-1 text-white font-semibold" data-v-c666bc29${_scopeId}>\u2605 \u7CBE\u9009</span>`);
                    if (article.category) {
                      _push2(`<span class="mobile-hero-tag text-white/80" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.category)}</span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<span class="text-xs text-white/60" data-v-c666bc29${_scopeId}>${ssrInterpolate(formatDate(article.date))}</span></div><h2 class="text-[20px] font-bold text-white leading-snug line-clamp-2" style="${ssrRenderStyle({ "text-shadow": "0 1px 3px rgba(0,0,0,0.2)" })}" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.title)}</h2>`);
                    if (article.summary) {
                      _push2(`<p class="mt-2 text-[13px] text-white/80 leading-relaxed line-clamp-2" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.summary)}</p>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div>`);
                  }
                  _push2(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative rounded-[var(--radius-card)] overflow-hidden h-full" }, [
                      article.cover ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "aspect-[16/9] w-full overflow-hidden"
                      }, [
                        createVNode("img", {
                          src: article.cover,
                          alt: article.title,
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }),
                        createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-5" }, [
                          createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                            article.category ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mobile-hero-tag text-white font-medium"
                            }, toDisplayString(article.category), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("h2", {
                            class: "text-[20px] font-bold text-white leading-snug line-clamp-2",
                            style: { "text-shadow": "0 1px 3px rgba(0,0,0,0.3)" }
                          }, toDisplayString(article.title), 1),
                          article.summary ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1.5 text-[13px] text-white/80 leading-relaxed line-clamp-2"
                          }, toDisplayString(article.summary), 1)) : createCommentVNode("", true)
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "relative overflow-hidden p-6 pb-7 min-h-[160px]",
                        style: { "background": "var(--gradient-hero)" }
                      }, [
                        createVNode("div", { class: "absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" }),
                        createVNode("div", { class: "absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" }),
                        createVNode("div", { class: "absolute top-1/2 right-8 w-2 h-20 bg-white/20 rounded-full -translate-y-1/2 rotate-12" }),
                        createVNode("div", { class: "absolute top-8 left-12 w-16 h-2 bg-white/15 rounded-full rotate-[-20deg]" }),
                        createVNode("div", { class: "relative z-10" }, [
                          createVNode("div", { class: "flex items-center gap-2 mb-3" }, [
                            createVNode("span", { class: "mobile-hero-tag inline-flex items-center gap-1 text-white font-semibold" }, "\u2605 \u7CBE\u9009"),
                            article.category ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mobile-hero-tag text-white/80"
                            }, toDisplayString(article.category), 1)) : createCommentVNode("", true),
                            createVNode("span", { class: "text-xs text-white/60" }, toDisplayString(formatDate(article.date)), 1)
                          ]),
                          createVNode("h2", {
                            class: "text-[20px] font-bold text-white leading-snug line-clamp-2",
                            style: { "text-shadow": "0 1px 3px rgba(0,0,0,0.2)" }
                          }, toDisplayString(article.title), 1),
                          article.summary ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-2 text-[13px] text-white/80 leading-relaxed line-clamp-2"
                          }, toDisplayString(article.summary), 1)) : createCommentVNode("", true)
                        ])
                      ]))
                    ])
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
        _push(`<div class="jj-feed-list" data-v-c666bc29><!--[-->`);
        ssrRenderList(unref(visibleRestArticles), (article, idx) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: article.slug,
            to: "/article/" + article.slug,
            class: "jj-feed-item animate-fade-in-up",
            style: { animationDelay: idx % 10 * 0.05 + "s" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="${ssrRenderClass([{ "jj-feed-body--has-cover": article.cover }, "jj-feed-body"])}" data-v-c666bc29${_scopeId}><div class="jj-feed-content" data-v-c666bc29${_scopeId}><h3 class="jj-feed-title"${ssrRenderAttr("title", article.title)} data-v-c666bc29${_scopeId}>${ssrInterpolate(article.title)} `);
                if (article.featured) {
                  _push2(`<span class="jj-feed-badge" data-v-c666bc29${_scopeId}>\u2605</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</h3>`);
                if (article.summary) {
                  _push2(`<p class="jj-feed-summary" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.summary)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="jj-feed-meta" data-v-c666bc29${_scopeId}><div class="jj-feed-author" data-v-c666bc29${_scopeId}><div class="jj-avatar jj-avatar--sm" data-v-c666bc29${_scopeId}><span class="jj-avatar-text" data-v-c666bc29${_scopeId}>${ssrInterpolate((article.author || article.category || "\u535A").charAt(0))}</span></div><span class="jj-author-name" data-v-c666bc29${_scopeId}>${ssrInterpolate(article.author || article.category || "EasyBlog")}</span></div><div class="jj-feed-stats" data-v-c666bc29${_scopeId}><span class="jj-stat-item" data-v-c666bc29${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-c666bc29${_scopeId}></path></svg> ${ssrInterpolate(formatDate(article.date))}</span><span class="jj-stat-item" data-v-c666bc29${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-c666bc29${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-c666bc29${_scopeId}></path></svg> ${ssrInterpolate(getMobileViews(article).toLocaleString())}</span><span class="jj-stat-item cursor-pointer hover:text-red-500 transition-colors" data-v-c666bc29${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" data-v-c666bc29${_scopeId}></path></svg> ${ssrInterpolate(getMobileLikes(article))}</span></div></div></div>`);
                if (article.cover) {
                  _push2(`<div class="jj-feed-cover" data-v-c666bc29${_scopeId}><img${ssrRenderAttr("src", article.cover)}${ssrRenderAttr("alt", article.title)} loading="lazy" data-v-c666bc29${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", {
                    class: ["jj-feed-body", { "jj-feed-body--has-cover": article.cover }]
                  }, [
                    createVNode("div", { class: "jj-feed-content" }, [
                      createVNode("h3", {
                        class: "jj-feed-title",
                        title: article.title
                      }, [
                        createTextVNode(toDisplayString(article.title) + " ", 1),
                        article.featured ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "jj-feed-badge"
                        }, "\u2605")) : createCommentVNode("", true)
                      ], 8, ["title"]),
                      article.summary ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "jj-feed-summary"
                      }, toDisplayString(article.summary), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "jj-feed-meta" }, [
                        createVNode("div", { class: "jj-feed-author" }, [
                          createVNode("div", { class: "jj-avatar jj-avatar--sm" }, [
                            createVNode("span", { class: "jj-avatar-text" }, toDisplayString((article.author || article.category || "\u535A").charAt(0)), 1)
                          ]),
                          createVNode("span", { class: "jj-author-name" }, toDisplayString(article.author || article.category || "EasyBlog"), 1)
                        ]),
                        createVNode("div", { class: "jj-feed-stats" }, [
                          createVNode("span", { class: "jj-stat-item" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ])),
                            createTextVNode(" " + toDisplayString(formatDate(article.date)), 1)
                          ]),
                          createVNode("span", { class: "jj-stat-item" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              })
                            ])),
                            createTextVNode(" " + toDisplayString(getMobileViews(article).toLocaleString()), 1)
                          ]),
                          createVNode("span", {
                            class: "jj-stat-item cursor-pointer hover:text-red-500 transition-colors",
                            onClick: ($event) => handleMobileLike(article, $event)
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              })
                            ])),
                            createTextVNode(" " + toDisplayString(getMobileLikes(article)), 1)
                          ], 8, ["onClick"])
                        ])
                      ])
                    ]),
                    article.cover ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "jj-feed-cover"
                    }, [
                      createVNode("img", {
                        src: article.cover,
                        alt: article.title,
                        loading: "lazy"
                      }, null, 8, ["src", "alt"])
                    ])) : createCommentVNode("", true)
                  ], 2)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div class="jj-sentinel" data-v-c666bc29></div></div>`);
        if (unref(allLoaded) && unref(visibleRestArticles).length > 0) {
          _push(`<div class="py-8 text-center" data-v-c666bc29><span class="text-xs tracking-widest" style="${ssrRenderStyle({ "color": "var(--color-meta)" })}" data-v-c666bc29>\u2014 \u5DF2\u7ECF\u5230\u5E95\u4E86 \u2014</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div><div class="hidden lg:flex flex-row gap-6" data-v-c666bc29><div class="lg:w-3/4" data-v-c666bc29>`);
      if (unref(filteredArticles).length === 0) {
        _push(`<div class="text-center py-16 px-4" data-v-c666bc29>`);
        if (_ctx.$route.query.q) {
          _push(`<div class="empty-state" data-v-c666bc29><svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-c666bc29></path></svg><p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2" data-v-c666bc29>\u6CA1\u6709\u627E\u5230\u76F8\u5173\u6587\u7AE0</p><p class="text-sm text-gray-400 dark:text-gray-500 mb-5" data-v-c666bc29>\u641C\u7D22\u300C<span class="text-primary font-medium" data-v-c666bc29>${ssrInterpolate(_ctx.$route.query.q)}</span>\u300D\u672A\u5339\u914D\u5230\u4EFB\u4F55\u5185\u5BB9</p><button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" data-v-c666bc29><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-c666bc29></path></svg> \u8FD4\u56DE\u9996\u9875 </button></div>`);
        } else if (_ctx.$route.query.category || _ctx.$route.query.tag) {
          _push(`<div class="empty-state" data-v-c666bc29><svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-c666bc29></path></svg><p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2" data-v-c666bc29>\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u6587\u7AE0</p><p class="text-sm text-gray-400 dark:text-gray-500 mb-5" data-v-c666bc29>\u5C1D\u8BD5\u5207\u6362\u5176\u4ED6\u5206\u7C7B\u6216\u6D4F\u89C8\u5168\u90E8\u6587\u7AE0</p><button class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors font-medium" data-v-c666bc29><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-c666bc29></path></svg> \u8FD4\u56DE\u9996\u9875 </button></div>`);
        } else {
          _push(`<div class="empty-state" data-v-c666bc29><svg class="w-14 h-14 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c666bc29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" data-v-c666bc29></path></svg><p class="text-base font-medium text-gray-600 dark:text-gray-400 mb-2" data-v-c666bc29>\u6587\u7AE0\u6B63\u5728\u8DEF\u4E0A</p><p class="text-sm text-gray-400 dark:text-gray-500" data-v-c666bc29>\u4F5C\u8005\u8FD8\u5728\u52AA\u529B\u521B\u4F5C\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85</p></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800" data-v-c666bc29><!--[-->`);
        ssrRenderList(4, (n) => {
          _push(`<div style="${ssrRenderStyle({ "padding": "18px 22px", "border-bottom": "1px solid #f0f0f0" })}" class="dark:border-gray-800" data-v-c666bc29><div style="${ssrRenderStyle({ "display": "flex", "gap": "18px" })}" data-v-c666bc29><div style="${ssrRenderStyle({ "flex": "1", "min-width": "0" })}" data-v-c666bc29><div class="skeleton-line" style="${ssrRenderStyle({ "width": "65%", "height": "20px", "margin-bottom": "10px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "100%", "height": "14px", "margin-bottom": "8px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "40%", "height": "14px", "margin-bottom": "14px" })}" data-v-c666bc29></div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px" })}" data-v-c666bc29><div class="skeleton-avatar" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "70px", "height": "13px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "60px", "height": "13px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "50px", "height": "13px" })}" data-v-c666bc29></div><div class="skeleton-line" style="${ssrRenderStyle({ "width": "40px", "height": "13px" })}" data-v-c666bc29></div><div class="skeleton-tag" data-v-c666bc29></div><div class="skeleton-tag" data-v-c666bc29></div><div class="skeleton-tag" data-v-c666bc29></div></div></div><div class="skeleton-cover" data-v-c666bc29></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(ssrRenderComponent(ArticleList, {
          articles: unref(filteredArticles),
          key: "list-" + unref(filteredArticles).length
        }, null, _parent));
      }
      _push(`</div><div class="lg:w-1/4" data-v-c666bc29><div class="sticky top-20" data-v-c666bc29>`);
      _push(ssrRenderComponent(Sidebar, {
        categories: unref(categories),
        tags: unref(tags),
        collections: unref(collections)
      }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c666bc29"]]);

export { index as default };
//# sourceMappingURL=index-wXVif6ri.mjs.map
