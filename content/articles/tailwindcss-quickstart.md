---
title: TailwindCSS 快速入门
slug: tailwindcss-quickstart
date: 2026-04-28
category: 技术
tags:
  - TailwindCSS
  - CSS
  - 前端
summary: 一篇关于 TailwindCSS 的快速入门指南，介绍核心概念和常用工具类。
---

## TailwindCSS 快速入门

TailwindCSS 是一个实用优先的 CSS 框架，它提供了大量的工具类，让你可以直接在 HTML 中构建自定义设计。

### 核心概念

TailwindCSS 的核心理念是**实用优先**（Utility-First），不同于 Bootstrap 等组件级框架，TailwindCSS 提供的是原子级的 CSS 类。

### 常用工具类

#### 布局

- `flex` / `grid` - 弹性布局 / 网格布局
- `items-center` - 垂直居中
- `justify-between` - 两端对齐
- `gap-4` - 间距

#### 间距

- `p-4` - 内边距
- `m-4` - 外边距
- `px-4` - 水平内边距
- `py-2` - 垂直内边距

#### 文字

- `text-lg` - 大号文字
- `font-bold` - 粗体
- `text-gray-600` - 灰色文字

### 响应式设计

TailwindCSS 使用移动优先的响应式设计：

- `sm:` - 640px 以上
- `md:` - 768px 以上
- `lg:` - 1024px 以上
- `xl:` - 1280px 以上

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  响应式宽度
</div>
```
