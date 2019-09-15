<template>
  <img
    class="image"
    :srcset="[size.sm, size.md, size.lg, size.xl]"
    :alt="alt"
  />
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      alt: '',
      aspectRatio: '',
      dimensions: {},
      size: {},
    }
  },
  created() {
    this.alt = this.image.alt
    this.dimensions = {
      width: this.image.dimensions.width,
      height: this.image.dimensions.height,
    }
    this.aspectRatio = this.dimensions.width / this.dimensions.height
    this.size = {
      sm: `${this.image.mobile.url} 640w`,
      md: `${this.image.tablet.url} 1024w`,
      lg: `${this.image.laptop.url} 1600w`,
      xl: `${this.image.desktop.url} 2500w`,
      fl: `${this.image.url}`,
    }

    console.log(this.sizes)
  },
}
</script>

<style lang="scss">
.image {
  display: block;
  width: 100%;
}
</style>
