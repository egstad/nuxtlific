/* ==========================================================================
   ANIMATE
   ==========================================================================
   • When ".js-animate" elements are in view, ".is-visible" class is added.
   • Intersection Observer for modern browsers
   ========================================================================== */

const animate = {
  init() {
    this.elements = window.$app.$el.querySelectorAll('.js-animate')
    this.options = { threshold: 0 }

    this.observe()
  },

  destroy() {
    this.elements.forEach(item => {
      this.observer.unobserve(item)
    })
    this.elements = []
  },

  observe() {
    this.observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if (item.isIntersecting) {
          // in view
          item.target.classList.add('is-visible')
        } else {
          // out of view
          item.target.classList.remove('is-visible')
        }
      })
    }, this.options)

    this.elements.forEach(item => {
      this.observer.observe(item)
    })
  },
}

if (process.client) {
  window.onAppReady(app => {
    animate.init()

    // route is changing
    window.$app.$on('route::updated', () => {
      // out with the old
      animate.destroy()
    })

    // page is ready!
    window.$app.$on('page::mounted', () => {
      // in with the new
      animate.init()
    })
  })
}

export default animate
