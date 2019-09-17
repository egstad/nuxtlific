/* ==========================================================================
   Page Metadata
   ==========================================================================
   Injected method to allow Prismic data to set the metadata of each page
   @param pageData Object
   ========================================================================== */
import Vue from 'vue'

Vue.prototype.$setPageMetadata = pageData => {
  if (pageData === undefined) {
    return
  }

  // get meta values and add to an array. Only add items that have a value.
  // Items with a null value will use the site defaults.
  const pageMeta = []

  // Title for search and browser tab
  const pageTitle = pageData.title || process.env.npm_package_name

  // Image for social
  // if (pageData.social_image) {
  //   pageMeta.push({
  //     hid: `og:image`,
  //     property: 'og:image',
  //     content: pageData.social_image,
  //   })
  // }

  // Description for social
  // if (pageData.social_description) {
  //   pageMeta.push({
  //     hid: `og:description`,
  //     property: 'og:description',
  //     content: pageData.social_description,
  //   })
  // }

  // Title for social
  // if (pageData.title[0].text) {
  //   pageMeta.push({
  //     hid: `og:title`,
  //     property: 'og:title',
  //     content: pageTitle,
  //   })
  // }

  // Description for search
  // if (pageData.meta_description) {
  //   pageMeta.push({
  //     hid: `description`,
  //     name: 'description',
  //     content: pageData.meta_description,
  //   })

  //   // if there's no specified social description use the meta one
  //   if (!pageData.social_description) {
  //     pageMeta.push({
  //       hid: `og:description`,
  //       property: 'og:description',
  //       content: pageData.meta_description,
  //     })
  //   }
  // }

  // If no social title is specified fallback to either the meta title and failing that just Instrument.
  // if (!pageData.social_title) {
  //   pageMeta.push({
  //     hid: `og: title`,
  //     property: 'og:title',
  //     content: metaTitle,
  //   })
  // }

  return {
    title: pageTitle,
    meta: [
      // SEO and Social metadata
      ...pageMeta,
    ],
  }
}
