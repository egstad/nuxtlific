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
  padding: $space-1;
  position: relative;

  ul {
    width: 100%;
    display: inline-flex;
    border-bottom: 1px solid $color-fg;
  }

  a {
    display: block;
    padding: $space-1;

    &.nuxt-link-exact-active {
      color: $color-interactive;
    }
  }
}
</style>
