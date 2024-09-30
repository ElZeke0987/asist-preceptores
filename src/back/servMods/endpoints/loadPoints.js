import { mySQLConnection } from "../connection.js";

export function loadCourses(req, res){//Funcion llamada en server.js:74,39
    res.setHeader("Content-Type", "application/json");
    let searchCourse=`SELECT * FROM cursos WHERE turno =?`;
    console.log("Cargando cursos");
    mySQLConnection(searchCourse, [req.body.turno]).then(v=>res.send({couList: v})) ;
}

export function loadAlumns(req,res){
    let alumnsParamsBody = req.body;
    res.setHeader("Content-Type", "application/json");
    let searchAlumns= alumnsParamsBody.grupo ?
    `SELECT * FROM alumnos WHERE curso_id= ? AND grupo_tal= ?`
    :
    `SELECT * FROM alumnos WHERE curso_id= ?`;
    let replacements = alumnsParamsBody.grupo ? [alumnsParamsBody.courseId, alumnsParamsBody.grupo] : [alumnsParamsBody.courseId];
    mySQLConnection(searchAlumns, replacements).then(v=>res.send({alumnsList: v}));
}