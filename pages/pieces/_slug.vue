<template>
  <div class="container">
    <h1 class="text--5">{{ pageContent.title }}</h1>

    <!-- <figure v-if="image.url">
      <pic :image="image" />
    </figure>-->
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { routeTransitionFade } from '@/mixins/route-transitions'
import { initApi } from '@/prismic-config'

export default {
  mixins: [routeTransitionFade],
  async asyncData({ params, error }) {
    let data = null
    await initApi
      .query({
        query: gql`
          query {
            allPieces_singles(uid: "${params.slug}") {
              edges {
                node {
                  title
                }
              }
            }
          }
        `,
      })
      .then(response => {
        const pageContent = response.data.allPieces_singles.edges

        pageContent.forEach(item => {
          const result = {
            title: item.node.title,
          }
          data = result
        })
      })

    if (data) {
      return {
        pageContent: data,
      }
    } else {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  mounted() {
    this.$app.$emit('page::mounted')
  },
  head() {
    return this.$setPageMetadata(this.pageContent)
  },
}
</script>
