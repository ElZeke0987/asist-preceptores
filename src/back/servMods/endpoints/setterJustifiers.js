import { mySQLConnection } from "../connection.js";
import { getAuthCookies } from "./cookiePoints.js";
import { changeInasCount } from "./presencePoints.js";
/* Las justificaciones, si o si deben quedar en un historial, por las dudas (no se eliminan) */

/* DESDE ROLE SETTER */

export async function rejJustification(req, res){
    console.log("Rejecting asistance: ", req.body)
    await mySQLConnection("UPDATE asist_justify SET accepted=0, rejected=1 WHERE id=?", [req.body.justAsistId])
    res.status(200).json({msg: "Succesfully rejected justification"})
}

export async function verifyJustification(req, res){
    console.log("Justifying asistance: ", req.body)
    const justAsistId=req.body.asistId
    let asist = await mySQLConnection("SELECT * FROM asistencias WHERE id=?", [justAsistId])//Se va a necesitar mas info de la asistencia en changeInasCount
    await changeInasCount(asist[0], undefined, "-")//Al justificarse una falta, se le resta una
    await mySQLConnection("UPDATE asist_justify SET accepted=1, rejected=0 WHERE asist_id=?", [justAsistId])
    await mySQLConnection("UPDATE asistencias SET justificada=1 WHERE id=?", [justAsistId])
    res.status(200).json({msg: "Succesfully accepted justification"})
}

/* DESDE ASISTENCIAS */

export async function setNewJustify(req, res){
    let cookie = await getAuthCookies(req);
    let userRole = cookie.decd.role;
    let accepted=userRole=="adm"||userRole=="prec"?1:0;
    let shouldJustify=0;
    let body = req.body;
    
    
    try{
        
        let newConjunt = await mySQLConnection("INSERT INTO conjunt_asist (id, fecha, mes, dia, should_just, curso_id, alumn_id) VALUES (NULL, ?, ?, ?, ?, ?, ?)", [body.conjuntAsist[0].fecha, body.asistList[0].mes, body.asistList[0].dia, shouldJustify, body.cursoId, body.alumnId])//Por ahora es unicamente usado para las justificaciones, despues no haria falta tener en cuenta esto
        
        body.conjuntAsist.forEach(async moduleToCheck => {
            if(!moduleToCheck.presencia&&moduleToCheck.should_just){
                shouldJustify=1;
                let newJustification = await mySQLConnection("INSERT INTO asist_justify (id,conjunt_id,msg_just,accepted,curso_id,alumn_id, nom_comp, curso, asist_id) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)", [newConjunt, body.justMsg, accepted, body.cursoId, body.alumnId, body.nomComp, body.curso, moduleToCheck.id]);
            }
        });
        shouldJustify=userRole=="adm"||userRole=="prec"?0:1;
        
        
        res.status(200).json({msg: "Se logro exitosamente insertar todo", accepted});
    }catch(err){
        console.log("error prueb: ", err)
        res.status(400).json({msg:"Hubo un error al insertar justificativo", err})
    }
}