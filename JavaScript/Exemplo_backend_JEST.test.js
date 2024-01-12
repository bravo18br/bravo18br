import model_metodo from "../model/model_metodo"
import rotas from "../controller/routes/itens_routes"

describe('Testes das rotas', () => {
  test.each(rotas)('Rota %s', async (rota) => {
    const recebido = await model_metodo.getAll(rota, '', '')
    expect(recebido).toHaveProperty('existe', true)
  })

  test('Rota INEXISTENTE', async () => {
    const recebido = await model_metodo.getAll('rota_inexistente', '', '')
    expect(recebido).toHaveProperty('erro', '42P01')
  })

})