import jwt from "jsonwebtoken";
import { mySQLConnection } from "../connection.js";
const roleTableNames={
    ["prec"]: "preceptores",
    ["prof"]: "profesores",
    ["alum"]: "alumnos"

}
const clave_finals='clave_finals';//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------------------------- preguntar y cambiar dependiendo el cliente
//Procura siempre una clave fuerte
function generateAuthToken(user, role){//Esto siempre se debe cambiar si es que hay un cambio en la cuenta, ya sea eliminacion de la cookie en general o cambio en los parametros del usuario
    const payload = {
        id: user.id,
        use: user.username,
        rol: user.rol,
        idr: role.id,
        table: roleTableNames[user.rol]?roleTableNames[user.rol]:"cuentas",
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
    function generateCookie(userResult, roleData){
        const authToken=generateAuthToken(userResult, roleData);//de roleData sacamos roleData.id nada mas
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
            path: '/',
        });
        // req.body.auth=authToken;
        console.log("Redirecting to account");
        res.status(200).json({msg: "server msg: succesfully registered"});
    }
    const replacements= req.body.username?req.body.username:req.body.userOEmail;
    mySQLConnection('SELECT * FROM cuentas WHERE username = ? OR email = ?', [replacements, replacements]).then(data=>{
        const userResult = data[0];
        const tableRepl= roleTableNames[userResult.rol]?roleTableNames[userResult.rol]: 'cuentas';
        if(!roleTableNames[userResult.rol]){
            generateCookie(userResult, {id: userResult.id})
            return
        }
       
        const queryRepl= roleTableNames[userResult.rol]? `SELECT * FROM ${tableRepl} WHERE cuenta_id=?` : `SELECT * FROM ${tableRepl} WHERE id=?`;
        
        mySQLConnection(queryRepl, [userResult.id]).then(roleData=>{
            generateCookie(userResult, roleData[0])
            return
        })
        
    })
}

export function readAuthCookies(req, res){
    if (!req.cookies.authToken){
        res.status(404).json({data: "Token no encontrado"})
        return
    };
    const authToken = req.cookies.authToken;
    jwt.verify(authToken, clave_finals, (err, decd)=>{
        if(err){
            console.log("Token invalido: ", err.message);
            return res.status(403).json({
                status: 'error',
                message: err.message,
            }) 
        }
        return res.status(200).json({data: decd});
    })

}
export function getAuthCookies(req){
    if (!req.cookies.authToken){
        return {r: false, status: 404,msg: "Token no encontrado"};
    };
    const authToken = req.cookies.authToken;
    return new Promise((resolve) => {
        jwt.verify(authToken, clave_finals, (err, decd) => {
            if (err) {
                console.log("Token inválido: ", err.message);
                return resolve({ r: false, status: 403, msg: err.message });
            }
            resolve({ r: true, status: 200, decd });
        });
    });
}

export function clearAuthCookie(req, res){
    console.log("Clearing token")
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        //maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
        path: '/',
    });
    res.status(200).json({msg: "Server Response: fully cleared token"});
}