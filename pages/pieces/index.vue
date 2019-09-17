<template>
  <section class="container">
    <h2
      v-for="(piece, index) in pieces"
      :key="`${piece.data.title}-${index}`"
      class="animate js-animate"
    >
      <nuxt-link :to="piece.uid" class="text--5" append>
        {{ piece.data.title }}
      </nuxt-link>
    </h2>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import { routeTransitionFade } from '@/mixins/route-transitions'
import { initApi, generatePageData } from '@/prismic-config'

export default {
  mixins: [routeTransitionFade],
  asyncData(context) {
    if (context.payload) {
      return generatePageData('pieces_single', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'pieces_single'), {
            orderings: '[document.first_publication_date]',
          })
          .then(response => {
            return generatePageData('pieces_single', response.results)
          })
      })
    }
  },
  mounted() {
    this.$app.$emit('page::mounted')
  },
  // head() {
  //   return this.$setPageMetadata(this.pageContent)
  // },
}
</script>

<style lang="scss" scoped>
h2 {
  overflow: hidden;
}
a {
  display: block;

  &:hover {
    text-decoration: none;
    color: $color-interactive;
  }
}
</style>
