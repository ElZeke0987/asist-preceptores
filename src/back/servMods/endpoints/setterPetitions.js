import { mySQLConnection } from "../connection.js";
import { getAuthCookies } from "./cookiePoints.js";

export function delPetition(petiId){
    mySQLConnection("DELETE FROM role_petitions WHERE id=?", [petiId])
}

export async function setPetition(req, res){
    const cookie = await getAuthCookies(req);
    const decd = cookie.decd;
    const cuentaId = decd.id;
    const username = decd.use;
    const petiBody=req.body;
    /*console.log("petiBody test: ", petiBody)
    console.log("Cuenta id: ", username);*/
    const petRole=petiBody.selRole.val;
    
    if (petRole=="alum"){
        let course = await mySQLConnection("SELECT * FROM cursos WHERE id=?", [petiBody.courseId.id])
        if(!course){ 
            res.status(404).json({msg: "Course doesn't exists", code: 2})
            return
        }
        await mySQLConnection("SELECT * FROM role_petitions WHERE cuenta_id=?", [cuentaId]).then(validatingPetition=>{
            if(validatingPetition[0]){
                res.status(400).json({msg: "Role petition already made", code: 2});
                return
            }
        })
    //                                                             2                    5                 7                     10                          13                             5             10    12    
        await mySQLConnection("INSERT INTO role_petitions (id, cuenta_id, rol, nombre, apellido, dni, msg_pet, curso_id, curso, año, division, username, grupo_tal) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [cuentaId, //1(2)
        petRole, 
        petiBody.nom, 
        petiBody.ape, //4(5)
        petiBody.dni, ///5(6)
        petiBody.msgPet||"", 
        petiBody.courseId.id||petiBody.courseId.val, //7(8)
        petiBody.courseId.curso||petiBody.courseId.txt, 
        course[0].año||null, 
        course[0].division, //10(11)
        username, 
        petiBody.grp.val||""])                          
    }else{
        await mySQLConnection("INSERT INTO role_petitions (id, cuenta_id, rol, nombre, apellido, dni, msg_pet, username) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)", 
        [cuentaId , petRole, petiBody.nom, petiBody.ape, petiBody.dni, null, username]);
    }
}

