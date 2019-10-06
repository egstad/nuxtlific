<!-- pages/index.vue -->

<template>
  <section class="container">
    <header class="spacing-bottom-4">
      <Logo />
    </header>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import Logo from '@/components/Logo'
import { routeTransitionFade } from '@/mixins/route-transitions'
import { initGql } from '@/prismic-config'

export default {
  components: {
    Logo,
  },
  mixins: [routeTransitionFade],
  async asyncData(context) {
    const pageContent = await initGql
      .query({
        query: gql`
          query {
            allHomes {
              edges {
                node {
                  title
                  _linkType
                }
              }
            }
          }
        `,
      })
      .then(response => {
        // const total = response.data.allPieces_singles.totalCount
        const pageContent = response.data.allHomes.edges

        // format info
        return pageContent
      })
      .catch(error => {
        console.error(error)
      })

    return { pageContent }
  },
  created() {
    let data = ''
    this.pageContent.forEach(item => {
      const result = {
        title: item.node.title,
      }
      data = result
    })

    this.pageContent = data
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
