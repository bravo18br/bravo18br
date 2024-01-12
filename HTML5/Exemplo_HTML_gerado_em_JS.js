import conf from "../controller/controllerConfig.js"

export default function viewHome() {
    const header = document.querySelector("[data-body__header]")
    header.innerHTML = ""

    const divNome = document.createElement('div')
    divNome.className = "header__div__cabecalho"
    divNome.setAttribute("data-header__div__cabecalho", "")
    header.appendChild(divNome)

    const aTitulo = document.createElement('a')
    aTitulo.className = "header__div__cabecalho__titulo"
    aTitulo.setAttribute("data-header__div__cabecalho__titulo", "")
    aTitulo.textContent = "Projeto TRIAR"
    divNome.appendChild(aTitulo)

    viewTabelasGerais()
    viewRelatorio()
    
}

function viewTabelasGerais() {

    const div = document.createElement('div')
    div.className = "viewMenu__div"
    div.setAttribute("data-viewMenu__div", "")

    const navElement = document.createElement("nav")
    navElement.className = "viewMenu__div__nav"
    navElement.setAttribute("data-viewMenu__div__nav", "")

    const ulElement = document.createElement("ul")
    ulElement.className = "viewMenu__div__nav__ul"
    ulElement.setAttribute("data-viewMenu__div__nav__ul", "")

    const liElement = document.createElement("li")
    liElement.className = "viewMenu__div__nav__ul__li"
    liElement.setAttribute("data-viewMenu__div__nav__ul__li", "")

    const aElement = document.createElement("a")
    aElement.className = "viewMenu__div__nav__titulo"
    aElement.setAttribute(`data-viewMenu__div__nav__titulo`, "")
    aElement.textContent = `Tabelas Postgre`

    liElement.appendChild(aElement)
    ulElement.appendChild(liElement)
    navElement.appendChild(ulElement)
    div.appendChild(navElement)

    const section = document.querySelector("[data-body__main]")
    section.innerHTML = ""
    section.appendChild(div)

    conf.nomeMenu_nomeBotao_tabelas.forEach(i => {
        const [nomeMenu, dataAtribute] = i

        const ulElement = document.createElement("ul")
        ulElement.className = "viewMenu__div__nav__ul"
        ulElement.setAttribute("data-viewMenu__div__nav__ul", "")

        const liElement = document.createElement("li")
        liElement.className = "viewMenu__div__nav__ul__li"
        liElement.setAttribute("data-viewMenu__div__nav__ul__li", "")

        const aElement = document.createElement("a")
        aElement.className = "viewMenu__div__nav__item"
        aElement.setAttribute(`data-botao_${dataAtribute}`, "")
        aElement.textContent = `${nomeMenu}`

        liElement.appendChild(aElement)
        ulElement.appendChild(liElement)
        navElement.appendChild(ulElement)
    })
}

function viewRelatorio() {
    
    const div = document.createElement('div')
    div.className = "viewRelatorio__div"
    div.setAttribute("data-viewRelatorio__div", "")

    const navElement = document.createElement("nav")
    navElement.className = "viewRelatorio__div__nav"
    navElement.setAttribute("data-viewRelatorio__div__nav", "")

    const ulElement = document.createElement("ul")
    ulElement.className = "viewRelatorio__div__nav__ul"
    ulElement.setAttribute("data-viewRelatorio__div__nav__ul", "")

    const liElement = document.createElement("li")
    liElement.className = "viewRelatorio__div__nav__ul__li"
    liElement.setAttribute("data-viewRelatorio__div__nav__ul__li", "")

    const aElement = document.createElement("a")
    aElement.className = "viewRelatorio__div__nav__titulo"
    aElement.setAttribute(`data-viewRelatorio__div__nav__titulo`, "")
    aElement.textContent = `Relatórios Especiais`

    liElement.appendChild(aElement)
    ulElement.appendChild(liElement)
    navElement.appendChild(ulElement)
    div.appendChild(navElement)

    const section = document.querySelector("[data-body__main]")
    section.appendChild(div)

    conf.nomeMenu_nomeBotao_relatorios.forEach(i => {
        const [nomeMenu, dataAtribute] = i

        const ulElement = document.createElement("ul")
        ulElement.className = "viewRelatorio__div__nav__ul"
        ulElement.setAttribute("data-viewRelatorio__div__nav__ul", "")

        const liElement = document.createElement("li")
        liElement.className = "viewRelatorio__div__nav__ul__li"
        liElement.setAttribute("data-viewRelatorio__div__nav__ul__li", "")

        const aElement = document.createElement("a")
        aElement.className = "viewRelatorio__div__nav__item"
        aElement.setAttribute(`data-botao_${dataAtribute}`, "")
        aElement.textContent = `${nomeMenu}`

        liElement.appendChild(aElement)
        ulElement.appendChild(liElement)
        navElement.appendChild(ulElement)
    })
}