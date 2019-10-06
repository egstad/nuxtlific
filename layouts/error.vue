<template>
  <section class="container">
    <span v-if="error.statusCode === 404">{{ error.message }}</span>
    <span v-else>{{ error.message }}</span>
    <NuxtLink to="/">Home</NuxtLink>
  </section>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'An error occurred.',
    },
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
