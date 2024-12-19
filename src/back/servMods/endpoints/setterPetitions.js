import { mySQLConnection } from "../connection.js";
import { getAuthCookies } from "./cookiePoints.js";

export function delPetition(petiId){
    mySQLConnection("DELETE FROM role_petitions WHERE id=?", [petiId])
}

export async function setPetition(req, res){
    const cookie = await getAuthCookies(req);
    const cuentaId = cookie.decd.id;
    const username = cookie.decd.use;
    const petiBody=req.body;
    console.log("petiBody test: ", petiBody)
    const petRole=petiBody.selRole.val;
    
    if (petRole=="alum"){
        let course = await mySQLConnection("SELECT * FROM cursos WHERE id=?", [body.courseId.id])
        if(!course){ 
            res.status(404).json({msg: "Course doesn't exists", code: 2})
            return
        }
    
        await mySQLConnection("INSERT INTO role_petitions (id, cuenta_id, role, nombre, apellido, dni, msg_pet, curso_id, curso, año, division, username) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [cuentaId, petRole, petiBody.nom, petiBody.ape, petiBody.dni, petiBody.msgPet, petiBody.courseId.val, petiBody.courseId.txt, course[0].año, course[0].division, username])
        
    }else{
        await mySQLConnection("INSERT INTO role_petitions (id, cuenta_id, role, nombre, apellido, dni, msg_pet, username) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)", 
        [cuentaId , petRole, petiBody.nom, petiBody.ape, petiBody.dni, null, username]);
    }
}

