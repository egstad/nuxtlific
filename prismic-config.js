// prismic.config.js

import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

export const prismicConfig = {
  baseUrl: 'https://egstad.cdn.prismic.io/api/v2',
}

export const initApi = req => {
  return Prismic.getApi(prismicConfig.baseUrl, {
    req,
  })
}

export const linkResolver = doc => {
  if (doc.type === 'pieces') {
    return `/pieces/${doc.uid}`
  }
  return `/${doc.uid}`
}

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'home':
      return {
        title: PrismicDOM.RichText.asText(data.title),
      }
    case 'pieces':
      return {
        pieces: data,
      }
    case 'piece':
      return {
        title: data.title,
        image: data.image,
      }
  }
}
