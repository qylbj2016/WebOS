const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koajwt = require('koa-jwt')
const logger = require('koa-logger')

const index = require('./routes/index')
const cors = require('koa2-cors')

// error handler
onerror(app)

// middlewares
app.use(cors({
  origin: "https://localhost:8080",
  credentials: true
}))
app.use(koajwt({ secret: "Cinco2016", passthrough: true }).unless({
  path: [/^\/login/, /^\/forget/, /^\/register/, /^\/visitor/]
}))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/dist'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
