const Koa = require('./koa')
const Router = require('./router')
const static = require('./static')
const iptable = require('./iptable')

const PORT = 3000

const router = new Router()

router.get('/', async (ctx) => {
  console.log('index')
  ctx.body = 'index page'
})
router.get('/post', async (ctx) => {
  ctx.body = 'post page'
})
router.get('/list', async (ctx) => {
  ctx.body = 'list page'
})

const app = new Koa()

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

app.use(iptable)
app.use(router.routes())
app.use(static(__dirname + '/public'))
