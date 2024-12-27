import { getTourn } from "./Mods.js";

let renderTag= "option"
function renderCourses(courseList){
    let courseListOpts = document.querySelector(".course-list");
    courseListOpts.innerHTML = "";
    courseList.forEach(cOpt=>{
        courseListOpts.innerHTML += `<${renderTag} value=${cOpt.id}>${cOpt.curso}</${renderTag}>`
    })
}

function renderAlumns(alumnsList, setter){

}

let loadBd={
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        turno: getTourn()
    })
}
console.log("turno a renderizar ", loadBd.body.turno);

export async function requestToLoadCourses(tr){
    
    
    let toRet;
    loadBd.body = JSON.stringify({
        "turno":  trn
    })
    await fetch("/load-courses", loadBd)
    .then(res=>res.json())
    .then(data=>{ toRet=data.couList}); 
    return toRet;
}

export async function requestToLoadAlumns({setAlumnsList, group, course}){

    let courseListOpts = course ? course : await document.querySelector(".course-list .opt-selected").dataset.value;
    if(!courseListOpts) {console.log("CourseListOpts doesn't exist")}
    let grp=group ? group : undefined;
    if(grp=="both")grp=undefined;
    let alumnReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            grupo: grp,
            courseId: courseListOpts,
        })
    }
    fetch("/load-alumns", alumnReq).then(res=>res.json()).then(data=>{setAlumnsList(data.alumnsList)})//renderAlumns(data.alumnsList, setAlumnsList))
}

export function requestToPostInform(profAsistVal, moduloVal, courseId, grupo, allAlumns, allJustified){
    console.log("Enviando informe...")
    let asistenciasObj={
        courseId,
        asistArr: [], 
        presentes: 0, 
        prof_asist: profAsistVal, 
        modv: moduloVal,
        grupo,
        justificada: allJustified//falta justificada para la clase
    };
    
    allAlumns.forEach(a=>{
        if(a==undefined)return
        asistenciasObj.asistArr.push({
            id: a.id,
            nombre_alumno: a.nombre+" "+a.apellido,
            presencia: a.pres,
            grupo: grupo,
            justificada: a.just//Falta justificada para un alumno
        })
        if(a?.pres)asistenciasObj.presentes++;
    })
    let asistBody={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(asistenciasObj)
    }
    fetch("/submit-presence",asistBody).then(res=>window.location.href="/" )//Modificar por links
}