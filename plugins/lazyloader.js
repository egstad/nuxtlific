import Vue from 'vue'
import LazyLoad from 'vanilla-lazyload'

Vue.directive('lazy', {
  // When the bound element is inserted into the DOM...
  inserted(el) {},
  bind(el) {
    // has to be array/nodelist
    el.item = []
    el.item.push(el)
    el.instance = new LazyLoad(
      {
        thresholds: `${window.innerHeight * 2}px 0%`,
      },
      el.item
    )
  },
  unbind(el) {
    el.instance.destroy()
  },
})
