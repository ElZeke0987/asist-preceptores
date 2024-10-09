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
    body: {
        turno: getTourn()
    }
}
console.log("turno a renderizar ", loadBd.body.turno);

export async function requestToLoadCourses(tr){
    let trn = tr ? tr : getTourn();
    let toRet;
    loadBd.body = JSON.stringify({
        "turno":  trn
    })
    await fetch("/load-courses", loadBd)
    .then(res=>res.json())
    .then(data=>{ toRet=data.couList});
    return toRet;
}

export function requestToLoadAlumns(setAlumnsList, group){
    let courseListOpts = document.querySelector(".course-list");
    let grp=group ? group : undefined;
    if(grp=="both")grp=undefined;
    let alumnReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            grupo: grp,
            courseId: courseListOpts.value,
        })
    }
    console.log("Body Req parameters: ", alumnReq)
    fetch("/load-alumns", alumnReq).then(res=>res.json()).then(data=>{console.log("setting alumns list: ", data.alumnsList);setAlumnsList(data.alumnsList)})//renderAlumns(data.alumnsList, setAlumnsList))
}

export function requestToPostInform(){
    console.log("Enviando informe...")
    let profAsistVal = document.querySelector(".prof-asist input").checked
    let moduloVal = moduloSel.value
    let allAlumns=document.querySelectorAll(".alumn-item");
    
    let asistenciasObj={
        courseId: courseListOpts.value ,
        asistArr: [], 
        presentes: 0, 
        prof_asist: profAsistVal, 
        modv: moduloVal,
        grupo: moduloSel.value == "taller" ? searchTalSelGrp() : "NULL",
        justificada: justAsist.checked//falta justificada para la clase
    };
    
    allAlumns.forEach(a=>{
        asistenciasObj.asistArr.push({
            id: a.id,
            nombre_alumno: a.querySelector(".name").innerHTML,
            presencia: a.querySelector(".pres-alumn").checked,
            grupo: moduloSel.value == "taller" ? searchTalSelGrp() : "NULL",
            justificada: a.querySelector(".just-asist-alumn").checked//Falta justificada para un alumno
        })
        if(a.querySelector(".pres-alumn").checked)asistenciasObj.presentes++;
    })
    let asistBody={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(asistenciasObj)
    }
    fetch("/submit-presence",asistBody).then(res=>window.location.href="/index.html")//Modificar por links
}