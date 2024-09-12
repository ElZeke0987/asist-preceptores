let courseListOpts = document.querySelector(".course-list");
let grupoTaller = document.querySelector(".grupo-taller");
let tournSelect = document.querySelectorAll(".tourn-select input");
let alumnsList = document.querySelector(".alumns-list .list");
let checkAll = document.querySelector(".check-all input");
let moduloSel = document.querySelector(".modulo");
let justAsist = document.querySelector(".just-asist input");
let gruposInp= grupoTaller.querySelectorAll("input");
moduloSel.value="aula";
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
    const now = new Date(); hs = now.getHours(); min = now.getMinutes();
    let morn ={iniciohs: 7, iniciomin: 20, finhs: 12, finmin: 19};
    let afnoon = {iniciohs: 12, iniciomin: 20, finhs: 16, finmin: 44};
    let night ={iniciohs: 16, iniciomin: 45, finhs: 21, finmin: 45};
    let t;
    if (
        (hs > morn.iniciohs || (hs === morn.iniciohs && min >= morn.iniciomin)) &&
        (hs < morn.finhs || (hs === morn.finhs && min <= morn.finmin))
    ) t='morn'
    
    else if(
        (hs > afnoon.iniciohs || (hs == afnoon.iniciohs && min >= afnoon.iniciomin)) &&
        (hs < afnoon.finhs || (hs == afnoon.finhs && min <= afnoon.finmin))
    )t='afnoon'
    else if(
        (hs > night.iniciohs || (hs == night.iniciohs && min >= night.iniciomin)) &&
        (hs < night.finhs || (hs == night.finhs && min <= night.finmin))
    ) t='night'
    document.querySelector("#"+t).checked=true;
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
        "turno":  trn
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

function grpOpts (){
    if(moduloSel.value=="taller"){grupoTaller.style.display = "flex"; return}
    grupoTaller.style.display = "none"; 
    requestToLoadAlumns()
}
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
moduloSel.value = "aula";
justAsist.addEventListener("change",()=>document.querySelectorAll(".alumn-item .just-asist-alumn").forEach(chk=>chk.checked=justAsist.checked))