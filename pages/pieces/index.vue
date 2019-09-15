<template>
  <section class="container text--4">
    <h2
      v-for="(piece, index) in pieces"
      :key="`${piece.title}-${index}`"
      class="animate js-animate"
    >
      <nuxt-link :to="piece.uid" append>{{ piece.data.title }}</nuxt-link>
      <span v-if="index < pieces.length - 1">•&nbsp;</span>
    </h2>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic-config'

export default {
  data() {
    return {
      pieces: [],
    }
  },
  asyncData(context) {
    if (context.payload) {
      return generatePageData('pieces', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'pieces'))
          .then(response => {
            return generatePageData('pieces', response.results)
          })
      })
    }
  },
  mounted() {
    this.$app.$emit('page::mounted')
  },
}
</script>

<style lang="scss">
a {
  display: inline-flex;
  &:hover {
    text-decoration: none;
    color: $color-interactive;
  }
}
h2 {
  display: inline-block;
}
</style>
