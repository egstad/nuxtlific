import Prismic from 'prismic-javascript'

export const prismicConfig = {
  baseUrl: 'https://nuxtlific.cdn.prismic.io/api/v2',
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
      const pieces = []

      // get post data for each piece
      data.body[0].items.forEach(piece => {
        initApi().then(api => {
          return api
            .query(
              Prismic.Predicates.at('my.pieces_single.uid', piece.piece.uid)
            )
            .then(response => {
              const items = {
                uid: response.results[0].uid,
                data: response.results[0].data,
              }
              pieces.push(items)
            })
        })
      })

      return {
        pageContent: data,
        title: data.title,
        pieces,
      }
    case 'pieces_single':
      return {
        pageContent: data,
        title: data.title,
      }
  }
}
