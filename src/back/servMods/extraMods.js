import { mySQLConnection } from "./connection.js";

function defaultNext(){

}
function handlePermissionDef(okStatus){

}


export async function verifyPermisions(roleTable, req, res, userInfoCookie, {handlePermission=handlePermissionDef,next=defaultNext}){
    await mySQLConnection("SELECT * FROM cuentas WHERE username=?", [userInfoCookie.use])
        .then(results=>{
            const user = results[0];
            if (roleTable.includes(user.rol)){//Permiso aceptado
                console.log("\n url enviada: ", req.path, `\n`);
                handlePermission(true)//Manejador en true
                next();
                return
            }
            handlePermission!=handlePermissionDef?handlePermission(false):res.status(403).send("acceso no autorizado");//Manejador en false y Permiso rechazado
            
            next()
        })
}