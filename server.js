const Koa = require('koa')
const next = require('next')
const Router = require('@koa/router')

const port = parseInt(process.env.PORT, 10) || 1500
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()


	//REDIRECIONA ROTA INDEX/BASE PARA O CARRINHO
	router.get('/', async (ctx) => {
		ctx.status = 301;
		ctx.redirect('/carrinho');
		return;
	})


	router.get('/carrinho', async (ctx) => {
		console.log('carrinho')
	await app.render(ctx.req, ctx.res, '/checkout/cart', ctx.query)
	ctx.respond = false
	})

	router.get('/carrinho/pagamento', async (ctx) => {
	await app.render(ctx.req, ctx.res, '/checkout/payment', ctx.query)
	ctx.respond = false
	})
	router.get('/carrinho/sucesso', async (ctx) => {
		await app.render(ctx.req, ctx.res, '/checkout/success', ctx.query)
		ctx.respond = false
	})

	router.all('(.*)', async (ctx) => {
	await handle(ctx.req, ctx.res)
	ctx.respond = false
	})

	server.use(async (ctx, next) => {
	ctx.res.statusCode = 200
	await next()
	})

	server.use(router.routes())
	server.listen(port, () => {
	console.log(`> Ready on http://localhost:${port}`)
	})
})
