// import dom from "./dom"
import utils from './utils'

/* ==========================================================================
   SCROLL
   ==========================================================================
   • Handles global scroll events and adds classes for
   • Scroll is at top
   • Scroll is at bottom
   • User is scrolling
   • Scroll is complete
   • Scrolling left, right, down, or up
   ========================================================================== */

const scroll = {
  docX: 0,
  docY: 0,
  scrollY: 0,
  scrollX: 0,
  userHasScrolled: 0,
  isScrolling: 0,
  isScrollTimeout: 0,

  init() {
    this.bindEvents()
    this.isScrollTop()
  },

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.isScroll()

      if (!this.isScrolling) {
        window.requestAnimationFrame(() => {
          this.isScrolling = false
        })

        this.isScrolling = true
        window.$app.$emit('scroll::start')
        this.scrollDirector()
      }

      // clear and then reset timer on scroll
      window.clearTimeout(this.isScrollTimeout)
      this.scrollTimeout()

      // update values
      this.scrollX = document.body.getBoundingClientRect().left
      this.scrollY = document.body.getBoundingClientRect().top
      this.userHasScrolled = 1
    })
  },

  scrollDirector() {
    utils.docX = document.body.getBoundingClientRect().left
    utils.docY = document.body.getBoundingClientRect().top
    utils.docHeight = document.body.scrollHeight
    utils.docWidth = document.body.scrollWidth

    if (utils.docY > this.scrollY) {
      this.scrollUp()
    } else if (utils.docY < this.scrollY) {
      this.scrollDown()
    } else if (utils.docX > this.scrollX) {
      this.scrollLeft()
    } else if (utils.docX < this.scrollX) {
      this.scrollRight()
    }

    this.isTopOut()
  },

  isTopOut() {
    const isAtTop = (utils.docY === 0) === true
    const isAtBottom =
      utils.docHeight <= -(Math.ceil(utils.docY - 1) - utils.winHeight) === true

    // at top
    if (isAtTop) {
      this.isScrollTop()
    }
    // at bottom
    if (isAtBottom) {
      this.isScrollBottom()
    }
  },

  scrollTimeout() {
    this.isScrollTimeout = setTimeout(() => {
      document.documentElement.classList.remove('is-scrolling')
      window.$app.$emit('scroll::end')
      // update window measurement
      // in case images/video/ets load and change body height
      utils.measureWindow()
    }, 250)
  },

  isScroll() {
    document.documentElement.classList.add('is-scrolling')
    document.documentElement.classList.remove(
      'is-scroll-top',
      'is-scroll-bottom'
    )
  },

  scrollEnd() {
    document.documentElement.classList.remove('is-scrolling')
  },

  scrollDown() {
    document.documentElement.classList.add('scrolling-down')
    document.documentElement.classList.remove('scrolling-up')
  },

  scrollUp() {
    document.documentElement.classList.add('scrolling-up')
    document.documentElement.classList.remove('scrolling-down')
  },

  scrollLeft() {
    document.documentElement.classList.add('scrolling-left')
    document.documentElement.classList.remove('scrolling-right')
  },

  scrollRight() {
    document.documentElement.classList.add('scrolling-right')
    document.documentElement.classList.remove('scrolling-left')
  },

  isScrollBottom() {
    document.documentElement.classList.add('is-scroll-bottom')
    // document.documentElement.classList.remove("is-scroll-top")
  },

  isScrollTop() {
    document.documentElement.classList.add('is-scroll-top')
    // document.documentElement.classList.remove("is-scroll-bottom")
  },
}

if (process.client) {
  window.onAppReady(app => {
    scroll.init()
  })
}

export default scroll
