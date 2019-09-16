export default function(doc) {
  // catch for full router data
  if (typeof doc.route !== 'undefined') {
    if (typeof doc.route.path !== 'undefined') {
      return
    }
  }

  if (doc.isBroken) {
    return '/not-found'
  }

  // catch for all `{some page name}_page` types
  if (String(doc.type).includes('page')) {
    return '/' + doc.uid
  }

  // trap for doc types
  switch (doc.type) {
    case 'home':
      return '/'
    case 'pieces': // all pieces
      return '/pieces/' + doc.uid
    default:
      return '/not-found'
  }
}
