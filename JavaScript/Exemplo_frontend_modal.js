import controllerGetOne from "../controller/controllerGetOne.js"

export default async function viewEditar(id, dataAtribute) {
    return new Promise(async (resolve, reject) => {
        const resultado = await controllerGetOne(id, dataAtribute)
        const mainElement = document.querySelector('[data-body__main]')
        mainElement.innerHTML = ""

        const modalDiv = document.createElement('div')
        modalDiv.id = 'modalEditar'
        modalDiv.classList.add('modal')
        modalDiv.dataset.modalEditar = ''

        const conteudoDiv = document.createElement('div')
        conteudoDiv.classList.add('modal-conteudo')
        conteudoDiv.dataset.modalEditarConteudo = ''

        const modal_botaoCancelar = document.createElement('span')
        modal_botaoCancelar.classList.add('modal_botaoCancelar')
        modal_botaoCancelar.dataset.modalEditarFechar = ''
        modal_botaoCancelar.textContent = 'Cancelar'

        const modal_botaoConfirmar = document.createElement('span')
        modal_botaoConfirmar.classList.add('modal_botaoConfirmar')
        modal_botaoConfirmar.dataset.modalEditarFechar = ''
        modal_botaoConfirmar.textContent = 'Confirmar'

        const titulo = document.createElement('p')
        titulo.setAttribute("data-modalEditarTitulo", "")
        titulo.className = "modalEditarTitulo"
        titulo.textContent = 'Continuar com a edição do registro abaixo?'

        const table = document.createElement('table')
        table.setAttribute("data-modalEditarTabela", "")
        table.className = "modalEditarTabela"

        const cabecalho = document.createElement('tr')
        cabecalho.className = "modalEditarTabelaTRCabecalho"

        for (const chave in resultado[0]) {
            const colunaCabecalho = document.createElement('th')
            colunaCabecalho.className = "modalEditarTabelaTHCabecalho"
            colunaCabecalho.textContent = chave
            cabecalho.appendChild(colunaCabecalho)
        }
        table.appendChild(cabecalho)

        const linha = document.createElement('tr')
        linha.className = "modalEditarTabelaTRLinha"

        for (const chave in resultado[0]) {
            const coluna = document.createElement('td')
            coluna.className = "modalEditarTabelaTDLinha"


            const valor = resultado[0][chave]
            coluna.setAttribute('data-chave', chave)
            if (chave.startsWith("id_")) {
                coluna.textContent = valor
            }
            else {
                const input = document.createElement('input')
                input.type = 'text'
                input.value = valor
                coluna.appendChild(input)
            }
            linha.appendChild(coluna)
        }

        table.appendChild(linha)
        conteudoDiv.appendChild(modal_botaoCancelar)
        conteudoDiv.appendChild(modal_botaoConfirmar)
        conteudoDiv.appendChild(titulo)
        conteudoDiv.appendChild(table)
        modalDiv.appendChild(conteudoDiv)
        mainElement.appendChild(modalDiv)

        const modal = document.getElementById('modalEditar')
        const botaoFechar = document.getElementsByClassName('modal_botaoCancelar')[0]
        const botaoConfirmar = document.getElementsByClassName('modal_botaoConfirmar')[0]

        function abrirModal() {
            modal.style.display = 'block'
        }

        botaoFechar.addEventListener('click', function () {
            modal.style.display = 'none'
            resultado.confirmacao = false
            resolve(resultado)
        })

        botaoConfirmar.addEventListener('click', function (event) {
            event.preventDefault()
            const inputs = document.querySelectorAll('.modalEditarTabelaTDLinha input')
            inputs.forEach(input => {
                const chave = input.parentElement.getAttribute('data-chave')
                const valor = input.value
                resultado[0][chave] = valor
            })

            modal.style.display = 'none'
            resultado.confirmacao = true
            resolve(resultado)
        })

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none'
                resultado.confirmacao = false
                resolve(resultado)
            }
        })

        abrirModal()
    })
}