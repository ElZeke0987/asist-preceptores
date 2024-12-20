import { mySQLConnection } from "../connection.js";
import { getAuthCookies } from "./cookiePoints.js";

export async function loadCourses(req, res, returned=false){//Funcion llamada en server.js:74,39
    console.log("Cargando cursos");
    res.setHeader("Content-Type", "application/json");
    let searchCourse=`SELECT * FROM cursos WHERE turno =?`;
    let allCourses = `SELECT * FROM cursos`;
    let tournRep = req.body.turno=="all"?allCourses:searchCourse;
    let actualReplacements = req.body.turno=="all"?[]:[req.body.turno];
    console.log("tournRep: ", tournRep, " actualReps", actualReplacements);
    let couList = await mySQLConnection(tournRep, actualReplacements)
    if(returned){
        return couList;
    }
    res.send({couList})
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

function pushToRetList(toRetList, cuenta){
    toRetList.push({
        id: cuenta.id,
        cuenta_id: cuenta?.cuenta_id,
        nombre: cuenta.nombre,
        apellido: cuenta.apellido,
        dni: cuenta.dni,
        username: cuenta.username,
        curso_id: cuenta?.curso_id,//||alu[0]?.curso_id,
        curso: cuenta?.curso,//||alu?[0]?.curso,
        año: cuenta?.año,
        division: cuenta?.division,
        grupo_tal: cuenta?.grupo_tal,
        rol: cuenta.rol||cuenta.role,
        rol_id: cuenta?.rol_id,
    })
}

async function sendTable(req, res, item){//item puede ser la lista de cuentas o de peticiones, al final del dia, tienen casi las mismas propiedades o todas iguales
    let toRetList=[];//Devolvemos a cada alumno por separado para mostrar diferentes variables (si es alumno, curso por ejem, cosa que no tienen preceptor y profesor)
    for(const cuenta of item) {
        if(cuenta.rol=="alum"){
            if(req.body.type=="accounts"){
                // await mySQLConnection("SELECT * FROM alumnos WHERE id=?", [cuenta.rol_id]).then(alu=>{
                //     pushToRetList(toRetList, cuenta, alu)
                // });
                return
            }
            pushToRetList(toRetList, cuenta)
            
        }else{
            
            toRetList.push({
                id: cuenta.id,
                cuenta_id: cuenta?.cuenta_id,
                nombre: cuenta.nombre,
                apellido: cuenta.apellido,
                dni: cuenta.dni,
                username: cuenta.username,
                curso_id: cuenta?.curso_id,
                curso: cuenta?.curso,
                año: cuenta?.año,
                division: cuenta?.division,
                grupo_tal: cuenta?.grupo_tal,
                rol: cuenta.rol||cuenta.role,
                rol_id: cuenta.rol_id,
            })
        }
       
        
    }
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
    mySQLConnection("SELECT * FROM cuentas", []).then(async acc=> {sendTable(req, res, acc)});//Devolvemos todas las cuenta
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
    
    mySQLConnection("SELECT * FROM role_petitions", []).then(petitions=> sendTable(req, res, petitions));
    
}

export function loadAsistencias(req, res){
    console.log("AlumnId test", req.body)
    mySQLConnection("SELECT * FROM asistencias WHERE alumno_id=?", [req.body.alumn_id]).then(listAsistencias=>{
        res.status(200).json({listAsistencias});
    })
}

export async function loadCoursesAsistencias(req, res){
    const cookie = await getAuthCookies(req);
    const bodyCookie = cookie.decd;
    if(bodyCookie.rol=="visit"){
        //A futuro hacer una tabla de denuncias o errores en la pagina
        res.status(404).json({msg:"Acceso no autorizado, como llegaste aqui?"});//En caso de intento de entrar de forma anti-natural a este link
        return
    }
    if(bodyCookie.rol=="alum"){
        let alumnItem = await mySQLConnection("SELECT * FROM alumnos WHERE id=?", [bodyCookie.idr]);
        let cursoItem = await mySQLConnection("SELECT * FROM cursos WHERE id=?", [alumnItem[0].curso_id])
        res.status(200).json({courseList: cursoItem, alumnList: alumnItem});
        return
    }
    if(bodyCookie.rol != "prof"){
        const cursosList = await mySQLConnection("SELECT * FROM cursos");
        const alumnosList = await mySQLConnection("SELECT * FROM alumnos");
        res.status(200).json({ courseList: cursosList, alumnList: alumnosList });
        return
    }
}