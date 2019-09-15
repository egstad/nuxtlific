// import dom from '@/plugins/dom'
// import TweenMax from 'gsap/TweenMax'

export const state = () => ({
  /**
   * BROWSER MEASUREMENTS
   */
  winWidth: null,
  winHeight: null,
  docWidth: null,
  docHeight: null,

  /**
   * DEVICE INFO
   */
  deviceIsTouch: null,
  deviceIsCursor: null,
  deviceIsMobile: null,
})

export const mutations = {
  /**
   * Dimensions
   */
  setDimensions(state, val) {
    state.winWidth = val.winWidth
    // window height
    state.winHeight = val.winHeight
    // body scroll width
    state.docWidth = val.docWidth
    // body scroll height
    state.docHeight = val.docHeight
  },

  /**
   * Dimensions
   */
  setDevice(state, val) {
    state.deviceIsTouch = val.isTouch
    state.deviceIsCursor = val.isCursor
    state.deviceIsMobile = val.isMobile
  },
}
