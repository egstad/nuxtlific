import gql from 'graphql-tag'
import { prismicConfig, initApi } from './prismic-config'

export default {
  mode: 'universal',
  globalName: 'app',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=2',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        property: 'og:title',
        content: process.env.npm_package_name || '',
        vmid: 'og:title',
      },
      {
        property: 'og:url',
        content: 'https://egstad.com',
        vmid: 'og:url',
      },
      {
        property: 'og:type',
        content: 'website',
        vmid: 'og:type',
      },
      {
        property: 'og:site_name',
        content: process.env.npm_package_name || '',
        vmid: 'og:site_name',
      },
      {
        property: 'og:description',
        content: process.env.npm_package_description || '',
        vmid: 'og:description',
      },
      // {
      //   property: 'og:image:width',
      //   content: '1200',
      //   vmid: 'og:image:width',
      // },
      // {
      //   property: 'og:image:height',
      //   content: '630',
      //   vmid: 'og:image:height',
      // },
      // {
      //   property: 'og:image',
      //   content: ``,
      //   vmid: 'og:image',
      // },
      // {
      //   property: 'twitter:site',
      //   content: '',
      //   vmid: 'twitter:site',
      // },
      // {
      //   property: 'twitter:creator',
      //   content: '',
      //   vmid: 'twitter:creator',
      // },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://code.jquery.com',
      },
      {
        rel: 'preconnect',
        href: 'https://egstad.prismic.io/',
      },
    ],
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
    __dangerouslyDisableSanitizers: ['script'],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'rgb(243, 62, 17)' },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/reset.scss',
    '@/assets/scss/typography.scss',
    '@/assets/scss/spacing.scss',
    '@/assets/scss/animate.scss',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/prismic/prismic-vue.js',
    '@/plugins/page-metadata.js',
    '@/plugins/device.js',
    {
      src: '@/plugins/scrolls.js',
      ssr: false,
    },
    {
      src: '@/plugins/lazyloader.js',
      ssr: false,
    },
    {
      src: '@/plugins/animate.js',
      ssr: false,
    },
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

  /*
   ** Progressive web app information
   */
  pwa: {
    manifest: {
      name: process.env.npm_package_name,
      lang: 'en',
    },
  },

  /*
   ** Share variables, mixins, functions across all style files (no @import needed)
   */
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

    transpile: ['TweenMax', 'SplitText'],
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
      const homepage = initApi
        .query({
          query: gql`
            query {
              allHomes {
                edges {
                  node {
                    title
                    _linkType
                  }
                }
              }
            }
          `,
        })
        .then(response => {
          return response.data.allHomes.edges.map(payload => {
            return {
              route: `/`,
              payload,
            }
          })
        })
        .catch(error => {
          console.error(error)
        })

      const piecesSingles = initApi
        .query({
          query: gql`
            query {
              allPieces_singles(sortBy: meta_firstPublicationDate_ASC) {
                edges {
                  node {
                    _meta {
                      uid
                    }
                    title
                  }
                }
                totalCount
              }
            }
          `,
        })
        .then(response => {
          return response.data.allPieces_singles.edges.map(payload => {
            return {
              route: `/pieces/${payload.node._meta.uid}`,
              payload,
            }
          })
        })
        .catch(error => {
          console.error(error)
        })

      // We return an array of the results of each promise using the spread operator.
      // It will be passed to each page as the `payload` property of the `context` object,
      // which is used to generate the markup of the page.
      return Promise.all([homepage, piecesSingles]).then(values => {
        return [...values[0], ...values[1]]
      })
    },
  },
}
