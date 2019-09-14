# nuxtlific

> Prismic + Netlify + Nuxt.js

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm start (alias: npm run dev)

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Prismic
[Prismic](https://prismic.io) is a headless CMS that is more or less a Contentful clone, but is less robust and far more affordable. All in all, it slaps. The largest pain is getting it up and running, which is why this project exists.

Out of the box this repo assumes that you've configured two **Custom Types** within your Prismic repo and have populated them with some content.

• Home (single, non-repeatable)
• Pieces (repeatable)

Want to use other Custom Types? That's fine, but I recommend starting off with these two until you get the hang of it. When you get your sea legs and you're ready to add/edit these types, here are few steps:

1. Edit the generate property found in `nuxt.config.js`
2. Create a template(s) for your new Content Type `pages/pageName.vue`. For the single, non-repeatable types, I recommend using the Home template `./pages/index.vue` as your starter. For repeatable tyeps, I recommend using the Pieces templates as a starter — `./pages/pieces/index.vue` `./pages/pieces/_slug.vue`.
3. Add/Edit `generatePageData()` found in `prismic-config.js`
4. Test it out by running 'npm run generate'. Something shit the bed? Hope not!


### Nuxt Config
#### globalName
Nuxt's global ID has been renamed from 'nuxt' to 'app'. Doing so changes the name of a handful of global names. See below.

```bash
{
  id: "__app",
  nuxt: "$app",
  context: "__App__",
  pluginPrefix: "__app",
  readyCallback: "onAppReady",
  loadedCallback: "_onAppLoaded"
}
```
