let loadBd={
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify({
        turno: getTourn()
    })
}

export function requestToLoadCourses(tr){
    let trn = tr ? tr : getTourn();
    loadBd.body = JSON.stringify({
        "turno":  trn
    })
    fetch("/load-courses", loadBd)
    .then(res=>res.json())
    .then(data=>renderCourses(data.couList));
}

export function requestToLoadAlumns(group, courseListOpts){
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