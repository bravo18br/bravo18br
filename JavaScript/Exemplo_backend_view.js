function imprime_console(resultado, req, res) {
    try {
        if (req.route.stack[0].method == 'get') {
            if (resultado.sucesso == true) {
                if (resultado.rowCount > 0) {
                    console.table(resultado.rows)
                    console.log(`GET executado com ${resultado.rowCount} resultados.`)
                    res.status(200).json(resultado.rows)
                    return
                }
                else {
                    console.log("----------------------------------")
                    console.log(`ID: ${resultado.id} não existe na base de dados.`)
                    console.log("----------------------------------")
                    res.status(200).send(`ID: ${resultado.id} não existe na base de dados.`)
                    return
                }
            }
            else {
                console.error("----------------------------------")
                console.error("GET não executado")
                console.error(resultado.message)
                console.error("----------------------------------")
                res.status(500).send(`Erro na execução do GET.`)
                return
            }
        }
        if (req.route.stack[0].method == 'post') {
            if (resultado.sucesso == true) {
                console.log("----------------------------------")
                console.log(`POST executado com sucesso.`)
                console.log(`Inserido na tabela: ${resultado.schema}.${resultado.rota}`)
                console.log(`Chaves            : ${resultado.campos}`)
                console.log(`Valores           : ${resultado.valores}`)
                console.log("----------------------------------")
                res.status(200).send(`Informações inseridas com sucesso.`)
                return
            }
            else {
                console.error("----------------------------------")
                console.error("POST não executado")
                console.error(resultado.message)
                console.error(resultado.filepath)
                console.error(resultado.origem)
                console.error("----------------------------------")
                res.status(500).send(`Erro na execução do POST.`)
                return
            }
        }
        if (req.route.stack[0].method == 'put') {

            if (resultado.sucesso == true) {
                console.log("----------------------------------")
                console.log(`PUT/Update executado com sucesso.`)
                console.log(`Tabela        : ${resultado.schema}.${resultado.rota}`)
                console.log(`ID            : ${resultado.chave_id} = ${resultado.id}`)
                console.log(`Chaves/Valores: ${resultado.chave_valor_sql}`)
                console.log("----------------------------------")
                res.status(200).send(`Informações atualizadas com sucesso.`)
                return
            }
            if (resultado.existe == false) {
                console.error("----------------------------------")
                console.error("PUT/Update não executado")
                console.error(`ID ${resultado.id} informado não existe`)
                console.error("----------------------------------")
                res.status(500).send(`ID informado não existe`)
                return
            }
            if (resultado.sucesso == false) {
                console.error(`Erro no TRY do model_metodo`)
                console.error(resultado.message)
                console.error(resultado.filepath)
                console.error(resultado.origem)
                res.status(500).send(`Erro na execução.`)
                return
            }
        }
        if (req.route.stack[0].method == 'delete') {

            if (resultado.sucesso == true) {
                console.log("----------------------------------")
                console.log(`Delete executado com sucesso.`)
                console.log(`Tabela        : ${resultado.schema}.${resultado.rota}`)
                console.log(`ID            : ${resultado.chave_id} = ${resultado.id}`)
                console.log("----------------------------------")
                res.status(200).send(`ID ${resultado.id} deletado com sucesso`)
                return
            }
            if (resultado.existe == false) {
                console.error("----------------------------------")
                console.error("Delete não executado")
                console.error(`ID ${resultado.id} informado não existe`)
                console.error("----------------------------------")
                res.status(500).send(`ID ${resultado.id} informado não existe`)
                return
            }
            if (resultado.sucesso == false) {
                console.error(`Erro no TRY do model_metodo`)
                res.status(500).send(`Erro na execução.`)
                return
            }
        }
    }
    catch (erro) {
        console.error(`Erro no TRY do imprime_console`)
        res.status(500).send(`Erro na execução.`)
        return
    }
}

const view_metodo = {
    imprime_console
}

export default view_metodo