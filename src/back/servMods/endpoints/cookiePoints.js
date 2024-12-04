import jwt from "jsonwebtoken";
import { mySQLConnection } from "../connection.js";

const clave_finals='clave_finals';//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------------------------- preguntar y cambiar dependiendo el cliente
//Procura siempre una clave fuerte
function generateAuthToken(user){
    const payload = {
        id: user.id,
        use: user.username,
        rol: user.rol,
    };
    
    const options = { 
        expiresIn: '365d', //1 año
        //alg: "none",//para pruebas
    }
    return jwt.sign(payload, clave_finals, options);
}

export async function setInitCookies(req, res){
    mySQLConnection('SELECT * FROM cuentas WHERE username = ?', [req.body.username]).then(data=>{
        const authToken=generateAuthToken(data[0]);
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
            path: '/',
        });
        // req.body.auth=authToken;
        res.status(200).json({errors: undefined, userBody: req.body });
    })
}

export function readAuthCookies(req, res){
    if (!req.cookies.authToken){
        res.status(401).json({data: "Token no encontrado"})
        return
    };
    const authToken = req.cookies.authToken;
    jwt.verify(authToken, clave_finals, (err, decd)=>{
        if(err){
            console.log("Token invalido: ", err.message);
            return res.status(401).json({
                status: 'error',
                message: err.message,
            }) 
        }
        return res.status(200).json({data: decd});
    })

}