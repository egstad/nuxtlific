import { TweenLite, Power2 } from 'gsap'

export const routeTransitionFade = {
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeEnter(el) {
      this.$store.commit('isTransitioning', 'true')
      TweenLite.set(el, {
        opacity: 0,
        y: 15,
      })
    },
    enter(el, done) {
      TweenLite.to(el, 0.5, {
        ease: Power2.easeOut,
        delay: 0,
        opacity: 1,
        y: 0,
        onComplete: done,
      })
    },
    leave(el, done) {
      TweenLite.to(el, 0.3, {
        ease: Power2.easeOut,
        opacity: 0,
        y: 15,
        onComplete: done,
      })
    },
    afterLeave() {
      this.$store.commit('isTransitioning', 'false')
    },
  },
}
