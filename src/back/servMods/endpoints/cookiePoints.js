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
    console.log("Starting to search user or email")
    function generateCookie(userResult, roleData){
        const authToken=generateAuthToken(userResult, roleData);//de roleData sacamos roleData.id nada mas
        console.log("Generating cookie: ", userResult, " - ", roleData);
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
            path: '/',
        });
        // req.body.auth=authToken;
        res.redirect("/account")
    }
    
    mySQLConnection('SELECT * FROM cuentas WHERE username = ? OR email = ?', [req.body.username||req.body.userOemail, req.body.username||req.body.userOemail]).then(data=>{
        const userResult = data[0];
        const tableRepl= roleTableNames[userResult.rol]?roleTableNames[userResult.rol]: 'cuentas';
        if(!roleTableNames[userResult.rol]){
            generateCookie(userResult, {id: userResult.id})
            return
        }
       
        const queryRepl= roleTableNames[userResult.rol]? `SELECT * FROM ${tableRepl} WHERE cuenta_id=?` : `SELECT * FROM ${tableRepl} WHERE id=?`;
        
        mySQLConnection(queryRepl, [userResult.id]).then(roleData=>{
            generateCookie(userResult, roleData[0])
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
export function getAuthCookies(req){
    if (!req.cookies.authToken){
        return {r: false, msg: "Token no encontrado"};
    };
    const authToken = req.cookies.authToken;
    return new Promise((resolve) => {
        jwt.verify(authToken, clave_finals, (err, decd) => {
            if (err) {
                console.log("Token inválido: ", err.message);
                return resolve({ r: false, msg: err.message });
            }
            resolve({ r: true, decd });
        });
    });
}

export function clearAuthCookie(req, res){

    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        //maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
        path: '/',
    });
    res.redirect("/");
}