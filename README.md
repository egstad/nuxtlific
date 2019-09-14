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


### Nuxt Config
#### globalName
Nuxt's global ID has been renamed from 'nuxt' to 'app'. Doing so changes the name of a handful of global names. See below.

```bash
{
  id: globalName => `__app`,
  nuxt: globalName => `$app`,
  context: globalName => `__App__`,
  pluginPrefix: globalName => `__app`,
  readyCallback: globalName => `onAppReady`,
  loadedCallback: globalName => `_onAppLoaded`
},
```
