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

      // get some post data for each piece
      // this is because the 'pieces' content type has a content relationship
      // prismic slice that doesn't provide a "title"... i know... stupid
      // 1. for each item, query prismic
      data.body[0].items.forEach(piece => {
        initApi().then(api => {
          return api
            .query(
              // 1a. Using this query
              Prismic.Predicates.at('my.pieces_single.uid', piece.piece.uid)
            )
            .then(response => {
              // 2. model data
              const items = {
                uid: response.results[0].uid,
                data: response.results[0].data,
              }
              // 3. Add it to an array
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
