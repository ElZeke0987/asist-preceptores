
import { mySQLConnection } from "../connection.js";

async function insertAsis(asistBody, regId){
    asistBody.asistArr.forEach(async asist=>{
        asist.justificada = asistBody.justificada ? true : asist.justificada;
        //console.log("Alumno "+asist.nombre_alumno+" asistencia justificada: ",asist.justificada);
        let newAsistance = `INSERT INTO asistencias (id, alumno_id, fecha,presencia, modulo, clase_id, name_completo, grupo_tal, justificada)
        VALUES (NULL, ?,current_timestamp(), ?, ?, ?, ?, ?, ?)`;
        let asisVals = [        asist.id,                asist.presencia, asistBody.modv, regId, asist.nombre_alumno, asistBody.grupo ? asistBody.grupo : 'both', asistBody.justificada];
       // console.log("AsisVals (l 10): ", asisVals);
        await mySQLConnection(newAsistance, asisVals)
        let propMod = {
            "taller": `inas_tal`,
            "edu_fis": `inas_fis`,
            "5to_mod": `inas_preh`,
            "aula": `inas_aula`
        }
        const alumnInasVal = await mySQLConnection('SELECT * FROM alumnos WHERE id=?', [asist.id])
        console.log("alumnInasVal inas: ", alumnInasVal[0][propMod[asistBody.modv]])
        //                                          Cuidado
        let alumnInas=`UPDATE alumnos SET ${propMod[asistBody.modv]} = ? + 1, inasistencias = inas_aula/2 + inas_tal/2 + inas_fis/2 + inas_preh/4 WHERE id = ?`;
        if(asist.presencia==false&&asist.justificada==false) await mySQLConnection(alumnInas ,[ alumnInasVal[0][propMod[asistBody.modv]],asist.id])
    })
}

export function submitPresence(req, res){
    let asistBody = req.body;
    //Consultas sujeta a futuras modificaciones
    let newClass = `INSERT INTO clases 
    (id, materia_class_id, submit_datetime, curso_id, prof_asist, hora_enum, modulo,            grupo_tal,                                         asistencias, justificada) VALUES 
    (NULL, NULL,    current_timestamp(),        ?,          ?,          NULL,     ?,                  ?,                                             ?,                     ?)`;
    let classVals =                 [asistBody.courseId, asistBody.prof_asist, asistBody.modv, asistBody.grupo ? asistBody.grupo : 'NULL', asistBody.presentes, asistBody.justificada];
    
    mySQLConnection(newClass, classVals)
    .then(r=>insertAsis(asistBody, r))
    .catch(err=>{throw err})
    
    
    res.send(true)
}