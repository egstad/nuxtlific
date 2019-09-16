<template>
  <section class="container">
    <span v-if="error.statusCode === 404">Page not found</span>
    <span v-else>An error occurred</span>
    <NuxtLink to="/">Home</NuxtLink>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
