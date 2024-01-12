import controllerAcoes from "./controllerAcoes.js"
import conf from "./controllerConfig.js"
import controllerGetAll from "./controllerGetAll.js"
import controllerPostOne from "./controllerPostOne.js"

async function controllerListenersMenu() {
    conf.nomeMenu_nomeBotao_tabelas.forEach(async i => {
        const [nomeMenu, nomeRota] = i
        const botaoSelector = document.querySelector(`[data-botao_${nomeRota}]`)
        botaoSelector.addEventListener("click", async function (event) {
            event.preventDefault() 
            const resultado = await controllerGetAll(nomeMenu, nomeRota)
            controllerAcoes(resultado, nomeMenu, nomeRota)
            controllerPostOne(nomeMenu, nomeRota)
        })
    })

    conf.nomeMenu_nomeBotao_relatorios.forEach(async i => {
        const [nomeMenu, nomeRota] = i
        const botaoSelector = document.querySelector(`[data-botao_${nomeRota}]`)
        botaoSelector.addEventListener("click", async function (event) {
            event.preventDefault()
            const resultado = await controllerGetAll(nomeMenu, nomeRota)
           
        })
    })
}

export default controllerListenersMenu
