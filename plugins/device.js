/* ==========================================================================
   DEVICE
   ==========================================================================
   • Determines if device can be manipulated by touch and/or cursor
   • Determines window dimentions
   • Determines document dimentions
   • Handles window resizes and stores dimensions in Vuex
   • And more
   ========================================================================== */

const device = {
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
}

if (process.client) {
  window.onAppReady(app => {
    device.init()

    // update on new page
    window.$app.$on('page::mounted', () => {
      device.measureWindow()
    })
  })
}

export default device
