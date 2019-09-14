<template>
  <section class="container">
    <h1>{{ pieces.title }}</h1>
    <div v-for="(piece, index) in pieces" :key="`${piece.title}-${index}`">
      <h2>
        <nuxt-link :to="piece.uid" append>{{ piece.data.title }}</nuxt-link>
      </h2>
    </div>
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
}
</script>

<style lang="scss">
a {
  display: block;
  padding: $space-1;
}
</style>
