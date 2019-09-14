import prismicDOM from 'prismic-dom'
import linkResolver from './link-resolver'

const Elements = prismicDOM.RichText.Elements

export default (type, element, content, children) => {
  // Generate links to Prismic Documents as <router-link> components
  // Present by default, it is recommended to keep this
  if (type === Elements.hyperlink) {
    let result = ''
    const url = prismicDOM.Link.url(element.data, linkResolver)

    if (element.data.link_type === 'Document') {
      result = `<NuxtLink to="${url}">${content}</NuxtLink>`
    } else {
      const target = element.data.target
        ? `target="'${element.data.target}'" rel="noopener"`
        : ''
      result = `<a href="${url}" ${target}>${content}</a>`
    }
    return result
  }

  // If the image is also a link to a Prismic Document, it will return a <router-link> component
  // Present by default, it is recommended to keep this
  if (type === Elements.image) {
    let result = `<img src="${element.url}" alt="${element.alt ||
      ''}" copyright="${element.copyright || ''}">`

    if (element.linkTo) {
      const url = prismicDOM.Link.url(element.linkTo, linkResolver)

      if (element.linkTo.link_type === 'Document') {
        result = `<NuxtLink to="${url}">${result}</NuxtLink>`
      } else {
        const target = element.linkTo.target
          ? `target="${element.linkTo.target}" rel="noopener"`
          : ''
        result = `<a href="${url}" ${target}>${result}</a>`
      }
    }
    const wrapperClassList = [element.label || '', 'block-img']
    result = `<p class="${wrapperClassList.join(' ')}">${result}</p>`
    return result
  }

  /**
   * Text Elements
   */
  if (type === Elements.heading1) {
    return `<h1 class="h1 text--5">${children.join('')}</h1>`
  } else if (type === Elements.heading2) {
    return `<h2 class="h2 text--4">${children.join('')}</h2>`
  } else if (type === Elements.heading3) {
    return `<h3 class="h3 text--3">${children.join('')}</h3>`
  } else if (type === Elements.heading4) {
    return `<h4 class="h4 text--2">${children.join('')}</h4>`
  } else if (type === Elements.heading5) {
    return `<h5 class="h5 text--1">${children.join('')}</h5>`
  } else if (type === Elements.heading6) {
    return `<h6 class="h6 text--0">${children.join('')}</h6>`
  } else if (type === Elements.paragraph) {
    return `<p class="p text--1">${children.join('')}</p>`
  } else if (type === Elements.list) {
    return `<ul class="ul">${children.join('')}</ul>`
  } else if (type === Elements.listItem) {
    return `<li class="ul_li text--1">${children.join('')}</li>`
  } else if (type === Elements.oList) {
    return `<ol class="ol">${children.join('')}</ol>`
  } else if (type === Elements.oListItem) {
    return `<li class="ol_li text--1">${children.join('')}</li>`
  }

  // Return null to stick with the default behavior for everything else
  return null
}
