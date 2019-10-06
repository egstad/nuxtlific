import Prismic from 'prismic-javascript'
import { PrismicLink } from 'apollo-link-prismic'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

export const prismicConfig = {
  baseUrl: 'https://nuxtlific.cdn.prismic.io/api/v2',
}

export const initApi = req => {
  return Prismic.getApi(prismicConfig.baseUrl, {
    req,
  })
}

export const initGql = new ApolloClient({
  link: PrismicLink({
    uri: 'https://nuxtlific.prismic.io/graphql',
  }),
  cache: new InMemoryCache(),
})

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'home':
      return {
        pageContent: data,
        title: data.title,
        slices: data.body,
      }
    case 'pieces':
      return {
        pageContent: data,
        title: data.title,
      }
    case 'pieces_single':
      return {
        pageContent: data,
        title: data.title,
      }
  }
}
