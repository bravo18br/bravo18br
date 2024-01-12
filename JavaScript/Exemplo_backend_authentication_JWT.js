import jsonSecret from './secret.js'
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    const token = req.headers.authentication
    if (!token) {
        res.status(401).send('Access token nao informado')
    }
    else {
        const [bearer, accessToken] = token.split(" ")
        try {
            const decoded = jwt.verify(accessToken, jsonSecret)
            const id_user = await jwt.decode(accessToken)
            req.id_usuario = id_user
            console.log("Token válido")
            return next()
        }
        catch (error) {
            console.log("Token inválido")
            res.status(401).send("Usuário não autorizado")
        }
    }

}