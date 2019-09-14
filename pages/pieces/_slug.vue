<template>
  <div class="container">
    <h1 v-if="title">{{ title }}</h1>
    <h2 v-else>nots workin</h2>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import { initApi, generatePageData } from '@/prismic-config'

export default {
  asyncData(context) {
    if (context.payload) {
      return generatePageData('piece', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('my.pieces.uid', context.params.slug))
          .then(response => {
            return generatePageData('piece', response.results[0].data)
          })
      })
    }
  },
}
</script>
