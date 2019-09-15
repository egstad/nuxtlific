// import dom from "./dom"

/* ==========================================================================
   UTILS
   ==========================================================================
   • Helpful global variables and functions
   ========================================================================== */

const utils = {
  init() {
    if (process.client) {
      // device detection
      this.isTouch = 'ontouchstart' in window || 'DocumentTouch' in window
      this.isMobile = /Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Opera Mini/gi.test(
        window.navigator.userAgent
      )
      this.isCursor = 'onmousedown' in document.documentElement

      // viewport dimensions
      this.winWidth = window.innerWidth
      this.winHeight = window.innerHeight

      // scrollable area
      this.docHeight = document.body.scrollHeight
      this.docWidth = document.body.scrollWidth

      // scroll position
      this.docX = document.body.getBoundingClientRect().left
      this.docY = document.body.getBoundingClientRect().top

      // resize throttler
      this.resizeHandler = this.resizeHandler.bind(this)
      this.throttled = false
      this.delay = 250
    }

    // add device-specific classes to html element
    this.setDeviceClasses()
    // measure the window
    this.measureWindow()
    // touch? cursor? mobile?
    this.getDeviceInfo()
    // set scroll history to manual
    this.scrollHistory()
    // remeasure the window on resize
    window.addEventListener('resize', this.resizeHandler)
  },

  setDeviceClasses() {
    // touch support
    if (this.isTouch) {
      document.documentElement.classList.add('device-has-touch')
    }

    // cursor support
    if (this.isCursor) {
      document.documentElement.classList.add('device-has-pointer')
    }

    // mobile device
    if (this.isMobile) {
      document.documentElement.classList.add('device-has-mobile')
    }
  },

  // sets scroll restoration to manual from auto
  // this is so that the browser doesn't jump the gun and
  // change scroll position before the route has completed
  scrollHistory() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  },

  measureWindow() {
    this.winWidth = window.innerWidth
    this.winHeight = window.innerHeight
    this.docHeight = document.body.scrollHeight
    this.docWidth = document.body.scrollWidth

    const values = {
      winWidth: this.winWidth,
      winHeight: this.winHeight,
      docHeight: this.docHeight,
      docWidth: this.docWidth,
    }

    document.body.style.minHeight = `${values.winHeight}px`
    window.$app.$store.commit('setDimensions', values)
  },

  getDeviceInfo() {
    const values = {
      isTouch: this.isTouch,
      isCursor: this.isCursor,
      isMobile: this.isMobile,
    }
    window.$app.$store.commit('setDevice', values)
  },

  resizeHandler() {
    if (!this.throttled) {
      this.measureWindow()
      this.throttled = true

      setTimeout(() => {
        this.throttled = false
      }, this.delay)
    }
  },

  // is element in view?
  isElementVisible(el) {
    let ret = false

    if (el) {
      const bounds = el.getBoundingClientRect()

      ret = bounds.top < utils.winHeight && bounds.bottom > 0
    }
    return ret
  },

  /**
   * @name splitValuesRGB
   * @desc converts string of rgb into an object
   * @args an rgb string (ie: '24, 34, 255')
   */
  splitValuesRGB(color) {
    const array = color.replace(/\s+/g, '').split(',')
    const rgb = {}

    rgb.r = parseInt(array[0], 10)
    rgb.g = parseInt(array[1].replace(/%+/g, ''), 10)
    rgb.b = parseInt(array[2].replace(/%+/g, ''), 10)
    return rgb
  },

  // get random array
  random(array) {
    return array[Math.floor(Math.random() * array.length)]
  },
}

if (process.client) {
  window.onAppReady(app => {
    utils.init()

    // update on new page
    window.$app.$on('page::mounted', () => {
      utils.measureWindow()
    })
  })
}

export default utils
