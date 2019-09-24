# PLUGINS

This directory contains Javascript plugins that you want to run before mounting the root Vue.js application. More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/plugins).

---

## Animate.js

This is a lightweight plugin that adds viewport animation functionality to the app. When ".js-animate" elements are in view, ".is-visible" class is added. 

**Setup**
`onAppReady` and `page::mounted`

**Teardown**
`route::updated`

---

## Lazyloader.js

Converts the vanilla-lazyload plugin into a vue-directive. To create a lazy element, simply add `v-lazy` to the DOM element.

**Setup**
Handled by Vue in `directive.bind()`

**Teardown**
Handled by Vue in `directive.unbind()`

---

## Scrolls.js

A small plugin that handles global scroll events and adds classes for when:

- Scroll is at top
- Scroll is at bottom
- User is scrolling
- Scroll is complete
- Scrolling left, right, down, or up

**Setup**
Is setup only once on `onAppReady`.

**Teardown**
Never tears down.

---

## Device.js

A handful of helpful methods that gather information about the user's device. Specifically:

- If device can be manipulated by touch and/or cursor
- Window dimensions
- Document dimensions
- Handles window resizes and stores dimensions in Vuex
- And more!

**Setup**
`onAppReady` and `page::mounted`

**Teardown**
Never tears down.

