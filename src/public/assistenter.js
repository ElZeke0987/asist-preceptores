let courseListOpts = document.querySelector(".course-list");
let grupoTaller = document.querySelector(".grupo-taller");
let tournSelect = document.querySelectorAll(".tourn-select input");
let alumnsList = document.querySelector(".alumns-list .list");
let checkAll = document.querySelector(".check-all input");
let moduloSel = document.querySelector(".modulo");
let justAsist = document.querySelector(".just-asist input");
let gruposInp= grupoTaller.querySelectorAll("input");

function checkAllFunc(alItem){
    let a = alItem?  alItem.querySelector("input[type='checkbox']"):document.querySelectorAll(".alumn-item .pres-alumn");
    if(alItem)a.checked=checkAll.checked;
    else a.forEach(alu=>alu.checked=checkAll.checked);
}

checkAll.addEventListener("change",()=>checkAllFunc())

function searchTalSelGrp(){
    let ret;
    gruposInp.forEach(opt=>{if(opt.checked)ret=opt.id})
    return ret;
    }

function requestToPostInform(){
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

let renderTag= "option"
function renderCourses(courseList){
    courseListOpts.innerHTML = "";
    courseList.forEach(cOpt=>{
        courseListOpts.innerHTML += `<${renderTag} value=${cOpt.id}>${cOpt.curso}</${renderTag}>`
    })
}

function renderAlumns(almList){
    alumnsList.innerHTML="";
    almList.forEach(almn=>{
        alumnsList.innerHTML += 
        `<br>
        <div class="alumn-item" id="${almn.id}">
            <label>Presente:<input class="pres-alumn" type="checkbox" checked=true/></label><br>
            Alumno:<span class="name">${almn.nombre} ${almn.apellido}</span>
            <div>Grupo de taller: <span class="taller-grupo">${almn.grupo_tal}</span></div>
            <div>DNI: ${almn.dni}</div>
            <div>Inasistencias: ${almn.inasistencias}</div>
            <label >Falta justificada: <input class="just-asist-alumn" type="checkbox"/> </label>
        </div>
        <br>`
        checkAllFunc();
    })
    alumnsList.innerHTML += `
    <div class="submit-presence">
        <button>Enviar informe ></button>
    </div>`
    document.querySelector(".submit-presence button").addEventListener("click",()=>requestToPostInform());
}

function getTourn(){
    let datMin = new Date();
    let datMax = new Date();
    //Verificar que si paso el horario de entrada para x turno
    let hsMin = datMin.getHours();
    let minMin = datMin.getMinutes();
    //Verificar que si todavia no llego al horario de salida para x turno
    let hsMax = datMax.getHours();
    let minMax = datMax.getMinutes();
    let t;
    if ( (hsMin>=7 && minMin >= 20) && (hsMax<=12 && minMax <=15)){t="morn"}
    if ( (hsMin>=12 && minMin >= 16) && (hsMax <=16 && minMax <=19)){ t="afnoon"}
    if ( (hsMin>=16 && minMin >= 20) && (hsMax <=21 && minMax <=45)){ t="night"}
    return t;
}

let loadBd={
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify({
        turno: getTourn()
    })
}

function requestToLoadCourses(tr){
    let trn = tr ? tr : getTourn();
    loadBd.body = JSON.stringify({
        turno: trn
    })
    
    fetch("/load-courses", loadBd)
    .then(res=>res.json())
    .then(data=>renderCourses(data.couList));
}
requestToLoadCourses();

tournSelect.forEach(inp=>{
    inp.addEventListener("change", ()=>requestToLoadCourses(inp.id))
})

function requestToLoadAlumns(group){
    let grp=group ? group : undefined;
    if(grp=="both")grp=undefined;
    let alumnReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
            grupo: grp,
            courseId: courseListOpts.value,
        })
    }
    fetch("/load-alumns", alumnReq).then(res=>res.json()).then(data=>renderAlumns(data.alumnsList))
}

function grpOpts (){if(moduloSel.value=="taller"){grupoTaller.style.display = "flex"; return}grupoTaller.style.display = "none"; requestToLoadAlumns()}
grpOpts();

moduloSel.addEventListener("change", ()=>{
    grpOpts();
})

courseListOpts.addEventListener("change",()=>{
    requestToLoadAlumns();
})

gruposInp.forEach(g=>{
    g.addEventListener("click",()=>{
        if(g.checked)requestToLoadAlumns(g.id);
    })
})

justAsist.addEventListener("change",()=>document.querySelectorAll(".alumn-item .just-asist-alumn").forEach(chk=>chk.checked=justAsist.checked))