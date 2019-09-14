<template>
  <div>
    <SiteMenu />
    <main>
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

<style lang="scss">
main {
  padding: 0 $space-1;
}
</style>
