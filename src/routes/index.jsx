const routeNames = {
  'home': '/',
  'tests.index': '/tests',
  'tests.create': '/tests/create',
  'tests.edit': '/tests/:id/edit',
}

function route(name, params = {}) {
  let url = routeNames[name]

  for (let prop in params) {
    if (Object.prototype.hasOwnProperty.call(params, prop)) {
      url = url.replace(`:${prop}`, params[prop])
    }
  }

  return url
}

export { route }
