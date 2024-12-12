import { mySQLConnection } from "../connection.js";

export function loadCourses(req, res){//Funcion llamada en server.js:74,39
    console.log("Cargando cursos");
    res.setHeader("Content-Type", "application/json");
    let searchCourse=`SELECT * FROM cursos WHERE turno =?`;
    let allCourses = `SELECT * FROM cursos`;
    let tournRep = req.body.turno=="all"?allCourses:searchCourse;
    let actualReplacements = req.body.turno=="all"?[]:[req.body.turno];
    console.log("tournRep: ", tournRep, " actualReps", actualReplacements);
    mySQLConnection(tournRep, actualReplacements).then(v=>res.send({couList: v})) ;
}

export function loadAlumns(req,res){
    let alumnsParamsBody = req.body;
    res.setHeader("Content-Type", "application/json");
    let searchAlumns= alumnsParamsBody.grupo ?
    `SELECT * FROM alumnos WHERE curso= ? AND grupo_tal= ?`
    :
    `SELECT * FROM alumnos WHERE curso= ?`;
    let replacements = alumnsParamsBody.grupo ? [alumnsParamsBody.courseId, alumnsParamsBody.grupo] : [alumnsParamsBody.courseId];
    mySQLConnection(searchAlumns, replacements).then(v=>{res.send({alumnsList: v})});
}

export function loadAccountsRoSe(req, res){
    let body= req.body;
    res.setHeader("Content-Type", "application/json");
    /*const search = body.search;
    // Verifica que no esté vacío
    if (!search || typeof search !== 'string' || search.trim() === '') {
        throw new Error('El término de búsqueda no es válido.');
    }
    
    let queryToUse=search==""?"SELECT * FROM cuentas": "SELECT * FROM cuentas WHERE username LIKE ?"
    let replsToUse=search==""?[]:[`%{${search}}%`]*/
    mySQLConnection("SELECT * FROM cuentas", []).then(v=> res.send({resList: v}));
}

export function loadPetitionsRoSe(req, res){
    let body= req.body;
    res.setHeader("Content-Type", "application/json");
    /*const search = body.search;
    // Verifica que no esté vacío
    if (!search || typeof search !== 'string' || search.trim() === '') {
        throw new Error('El término de búsqueda no es válido.');
    }
    
    let queryToUse=search==""?"SELECT * FROM cuentas": "SELECT * FROM cuentas WHERE username LIKE ?"
    let replsToUse=search==""?[]:[`%{${search}}%`]*/
    mySQLConnection("SELECT * FROM role_petitions", []).then(v=> res.send({resList: v}));
    
}