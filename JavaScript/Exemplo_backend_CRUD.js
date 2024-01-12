import postgre from './Exemplo_backend_interface_postgre.js'
import getAll_Custo_Fixo from './model_Custo_Fixo.js'
import getAll_Custo_Variavel from './model_Custo_Variavel.js'

async function getAll(rota, req, res) {
    try {
        if (rota == "Custo_Variavel") {
            const resultado = await getAll_Custo_Variavel()
            return resultado
        }
        if (rota == "Custo_Fixo") {
            const resultado = await getAll_Custo_Fixo()
            return resultado
        }
        else {
            let sql
            if (rota.startsWith("fn_")) { sql = `select * from public.${rota}() order by 1` }
            else { sql = `select * from public.${rota} order by 1` }
            const resultado = await postgre.select(sql)
            return resultado
        }
    }
    catch (erro) {
        erro.sucesso = false
        return erro
    }
}

async function getFirst(rota, req, res) {
    try {
        if (rota == "Custo_Variavel") {
            const resultado = await getAll_Custo_Variavel()
            return resultado
        }
        if (rota == "Custo_Fixo") {
            const resultado = await getAll_Custo_Fixo()
            return resultado
        }
        let sql
        if (rota.startsWith("fn_")) { sql = `select * from public.${rota}() limit 1` }
        else { sql = `select * from public.${rota} limit 1` }
        const resultado = await postgre.select(sql)
        return resultado
    }
    catch (erro) {
        erro.sucesso = false
        return erro
    }
}

async function getOne(rota, id, req, res) {
    try {
        let resultado = {}
        resultado.sucesso = false
        resultado.existe = false
        resultado.id = id
        if (rota == "Custo_Variavel") {
            if (id === '1') {
                resultado = await getAll_Custo_Variavel()
                if (resultado.rows === 1) { resultado.existe = true }
                return resultado
            }
            resultado.sucesso = true
            return resultado
        }
        if (rota == "Custo_Fixo") {
            if (id === '1') {
                resultado = await getAll_Custo_Fixo()
                if (resultado.rows === 1) { resultado.existe = true }
                return resultado
            }
            resultado.sucesso = true
            return resultado
        }
        let sql
        if (rota.startsWith("fn_")) { sql = `select * from public.${rota}() where id_${rota}=${id};` }
        else { sql = `select * from public.${rota} where id_${rota}=${id};` }
        resultado = await postgre.select(sql)
        if (resultado.sucesso) {
            if (resultado.rows > 0) {
                resultado.existe = true
                return resultado
            }
        }
        return resultado
    } catch (erro) {
        erro.sucesso = false
        return erro
    }
}

async function post(rota, req, res) {
    try {
        const body = req.body
        let campos_sql = ""
        let valores_sql = ""
        for (const key in body) {
            if (key != `id_${rota}`) {
                campos_sql = `${campos_sql}, ${key}`
                valores_sql = `${valores_sql}, '${body[key]}'`
            }
        }
        campos_sql = campos_sql.slice(2)
        valores_sql = valores_sql.slice(2)
        const sql = `INSERT INTO public.${rota} (${campos_sql}) VALUES (${valores_sql}) RETURNING id_${rota} AS id_inserido;`
        const resultado = await postgre.insert(sql)
        resultado.schema = `public`
        resultado.rota = `${rota}`
        resultado.campos = `${campos_sql}`
        resultado.valores = `${valores_sql}`
        return resultado
    }
    catch (erro) {
        erro.sucesso = false
        return erro
    }
}

async function update(rota, id, req, res) {
    try {
        const sql_consulta = `select * from public.${rota} where id_${rota} = ${id};`
        const consulta = await postgre.select(sql_consulta)
        if (consulta.existe == true) {
            const body = req.body
            let chave_valor_sql = ""
            for (const key in body) {
                if (key != `id_${rota}`) {
                    chave_valor_sql = `${chave_valor_sql}, ${key} = '${body[key]}'`
                }
            }
            chave_valor_sql = chave_valor_sql.slice(2)
            const sql_update = `UPDATE public.${rota} SET ${chave_valor_sql} WHERE id_${rota}=${id};`
            const resultado = await postgre.update(sql_update)
            resultado.schema = `public`
            resultado.rota = rota
            resultado.id = id
            resultado.chave_id = `id_${rota}`
            resultado.chave_valor_sql = chave_valor_sql
            return resultado
        }
        else {
            const resultado = {}
            resultado.existe = false
            resultado.id = id
            return resultado
        }
    }
    catch (erro) {
        erro.sucesso = false
        return erro
    }
}

async function excluir(rota, id, req, res) {
    try {
        const sql_consulta = `select * from public.${rota} where id_${rota} = ${id};`
        const consulta = await postgre.select(sql_consulta)
        if (consulta.existe == true) {
            const sql = `DELETE FROM public.${rota} WHERE id_${rota}=${id};`
            const resultado = await postgre.excluir(sql)
            resultado.schema = `public`
            resultado.rota = rota
            resultado.id = id
            resultado.chave_id = `id_${rota}`
            return resultado
        }
        else {
            const resultado = {}
            resultado.existe = false
            resultado.schema = `public`
            resultado.rota = rota
            resultado.id = id
            resultado.chave_id = `id_${rota}`
            return resultado
        }
    }
    catch (erro) {
        erro.sucesso = false
        return erro
    }
}

const model_metodo = {
    getAll,
    getOne,
    getFirst,
    post,
    update,
    excluir
}

export default model_metodo






