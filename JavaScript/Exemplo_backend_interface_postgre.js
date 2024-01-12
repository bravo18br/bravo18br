import pkg from 'pg'
const { Client } = pkg
const filePath = new URL(import.meta.url).pathname

const usuario_PG = process.env.usuario_PG
const senha_PG = process.env.senha_PG
const endereco_servidor_PG = process.env.endereco_servidor_PG
const porta_PG = process.env.porta_PG
const nome_banco_PG = process.env.nome_banco_PG
const connectionString = `postgres://${usuario_PG}:${senha_PG}@${endereco_servidor_PG}:${porta_PG}/${nome_banco_PG}`

async function select(sql) {
    let resultado = {}
    resultado.existe = false
    resultado.sucesso = false
    try {
        const client = new Client({ connectionString: connectionString })
        await client.connect()
        try {
            resultado = await client.query(sql)
        } catch (erro) {
            await client.end()
            resultado.erro = erro.code
            resultado.sucesso = true
            return resultado
        }
        await client.end()
        if (resultado.rowCount > 0) {
            resultado.existe = true
            resultado.sucesso = true
            return resultado
        }
        if (resultado.rowCount === 0) {
            resultado.existe = false
            resultado.sucesso = true
            return resultado
        }
    }
    catch (error) {
        console.log(error)
        return resultado
    }
}

async function insert(sql) {
    let resultado = {}
    try {
        const client = new Client({ connectionString: connectionString })
        await client.connect()
        try {
            resultado = await client.query(sql)
        } catch (error) {
            await client.end()
            resultado.erro = error.code
            return resultado
        }
        await client.end()
        resultado.sucesso = true
        resultado.id_inserido = resultado.rows[0].id_inserido
        return resultado
    }
    catch (error) {
        error.sucesso = false
        error.filepath = filePath
        error.origem = 'async function postgre.insert(sql)'
        resultado.erro = error.code
        return error
    }
}

async function update(sql) {
    try {
        const client = new Client({ connectionString: connectionString })
        await client.connect()
        let resultado = {}
        try {
            resultado = await client.query(sql)
        } catch (error) {
            await client.end()
            resultado.erro = error.code
            return resultado
        }
        await client.end()
        resultado.sucesso = true
        return resultado
    }
    catch (error) {
        error.sucesso = false
        error.filepath = filePath
        error.origem = 'async function postgre.update(sql)'
        return error
    }
}

async function excluir(sql) {
    try {
        const client = new Client({ connectionString: connectionString })
        await client.connect()
        await client.query(sql)
        await client.end()
        const res = {}
        res.sucesso = true
        return res
    }
    catch (error) {
        error.sucesso = false
        return error
    }
}

const postgre = {
    select,
    insert,
    update,
    excluir
}

export default postgre