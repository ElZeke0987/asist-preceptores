import { mySQLConnection } from "../connection.js";
import { verifyPermisions } from "../extraMods.js";
import { getAuthCookies } from "./cookiePoints.js";
import { delPetition } from "./setterPetitions.js";
const canSetPrecAdm=["adm"];

let tableQueriesUpd={
    ["prec"]: "UPDATE preceptores SET claimed=? , cuenta_id=? WHERE id=?",
    ["prof"]: "UPDATE profesores SET claimed=? , cuenta_id=? WHERE id=?",
    ["alum"]: "UPDATE alumnos SET claimed=? , cuenta_id=? WHERE id=?"
};
let tableQueriesSelByBas={
    ["prec"]: "SELECT * FROM preceptores WHERE nombre=? AND apellido=? AND dni=?",//Verifica con todos los parametros BASICOS
    ["prof"]: "SELECT * FROM profesores WHERE nombre=? AND apellido=? AND dni=?",
    ["alum"]: "SELECT * FROM alumnos WHERE nombre=? AND apellido=? AND dni=?"
};
let tableQueriesSel={
    ["prec"]: "SELECT * FROM preceptores WHERE dni=?",
    ["prof"]: "SELECT * FROM profesores WHERE dni=?",
    ["alum"]: "SELECT * FROM alumnos WHERE dni=?"
};
let tableQueriesIns={
    ["prec"]: "INSERT INTO preceptores (id, nom_comp, claimed, nombre, apellido, dni, cuenta_id) VALUES (NULL, ?, 1, ?, ?, ?, ?)",
    ["prof"]: "INSERT INTO profesores (id nom_comp,  claimed, nombre, apellido, dni, cuenta_id) VALUES (NULL, ?, 1,?, ?, ?, ?)",
    ["alum"]: "INSERT INTO alumnos (id nom_comp,  claimed, nombre, apellido, dni, curso, año, division, cuenta_id,curso_id, grupo_tal) VALUES (NULL, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
};
function insertingAlumn(body, res, role, roleId){
    mySQLConnection("SELECT * FROM cursos WHERE id=?", [body.courseVar.id]).then(course=>{
        if(!course){ 
            res.status(404).json({msg: "Course doesn't exists", code: 2})
            return
        }
        //Insercion de alumno
        mySQLConnection("UPDATE cursos SET alumnos=? WHERE id=?", [course[0].alumnos+1,body.courseVar.id])
        mySQLConnection(tableQueriesIns[role], [body.nom+" "+body.ape,body.nom, body.ape, body.dni, body.courseVar.curso, body.courseVar.año, body.courseVar.division, body.accId, body.courseVar.id, body.grp])
        .then(insAlum=>{
            if(body.type=="petition")delPetition(body.itemId)//Eliminar residuo o historial, aca se define si habra historial o no, despues se define en la BDD
            //Sea alumno o no, se tiene que cambiar al rol indicado a la cuenta
            mySQLConnection("UPDATE cuentas SET rol=?, rol_id=? WHERE id=?", [role, insAlum, body.accId])//Se cambia al siguiente sujeto
            res.send({msg: "Inserted alumn succesfuly", res: insAlum, code: 3})
        })
    })
}

function insertingSchooRole(body, req, res, role, userInfo){
    console.log("l-46: testing tableQueriesSel: ", tableQueriesSel[role])
    mySQLConnection(tableQueriesSel[role], [body.dni]).then(v=>{
        if(v[0] || v.length!=0){//Condicion basica para ver si se puede llevar a cabo el setRole
            
            console.log(role," already exist in database ", v);
            res.send({msg: role+" already exist in database", code: 1})
            return
        }
        //Selecciona la cuenta con la id pasada desde el cliente (seleccion) y saca el id del sujeto y luego lo unclaimea, de no haber rol_id pasada, 
        mySQLConnection("SELECT rol_id FROM cuentas WHERE id=?", [body.accId])
        .then(roleId=>{
            if(roleId[0].rol_id!=0){
                mySQLConnection(tableQueriesUpd[role], [0, null, roleId[0].rol_id])
            }
                
        });//Unclaiming
        //Condicion de que si es un alumno o no
        role=="alum"?insertingAlumn(body, res, role)://Insercion de docente (Preceptor o profesor por ahora)
        mySQLConnection(tableQueriesIns[role], [body.nom+" "+body.ape, body.nom, body.ape, body.dni, body.accId]).then(insDocent=>{

            if(role=="prec")verifyPermisions(canSetPrecAdm, req, res, userInfo, {handlePermission:(status)=>{
                if(status){
                    mySQLConnection("UPDATE cuentas SET rol=?, rol_id=? WHERE id=?", [role, insDocent, body.accId])//Se cambia al siguiente sujeto o rol
                    res.send({msg: "Inserted docent succesfuly", res: insDocent, code: 3})
                }else{
                    res.send({msg: "Can't change other prec being a prec yourself", res: insDocent, code: 5})
                }
                    
            }})
            
        })
    })
}

function updatingSchoolRole(body, req, res, role, subject, userInfo){
    mySQLConnection(tableQueriesUpd[role], [1,body.accId, subject.id]).then(updSubject=>{
        if(role=="prec"){
            verifyPermisions(canSetPrecAdm, req, res, userInfo, {handlePermission: (status)=>{//En caso de que le busquen la vuelta al usar un preceptor ya existente o cambiar a un preceptor a un alumno existente
                if(status){
                    mySQLConnection("UPDATE cuentas SET rol=?, rol_id=? WHERE id=?", [role, subject.id, body.accId])//Se vuelve al sujeto existente
                    res.send({msg: "Updated " + subject.nombre+" "+ subject.apellido + " to account: " + body.accId, res: updSubject, code: 3})
                }else{
                    res.send({msg: "Can't update to an existing prec being a prec or inferior", code: 5});
                }
            }})
        }
        
    })
}

const schoolRoles=["prec", "prof", "alum"];
async function setRoleFunc(req, res, userInfo){
    let body=req.body;
    let role=body.role.role||body.role;
    console.log("l-100: body test: ", body)
    if(schoolRoles.includes(role)){
        /**Complementacion de role_id
         * Todo se basa en que si ya esta el alumno, preceptor o profesor en la base de datos, coincidendo datos basicos
         * Si ya hay un rol_id definido es claramente porque esta vinculado, se tiene que dejar esta columna en NULL si no lo esta
         * Al crear un nuevo alumno y la cuenta ya estaba vinculada, se deja en unclaimed al anterior school role, y se crea el siguiente
         * Si ya existe el alumno peticionado se cambian nomas valores para dejar en claimed ese alumno
         * Si el alumno peticionado ya esta claimed, entonces se envia un mensaje de que ya existe el alumno
         * diferencia en tbQrSel y tbQrSelByBas:
         * el primero selecciona para verificar despues de que no hayan dos personas iguales (por DNI, que es un numero que no puede ser igual)
         * el segundo selecciona para ver si los datos ingresados en el form, son propios de algun alumno, para asi revincular la cuenta
         */
        
        mySQLConnection(tableQueriesSelByBas[role], [body.nom, body.ape, body.dni]).then(roleSchool=>{
            if(roleSchool[0]){//Si existe el sujeto peticionado
                if(roleSchool[0].claimed==1){//Si ya esta claimed
                    res.send({msg: role+" ya esta vinculado a otra cuenta", code: 4})
                    return
                }
                updatingSchoolRole(body, req, res, role, roleSchool[0], userInfo);

                return
            }
            insertingSchooRole(body, req, res, role, userInfo);
        })
    
    }
    else{
        //Punto donde se dividen los roles no pertenecientes a la institucion
        
        mySQLConnection("UPDATE cuentas SET rol=?, rol_id=NULL WHERE id=?", [role, body.accId]).then((ins)=>{
            res.send({msg: "Inserted other role succesfuly", res: ins, code: 3})
        });
    }
    
}
const canSetAlumns=["prec", "adm"]
export async function setRole(req, res){
    let cookie = await getAuthCookies(req);
    let userInfo = cookie.decd;
    let role= req.body.role.role;//Rol pedido
    if(userInfo){
        if(role=="alum"||role=="visit"){
            console.log("Checking if this account can set alumns or another roles")
            verifyPermisions(canSetAlumns, req, res, userInfo, {handlePermission: (status)=>{
                console.log("status of permission: ", status);
                status?setRoleFunc(req, res, userInfo):res.send({msg:"No puede cambiar a alumno esta cuenta por temas de permisos", code:5});
            }})
        }
        if((role=="prec"||role=="adm" )||(req.body.actualRole=="prec"||req.body.actualRole=="adm")){
            console.log("Checking if this account can set preceptor or admin role test");
            verifyPermisions(canSetPrecAdm, req, res, userInfo, {handlePermission: (status)=>{
                console.log("status of permission: ", status);
                status?setRoleFunc(req, res, userInfo):res.send({msg:"Cambio de roles no autorizado para tu nivel", code:5});
            }})
        }
    }
}

