import Prismic from 'prismic-javascript'
import { prismicConfig, initApi } from './prismic-config'
// const Prismic = require('prismic-javascript')

export default {
  mode: 'universal',
  globalName: 'app',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/reset.scss',
    '@/assets/scss/typography.scss',
    '@/assets/scss/spacing.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/prismic/prismic-vue.js'],
  /*
   ** JS dude!
   */
  script: [
    {
      innerHTML:
        '{ window.prismic = { endpoint: "' + prismicConfig.baseUrl + '"} }',
    },
    { src: '//static.cdn.prismic.io/prismic.min.js', async: true },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '~modules/custom-generate.js',
  ],

  styleResources: {
    // your settings here
    scss: ['@/assets/scss/_vars.scss', '@/assets/scss/_mixins.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // target the client compiler version to fix the prismic-edit-button
      // remove this if no longer needed as it adds 10k to the dist build
      config.resolve.alias.vue = 'vue/dist/vue.common'

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = '#source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      config.node = { fs: 'empty' }
    },
  },
  generate: {
    routes() {
      /**
       * Fetch content for 'home'
       *
       * Want to query a different repeatable Custom Type other than home?
       * Create the CT in Prismic, populate it with content
       * and then change 'home' to 'whatever'
       */
      const homepage = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'home'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: '/',
                payload,
              }
            })
          })
      })

      /**
       * Fetch content for 'pieces'
       *
       * Want to query a different repeatable Custom Type other than pieces?
       * Create the CT in Prismic, populate it with content
       * and then change 'pieces' to 'whatever'
       */
      const pieces = initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'pieces'))
          .then(response => {
            return response.results.map(payload => {
              return {
                route: `/pieces/${payload.uid}`,
                payload,
              }
            })
          })
      })

      // We return an array of the results of each promise using the spread operator.
      // It will be passed to each page as the `payload` property of the `context` object,
      // which is used to generate the markup of the page.
      return Promise.all([homepage, pieces]).then(values => {
        return [...values[0], ...values[1]]
      })
    },
  },
}
