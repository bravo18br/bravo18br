import viewEditar from "../view/viewModalEditar.js"
import viewExcluir from "../view/viewModalExcluir.js"
import viewTabela from "../view/viewTabela.js"
import controllerDelOne from "./controllerDelOne.js"
import controllerGetAll from "./controllerGetAll.js"
import controllerPostOne from "./controllerPostOne.js"
import controllerPutOne from "./controllerPutOne.js"

export default async function controllerAcoes(resultadoFetchJSON, nomeMenu, nomeRota) {

    const botoesExcluir = document.querySelectorAll(`[data-main__section__table__botaoExcluir]`)
    botoesExcluir.forEach(botaoExcluir => {
        botaoExcluir.addEventListener("click", async function (event) {
            event.preventDefault()
            const id_excluir = botaoExcluir.getAttribute("data-main__section__table__botaoExcluir")
            await excluir(id_excluir, nomeMenu, nomeRota)
        })
    })

    const botoesEditar = document.querySelectorAll(`[data-main__section__table__botaoEditar]`)
    botoesEditar.forEach(botaoEditar => {
        botaoEditar.addEventListener("click", async function (event) {
            event.preventDefault()
            const id_editar = botaoEditar.getAttribute("data-main__section__table__botaoEditar")
            await editar(id_editar, nomeMenu, nomeRota)
        })
    })
}

async function excluir(id, nomeMenu, nomeRota) {
    const confirmacao = await viewExcluir(id, nomeRota)
    if (confirmacao) {
        await controllerDelOne(id, nomeRota)
        const resultado = await controllerGetAll(nomeMenu, nomeRota)
        viewTabela(nomeMenu, resultado, nomeRota)
        await controllerAcoes(resultado, nomeMenu, nomeRota)
        controllerPostOne(nomeMenu, nomeRota)
    }
    else {
        const resultado = await controllerGetAll(nomeMenu, nomeRota)
        viewTabela(nomeMenu, resultado, nomeRota)
        await controllerAcoes(resultado, nomeMenu, nomeRota)
        controllerPostOne(nomeMenu, nomeRota)
    }
}

async function editar(id, nomeMenu, nomeRota) {
    const novosDados = await viewEditar(id, nomeRota)
    if (novosDados.confirmacao == true) {
        await controllerPutOne(id, nomeRota, novosDados)
        const resultado = await controllerGetAll(nomeMenu, nomeRota)
        viewTabela(nomeMenu, resultado, nomeRota)
        await controllerAcoes(resultado, nomeMenu, nomeRota)
        controllerPostOne(nomeMenu, nomeRota)
    }
    else {
        const resultado = await controllerGetAll(nomeMenu, nomeRota)
        viewTabela(nomeMenu, resultado, nomeRota)
        await controllerAcoes(resultado, nomeMenu, nomeRota)
        controllerPostOne(nomeMenu, nomeRota)
    }
}