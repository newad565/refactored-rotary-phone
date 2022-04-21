---
template: blog-post
title: Remark Rehype
path: /posts/remark-rehype
date: 2021-11-13 10:30
description: Remark Rehype add components to .md
tags: [remark, rehype]
category: code   
featuredImage: ../../../static/assets/sebastiaan-stam-5hbrem-5mnq-unsplash.jpg
---

## Remark Rehype

My blog-posts.js template has been transformed to htmlAst for components in markdown.

Excerpt from Using rehype to add components to markdown by: 
[Ryan Filler](https://www.ryanfiller.com/blog/remark-and-rehype-plugins)

It isn’t necessary to understand the computer science behind an abstract syntax tree (AST) to work with plugins. All you need to know is that an AST is an intermediary step that a compiler takes between taking in a .md and outputting an .html file. 

To paraphrase heavily from the mdsvex docs, the source file is first parsed into a Markdown AST (MDAST), where remark plugins run. Then the data is converted into an HTML AST (HAST), where rehype plugins run. Finally the data is converted (stringified) into valid markup for the browser.

### What is Remark?

Remark is a unified processor to parse and serialize Markdown.

API by unified Parses Markdown to a syntax tree with remark-parse
mdast syntax tree.

Plugins transform the tree Serializes syntax trees to Markdown with remark-stringify.

### What is Rehype?

Rehype is a unified processor to parse and serialize HTML
API by unified.

Parses HTML to the tree with rehype-parse hast syntax tree.

Plugins transform the tree Serializes the tree to HTML with rehype-stringify.

## Add  to your Site

Fist install in Node Modules.

```bash
yarn add rehype-react
```

Then add to your post template.

```javascript
import rehypeReact from "rehype-react"
//Components
import Counter from "../components/counter"
import SiteTags from '../components/site-tags'
import SiteCategory from "../components/site-categories"
import Checked from "../components/checkbox"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    "counter": Counter, // Components
    "tags": SiteTags,
    "categories": SiteCategory,
    "checked": Checked,
  },
}).Compiler
```

## Change your page to htmlAst

### From

```javascript
<div
    className="blog-post-content"
    dangerouslySetInnerHTML={{ __html: html }}
/>
```

### To

```javascript
<div
    className="blog-post-content"
>
    {
        renderAst(htmlAst)
    }
</div>
```

Change your Template Query from html to htmlAst. Its that simple to have MDX capability's in Gatsby without the overhead of MDX.

Then in your markdown page add your component where ever you like. You can also add html to your Markdown pages using htmlAst.

```javascript
<counter></counter>
```

Below is a simple counter component added to a markdown.md page.

<counter></counter>

Other components for tags and categories is on [Category-Tags Page](/posts/category-tags) page.
