<template>
  <div class="container">
    <h1 v-if="title">{{ title }}</h1>
    <pic :image="image" />
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import Pic from '@/components/Pic'
import { initApi, generatePageData } from '@/prismic-config'

export default {
  components: {
    Pic,
  },
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
