<template>
  <nav class="site-menu">
    <ul class="text--3">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/pieces">Pieces</nuxt-link>
      </li>
      <li>
        <a href="https://github.com/egstad/nuxtlific" target="_blank">Github</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.site-menu {
  position: relative;
  color: $color-bg;
  // border-bottom: 1px solid $color-fg;

  ul {
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    line-height: 1;
    border-bottom: 1px solid $color-fg;
  }

  a {
    transition: color $trans-duration/2 $trans-ease;
    display: block;
    padding: 0.5em 20px 0.6em;
    margin: 0;

    &:hover {
      text-decoration: none;
      color: $color-interactive;
    }

    &.nuxt-link-exact-active {
      color: $color-interactive;
    }
  }
}
</style>
