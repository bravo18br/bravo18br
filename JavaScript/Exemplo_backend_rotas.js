// Este módulo contém as definições da rota.
import model_metodo from '../../model/model_metodo.js'
import view_metodo from '../../view/view_metodo.js'
import rotas from './itens_routes.js'

const routes = (app, router) => {
    app.use(router)
    rotas.map(rota => {

        router.get(`/${rota}`, async (req, res) => {
            const resultado = await model_metodo.getAll(rota, req, res)
            view_metodo.imprime_console(resultado, req, res)
        })

        router.get(`/${rota}/first`, async (req, res) => {
            const resultado = await model_metodo.getFirst(rota, req, res)
            view_metodo.imprime_console(resultado, req, res)
        })

        router.get(`/${rota}/:id`, async (req, res) => {
            const id = req.params.id
            const resultado = await model_metodo.getOne(rota, id, req, res)
            view_metodo.imprime_console(resultado, req, res)
        })

        router.post(`/${rota}`, async (req, res) => {
            const resultado = await model_metodo.post(rota, req, res)
            view_metodo.imprime_console(resultado, req, res)
        })

        router.put(`/${rota}/:id`, async (req, res) => {
            const id = req.params.id
            const resultado = await model_metodo.update(rota, id, req, res)
            view_metodo.imprime_console(resultado, req, res)
        })

        router.delete(`/${rota}/:id`, async (req, res) => {
            const id = req.params.id
            const resultado = await model_metodo.excluir(rota, id, req, res)
            view_metodo.imprime_console(resultado, req, res)
        })
    })
}

export default routes