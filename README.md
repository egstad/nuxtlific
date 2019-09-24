# nuxtlific

> [Prismic](https://prismic.io/docs/javascript/getting-started/integrating-with-an-existing-javascript-project) + [Netlify](https://www.netlify.com/docs/) + [Nuxt](https://nuxtjs.org/) = The JAM-est of stacks

[![Netlify Status](https://api.netlify.com/api/v1/badges/00905143-4df8-4d02-b65b-0a6f97ba4e85/deploy-status)](https://app.netlify.com/sites/nuxtlific/deploys)

## Install

First things first, clone the repo.
`git clone https://github.com/egstad/nuxtlific.git`

## Build Scripts

| Command            | Description                            |
|--------------------|----------------------------------------|
| `npm i`            | Install dependencies                   |
| `npm start`        | Launch dev server                      |
| `npm run build`    | Build for production                   |
| `npm run server`   | Serve for production (run build first) |
| `npm run generate` | Build application and generate routes  |
| `npm run lint`     | Lint application                       |

Nuxtlific's `start` command is Nuxt's `nuxt run dev`. For detailed explanation on how things work, check out [Nuxt.js command docs](https://nuxtjs.org/guide/commands/).

## Prismic

[Prismic](https://prismic.io) is a headless CMS that is more or less a Contentful clone, but is less robust and far more cost-effective. All in all, it slaps. The largest pain is getting it up and running, which is why this project exists.

Out of the box this repo assumes that you've configured two **Custom Types** within your Prismic repo and have populated them with some content:

• `home` (single, non-repeatable)
• `pieces_single` (repeatable)

Want to use other Custom Types - like `pieces` or whatever? That's fine, but I recommend starting off with these two until you get the hang of it. When you get your sea legs and you're ready to add/edit these types, here are few steps:

### Adding Prismic Content Types

1. Edit the `generate` property found in `nuxt.config.js`
2. Create a template(s) for your new Content Type `pages/pageName.vue`. For the single, non-repeatable types, I recommend using the Home template `./pages/index.vue` as your starter. For repeatable tyeps, I recommend using the Pieces templates as a starter — `./pages/pieces/index.vue` `./pages/pieces/_slug.vue`.
3. Add/Edit `generatePageData()` found in `prismic-config.js`
4. Test it out by running 'npm run generate'. Something shit the bed? Hope not!

## Netlify

Out of the box, Netlify has nothing to do with this repo. I know, it's a little misleading. That said, if you intend to continuously deploy your project, Netlify is the easiest tool I've found. To link Prismic to Netlify, simply setup a Build Hook, copy and paste that URL into Prismic's webhooks found under settings. Now every time you push to your repo's `master`, Netlify will rebuild and redeploy your site. 

## Nuxt

Nuxt.js is a server-rendered Vue.js framework. This particular repo is running Nuxt `2.9.2` and is made up of the following packages:

- Vue 2
- Vue Router
- Vuex
- Vuex (included only when using the store option)
- Vue Server Renderer (excluded when using mode: 'spa')
- vue-meta

A total of only 60kB min+gzip. Bitchin'. [Learn more about Nuxt here](https://nuxtjs.org/guide).

### Updated globalName

Keep in mind that Nuxtlific updates Nuxt's global ID from `nuxt` to `app`. Doing so changes the name of a handful of global names. See below.

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

### Nuxtlific Events

In addition to Vue's and Nuxt's hooks, Nuxtlific contains a handful of event emitters that disperse information throughout the app. 

| Emitter          | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| `page::mounted`  | The page has mounted. This informs certain events for teardown/inits/etc. |
| `route::updated` | The page is changing. This informs certain events for teardown/inits/etc. |
| `scroll::start`  | The user has begun scrolling.                                             |
| `scroll::end`    | The user has stopped scrolling.                                           |

#### Event Emitter

- Emit inside of a `.vue` file? `this.$app.$emit('page::mounted')`
- Emit inside of a `.js` file? `window.$app.$emit('route::updated', () => {...})`

#### Event Listener

- Emit inside of a `.vue` file? `this.$app.$on('page::mounted')`
- Emit inside of a `.js` file? `window.$app.$on('route::updated', () => {...})`

#### Event Unsubscribe

To stop listening, run `off` intead. (`this.$app.$off('page::mounted')`)
