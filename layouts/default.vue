<template>
  <div>
    <SiteMenu />
    <main class="site">
      <nuxt />
    </main>
  </div>
</template>

<script>
import SiteMenu from '@/components/SiteMenu'

export default {
  components: {
    SiteMenu,
  },
}
</script>
