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
let tableSel={
    ["prec"]: "SELECT * FROM preceptores WHERE id=?",
    ["prof"]: "SELECT * FROM profesores WHERE id=?",
    ["alum"]: "SELECT * FROM alumnos WHERE id=?"
};

async function sendTable(res, item){//item puede ser la lista de cuentas o de peticiones, al final del dia, tienen casi las mismas propiedades o todas iguales
    let toRetList=[];//Devolvemos a cada alumno por separado para mostrar diferentes variables (si es alumno, curso por ejem, cosa que no tienen preceptor y profesor)
    for(const cuenta of item) {
        console.log("cuenta test", cuenta);
        if(cuenta.rol=="alum"){
            await mySQLConnection(tableSel[cuenta.rol], [cuenta.rol_id]).then(alu=>{
                console.log("Testing alu in sql connection: ", alu[0])
                toRetList.push({
                    id: cuenta.id,
                    username: cuenta.username,
                    rol: cuenta.rol||cuenta.role,
                    rol_id: cuenta?.rol_id,
                    curso: alu[0]?.curso,
                    curso_id: alu[0]?.curso_id
                })
            });
            
        }else{
            
            toRetList.push({
                id: cuenta.id,
                username: cuenta.username,
                rol: cuenta.rol||cuenta.role,
                rol_id: cuenta.rol_id,
            })
        }
       
        
    }
    console.log("Test of toRet", toRetList);
    res.send({resList: toRetList})
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
    const schoolRoles=["prec", "prof", "alum"];
    mySQLConnection("SELECT * FROM cuentas", []).then(async acc=> {sendTable(res, acc)});//Devolvemos todas las cuenta
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
    
    mySQLConnection("SELECT * FROM role_petitions", []).then(petitions=> sendTable(res, petitions));
    
}