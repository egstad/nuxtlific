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
  padding: 10px 0;
  position: relative;
  // border-bottom: 1px solid $color-fg;

  ul {
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
  }

  a {
    transition: border-color $trans-duration/2 $trans-ease,
      color $trans-duration/2 $trans-ease;
    display: block;
    padding: 1rem 2rem 1.5rem;
    margin: 0 10px;
    line-height: 1;
    border: 0.08em solid transparent;
    border-radius: 100%;

    &:hover {
      text-decoration: none;
      border-color: $color-interactive;
      color: $color-interactive;
    }

    &.nuxt-link-exact-active {
      border-color: $color-fg;
      color: $color-fg;
    }
  }
}
</style>
