<template>
  <nav class="site-menu">
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/pieces">Pieces</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.site-menu {
  background: $color-fg;

  ul {
    display: inline-flex;
  }

  a {
    display: block;
    padding: $space-1;
    color: $color-bg;

    &.nuxt-link-exact-active {
      background: $color-interactive;
    }
  }
}
</style>
