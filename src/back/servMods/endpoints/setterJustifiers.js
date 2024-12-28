import { mySQLConnection } from "../connection.js";
import { getAuthCookies } from "./cookiePoints.js";



export async function setNewJustify(req, res){
    let cookie = await getAuthCookies(req);
    let userRole = cookie.decd.role;
    let accepted=userRole=="adm"||userRole=="prec"?1:0;
    let shouldJustify=0;
    let body = req.body;
    body.asistList.forEach(moduleToCheck => {
        if(moduleToCheck.presencia==false){
            shouldJustify=1;
        }
    });
    shouldJustify=userRole=="adm"||userRole=="prec"?0:1;
    
    try{
        let newConjunt = await mySQLConnection("INSERT INTO conjunt_asist (id, fecha, mes, dia, should_just, curso_id, alumn_id) VALUES (NULL, ?, ?, ?, ?, ?, ?)", [body.asistList[0].fecha, body.asistList[0].mes, body.asistList[0].dia, shouldJustify, body.cursoId, body.alumnId])//Por ahora es unicamente usado para las justificaciones, despues no haria falta tener en cuenta esto
        let newJustification = await mySQLConnection("INSERT INTO asist_justify (id,conjunt_id,msg_just,accepted,curso_id,alumn_id) VALUES (NULL, ?, ?, ?, ?, ?)", [newConjunt, body.justMsg, accepted, body.cursoId, body.alumnId]);
        res.status(200).json({msg: "Se logro exitosamente insertar todo", accepted});
    }catch(err){
        console.log("error prueb: ", err)
        res.status(400).json({msg:"Hubo un error al insertar justificativo", err})
    }
}