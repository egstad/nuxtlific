import Prismic from 'prismic-javascript'

export const prismicConfig = {
  baseUrl: 'https://egstad.cdn.prismic.io/api/v2',
}

export const initApi = req => {
  return Prismic.getApi(prismicConfig.baseUrl, {
    req,
  })
}

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
        pieces: data,
      }
    case 'piece':
      return {
        pageContent: data,
        title: data.title,
        image: data.image,
      }
  }
}
