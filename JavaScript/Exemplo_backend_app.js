import express from 'express'
import { Router } from 'express'
import authentication from './auth/authentication.js'
import setupMiddleware from './middleware.js'
import routes_login from './routes/routes_login.js'
import routes_usuarios from './routes/routes_usuarios.js'
import routes from './routes/routes.js'

const app = express()
const port = process.env.porta_srv
const router = Router()

setupMiddleware(app)

routes_login(app, router)
router.use(authentication)
routes_usuarios(app, router)
routes(app, router)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})