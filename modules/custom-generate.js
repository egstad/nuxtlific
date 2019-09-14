/**
 * Custom generator module that contains a blacklist of pages that should
 * not be statically generated because they require service calls.
 */
module.exports = function() {
  // eslint-disable-next-line require-await
  this.nuxt.hook('generate:extendRoutes', async routes => {
    const blackList = ['/preview'] // routes that should not be generated
    const routesToGenerate = routes.filter(
      page => !blackList.includes(page.route)
    )
    routes.splice(0, routes.length, ...routesToGenerate)
  })
}
