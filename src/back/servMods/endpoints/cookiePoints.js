import jwt from "jsonwebtoken";
import { mySQLConnection } from "../connection.js";
const roleTableNames={
    ["prec"]: "preceptores",
    ["prof"]: "profesores",
    ["alum"]: "alumnos"

}
const clave_finals='clave_finals';//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------------------------- preguntar y cambiar dependiendo el cliente
//Procura siempre una clave fuerte
function generateAuthToken(user, role){
    const payload = {
        id: user.id,
        use: user.username,
        rol: user.rol,
        idr: role.id,
        table: roleTableNames[user.rol],
        /*nom: role.nombre,
        ape: role.apellido,//Esto para casos especiales, de ser necesario, al usarse dos veces los datos del rol especialmente (mostrar en la cuenta y la muestra de asistencias)
*/
    };
    
    const options = { 
        expiresIn: '365d', //1 año
        //alg: "none",//para pruebas
    }
    return jwt.sign(payload, clave_finals, options);
}

export async function setInitCookies(req, res){
    mySQLConnection('SELECT * FROM cuentas WHERE username = ?', [req.body.username]).then(data=>{
        const userResult = data[0];
        mySQLConnection('SELECT * FROM ? WHERE cuenta_id=?', [roleTableNames[userResult.rol], userResult.id]).then(roleData=>{
            const authToken=generateAuthToken(userResult, roleData[0]);
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