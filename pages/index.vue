<!-- pages/index.vue -->

<template>
  <section class="container">
    <header class="spacing-bottom-4">
      <Logo />
    </header>

    <template v-for="(slice, index) in slices">
      <div
        :key="`${slice}-${index}`"
        :class="`slice-${slice.slice_type}`"
        class="animate js-animate wrap"
      >
        <prismic-rich-text
          v-if="slice.slice_type === 'rich_text'"
          :field="slice.items[0].content"
        />

        <figure v-if="slice.slice_type === 'image'">
          <Pic
            v-if="slice.slice_type === 'image'"
            :image="slice.primary.image"
          />
          <figcaption v-if="slice.primary.caption">
            <prismic-rich-text :field="slice.primary.caption" />
          </figcaption>
        </figure>
      </div>
    </template>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import Logo from '@/components/Logo'
import Pic from '@/components/Pic'
import { routeTransitionFade } from '@/mixins/route-transitions'
import { initApi, generatePageData } from '@/prismic-config'

export default {
  components: {
    Logo,
    Pic,
  },
  mixins: [routeTransitionFade],
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
  mounted() {
    this.$app.$emit('page::mounted')
  },
}
</script>

<style lang="scss">
.wrap {
  max-width: 800px;
}
</style>
