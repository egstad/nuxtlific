<!-- pages/index.vue -->

<template>
  <section class="container">
    <header class="spacing-bottom-4">
      <prismic-rich-text :field="title" />
    </header>

    <template v-for="(slice, index) in slices">
      <div :key="`${slice}-${index}`" :class="slice.slice_type">
        <prismic-rich-text :field="slice.items[0].content" />
      </div>
    </template>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
// import PrismicDOM from 'prismic-dom'
import { initApi, generatePageData } from '@/prismic-config'

export default {
  asyncData(context) {
    if (context.payload) {
      return generatePageData('home', context.payload.data)
    } else {
      return initApi().then(api => {
        return api
          .query(Prismic.Predicates.at('document.type', 'home'))
          .then(response => {
            return generatePageData('home', response.results[0].data)
          })
      })
    }
  },
}
</script>
