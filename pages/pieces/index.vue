<template>
  <section class="container">
    <h2
      v-for="(piece, index) in pageContent"
      :key="`${piece.title}-${index}`"
      class="animate js-animate"
    >
      <nuxt-link :to="piece.uid" class="text--5" append>
        {{ piece.title }}
      </nuxt-link>
    </h2>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { routeTransitionFade } from '@/mixins/route-transitions'
import { initGql } from '@/prismic-config'

export default {
  mixins: [routeTransitionFade],
  async asyncData(context) {
    const data = []
    await initGql
      .query({
        query: gql`
          query {
            allPieces_singles(sortBy: meta_firstPublicationDate_ASC) {
              edges {
                node {
                  _meta {
                    uid
                  }
                  title
                }
              }
              totalCount
            }
          }
        `,
      })
      .then(response => {
        // const total = response.data.allPieces_singles.totalCount
        const pageContent = response.data.allPieces_singles.edges

        pageContent.forEach(item => {
          const result = {
            title: item.node.title,
            uid: item.node._meta.uid,
          }
          data.push(result)
          // data = result
        })
        // // const total = response.data.allPieces_singles.totalCount
        // const pageContent = response.data.allPieces_singles.edges

        // // format info
        // return pageContent
      })
      .catch(error => {
        console.error(error)
      })

    return {
      pageContent: data,
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
