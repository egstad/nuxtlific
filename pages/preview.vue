<template>
  <p>Loading the Prismic Preview...</p>
</template>

<script>
import Prismic from 'prismic-javascript'
import { linkResolver, prismicConfig } from '~/prismic-config.js'

export default {
  name: 'Preview',
  async asyncData({ query, redirect }) {
    const previewToken = query.token
    const api = await Prismic.getApi(prismicConfig.baseUrl)
    const url = await api.previewSession(previewToken, linkResolver, '/')
    redirect(url)
  },
}
</script>
