
import { mySQLConnection } from "../connection.js";

const propMod = {
    "taller": `inas_tal`,
    "edu_fis": `inas_fis`,
    "5to_mod": `inas_preh`,
    "aula": `inas_aula`
}

export async function changeInasCount(asist, asistBody, operation){//Asist es la inasistencia o asistencia en si, que queremos cambiar, asistBody debe tener el modulo, en este caso, es redundante, ya que esta la misma propiedad en el asist
    const alumnInasVal = await mySQLConnection('SELECT * FROM alumnos WHERE id=?', [asist.alumno_id])
    //                                          Cuidado
    const alumnInasAdd=`UPDATE alumnos SET ${propMod[asistBody?.modv||asist.modulo]} = ? + 1, inasistencias = inas_aula/2 + inas_tal/2 + inas_fis/2 + inas_preh/4 WHERE id = ?`;
    /*                           Valores a sumar o restar para ver lo que vale cada inasistencia a x modulo                                                    */
    const alumnInasSust=`UPDATE alumnos SET ${propMod[asistBody?.modv||asist.modulo]} = ? - 1, inasistencias = inas_aula/2 - inas_tal/2 - inas_fis/2 - inas_preh/4 WHERE id = ?`;
    const alumnInas=operation=="+"?alumnInasAdd:alumnInasSust;
    await mySQLConnection(alumnInas ,[ alumnInasVal[0][propMod[asistBody?.modv||asist.modulo]],asist.id])//Suma la inasistencia
}

async function verifyAsistExistence(asistBody){
    let msgListToReturn=[];
    const asistIteration= asistBody.asistArr.map(async asist=>{//asistArr son todas las asistencias tomadas en la clase
        
        //Primero debe verificar de que no se repita las tomas de asistencias en el mismo dia(fecha), y en su defecto, cambiarlas de ser que ya exista
        asist.justificada = asistBody.justificada ? true : asist.justificada;

        const today = new Date();
        const sqlDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
        const verifyAsistance = await mySQLConnection("SELECT * FROM asistencias WHERE alumno_id=? AND DATE(fecha)=? AND modulo=?", [asist.id, sqlDate, asistBody.modv])//Verifica que haya otra asistencia similar a la que se esta procesando
        /*
            verifyAsistance: asistencia antes
            asist: nueva asistencia
        */
        if(verifyAsistance[0]){
            let shouldReturnInform={msg: "", type: ""};
            
            const updateAsistance = `UPDATE asistencias SET presencia = ?, justificada=? WHERE id=?`;//Para manejar llegadas tarde o justificativos que vienen con algun alumno mas
            const asisVals = [asist.presencia, asist.justificada, verifyAsistance[0].id];
            await mySQLConnection(updateAsistance, asisVals)
            //Si antes se resto o sumo inasistencia, ahora se debe hacer el proceso contrario y reponer a la cantidad que tenia:
            console.log("Test of booleans: last asistance: ", verifyAsistance[0].presencia, " last justifyer: ", verifyAsistance[0].justificada, " new asistance: ", asist.presencia," new justifier: ", asist.justificada)
            if(!verifyAsistance[0].presencia&&(asist.presencia||asist.justificada)){//Verifica que si antes no asistio, en la nueva toma de asistencia, verifique si asistio o tiene justificada la falta
                
                shouldReturnInform.msg="Se cambio a presente a "+verifyAsistance[0].name_completo+" que antes estaba ausente"
                if(asist.justificada&&!asist.presencia)shouldReturnInform.msg="Se le justifico la falta a "+verifyAsistance[0].name_completo+" que antes estaba ausente";
                shouldReturnInform.type="update";
                msgListToReturn.push(shouldReturnInform)

                changeInasCount(asist, asistBody, "-")
                return
            }
            if(verifyAsistance[0].presencia&&(!asist.presencia&&(!verifyAsistance[0].justificada||!asist.justificada))){//<--- Si antes ni ahora se te justifica la salida de clases, se suma la inasistencia
                //Seria por escaparse de la escuela o una equivocacion del preceptor, si al final no vino, y en principio no estaba justificada la falta
                //Tambien puede ser que hayas enfermado y te cambien la presencia pero te la justifiquen

                shouldReturnInform.msg="Se cambio a ausente a "+verifyAsistance[0].name_completo+" que se creia estar presente"
                shouldReturnInform.type="update";
                msgListToReturn.push(shouldReturnInform)

                changeInasCount(asist, asistBody, "+")
                return
            }
            if(verifyAsistance[0].presencia&&(!asist.presencia&&!asist.justificada)){

                shouldReturnInform.msg="Se cambio a ausente a "+verifyAsistance[0].name_completo+" que no tenia justificativo"
                shouldReturnInform.type="update";
                msgListToReturn.push(shouldReturnInform)

                changeInasCount(asist, asistBody, "+")
                return
            }
            
            
        }
    })
    await Promise.all(asistIteration)
    return msgListToReturn
}

async function insertAsis(asistBody, regId, mes, dia, diaSem, res){
    asistBody.asistArr.forEach(async asist=>{
        asist.justificada = asistBody.justificada ? true : asist.justificada;
        //console.log("Alumno "+asist.nombre_alumno+" asistencia justificada: ",asist.justificada);
        let newAsistance = `INSERT INTO asistencias (id, alumno_id, fecha,presencia, modulo, clase_id, name_completo, grupo_tal, justificada, mes, dia, dia_sem)
        VALUES (NULL, ?,current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let asisVals = [asist.id,asist.presencia, asistBody.modv, regId, asist.nombre_alumno, asistBody.grupo ? asistBody.grupo : 'both', asist.justificada, mes, dia, diaSem];
       // console.log("AsisVals (l 10): ", asisVals);
        await mySQLConnection(newAsistance, asisVals)
        if(!asist.presencia&&!asist.justificada) changeInasCount(asist, asistBody, "+")
    })
    res.status(200).json({msg: "Se inserto exitosamente las asistencias de estas clases", type: "success"})
}
const daySemList=[
    "undefinedDay",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo"
]
export async function submitPresence(req, res){
    let asistBody = req.body;
    const msgList= await verifyAsistExistence(asistBody)
    if(msgList.length!=0){
        res.status(200).json({msgList})
        return
    }
    const dateTime = new Date()
    const mes = dateTime.getMonth();
    let dia = dateTime.getDay();
    if(dia==0)dia=7;
    const diaSem = daySemList[dia];
    console.log("testing month and day: month: ", mes, " day Sem: ", diaSem, " day number: ", dia)
    //Consultas sujeta a futuras modificaciones
    let newClass = `INSERT INTO clases 
    (id, materia_class_id, submit_datetime,curso_id, prof_asist,modulo,grupo_tal,asistencias,justificada,mes, dia, dia_sem) VALUES 
    (NULL, NULL,current_timestamp(),?,?,?,?,?,?,?,?,?)`;
    let classVals =[asistBody.courseId, asistBody.prof_asist, asistBody.modv, asistBody.grupo ? asistBody.grupo : 'NULL', asistBody.presentes, asistBody.justificada, mes, dateTime.getDay(),diaSem];
    
    mySQLConnection(newClass, classVals)
    .then(r=>insertAsis(asistBody, r, mes, dia,diaSem, res))
    .catch(err=>{throw err})
    

}