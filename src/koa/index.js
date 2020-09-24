const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class Koa {
  middlewares = []
  listen(...args) {
    http
      .createServer(async (req, res) => {
        const ctx = this.createContext(req, res)
        const fn = this.compose(this.middlewares)
        await fn(ctx)
        res.end(ctx.body)
      })
      .listen(...args)
  }
  use(middleware) {
    this.middlewares.push(middleware)
  }
  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.request.res = res
    return ctx
  }
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0)
      function dispatch(i) {
        const fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1)
          })
        )
      }
    }
  }
}

module.exports = Koa
