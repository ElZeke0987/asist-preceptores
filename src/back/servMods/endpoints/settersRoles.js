import { mySQLConnection } from "../connection.js";

function delPetition(petiId){
    mySQLConnection("DELETE FROM role_petitions WHERE id=?", [petiId])
}

export function setRole(req, res){
    let body=req.body;
    let tableQueriesSel={
        ["prec"]: "SELECT * FROM preceptores WHERE nombre=? OR apellido=? OR DNI=?",
        ["prof"]: "SELECT * FROM profesores WHERE nombre=? OR apellido=? OR DNI=?",
        ["alum"]: "SELECT * FROM alumnos WHERE nombre=? OR apellido=? OR DNI=?"
    };
    let tableQueriesIns={
        ["prec"]: "INSERT INTO preceptores (id, nombre, apellido, dni) VALUES (?, ?, ?)",
        ["prof"]: "INSERT INTO profesores (id, nombre, apellido, dni) VALUES (?, ?, ?)",
        ["alum"]: "INSERT INTO alumnos (id, nombre, apellido, dni, curso, año, division, cuenta_id,curso_id, grupo_tal) VALUES (NULL,?, ?, ?, ?, ?, ?, ?, ?, ?)"
    };
    let role=body.role.role;
    
    mySQLConnection(tableQueriesSel[role], [body.nom, body.ape, parseInt(body.dni)]).then(v=>{
        if(v[0]){//Condicion basica para ver si se puede llevar a cabo el setRole
            console.log(role," already exist in database ", v);
            res.send({msg: role+" already exist in database", code: 1})
            return
        }
        //Sea alumno o no, se tiene que cambiar al rol indicado a la cuenta
        console.log("body: ", body, " role: ", role)
        mySQLConnection("UPDATE cuentas SET rol=? WHERE id=?", [role, body.accId])
        //Condicion de que si es un alumno o no
        role=="alum"?mySQLConnection("SELECT * FROM cursos WHERE id=?", [body.courseVar.id]).then(course=>{
            console.log("Inserting alumn in: ", course);
            if(!course){
                res.status(404).json({msg: "Course doesn't exists", code: 2})
                return
            }
            mySQLConnection("UPDATE cursos SET alumnos=? WHERE id=?", [course[0].alumnos+1,body.courseVar.id])
            mySQLConnection(tableQueriesIns[role], [body.nom, body.ape, body.dni, body.courseVar.curso, body.courseVar.año, body.courseVar.division, body.accId, body.courseVar.id, body.grp.grp]).then(insAlum=>{
                if(body.type=="petition")delPetition(body.itemId)//Eliminar residuo o historial, aca se define si habra historial o no, despues se define en la BDD
                
                res.send({msg: "Inserted alumn succesfuly", res: insAlum, code: 3})
            })
        }):
        mySQLConnection(tableQueriesIns[role], [body.nom, body.ape, body.dni]).then(insDocent=>{
            res.send({msg: "Inserted alumn succesfuly", res: insDocent, code: 3})
        })
        
    })
}