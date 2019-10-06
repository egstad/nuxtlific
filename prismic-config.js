import { PrismicLink } from 'apollo-link-prismic'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

export const prismicConfig = {
  baseUrl: 'https://nuxtlific.cdn.prismic.io/api/v2',
}

export const initApi = new ApolloClient({
  link: PrismicLink({
    uri: 'https://nuxtlific.prismic.io/graphql',
  }),
  cache: new InMemoryCache(),
})
