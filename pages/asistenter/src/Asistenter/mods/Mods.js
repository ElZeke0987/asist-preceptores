import { useState } from "react";
import { requestToLoadAlumns } from "./Reqs";

export function getTourn(e) {
    const ele=e?e.target:undefined;
    const aho = new Date(); 
    const hs = aho.getHours(); 
    const min = aho.getMinutes();
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
    if(ele && ele.id==t){ele.checked=true; return "Checked automatically tourn"};
    return t || "no tourn";
}



export function checkAllFunc(alItem){
    let a = alItem?  alItem.querySelector("input[type='checkbox']"):document.querySelectorAll(".alumn-item .pres-alumn");
    if(alItem)a.checked=checkAll.checked;//Verifica si es para un solo alumno o para todos
    else a.forEach(alu=>alu.checked=checkAll.checked);
}

export function searchTalSelGrp(gruposInp){
    let ret;
    gruposInp.forEach(opt=>{if(opt.checked)ret=opt.id})
    return ret;
}

export function filterAlumns(optCourseSel, dataAlumnsList, setAlumnsFinal, alumnsFinal, grpSel="all"){
    setAlumnsFinal([])
    dataAlumnsList.forEach((v, i)=>{//Itera sobre todos los alumnos cargados de la base de datos (todos)
            if(v.curso_id==optCourseSel.id){

                const aluToAdd={
                    id: v.id,
                    nom_comp: v.nom_comp,
                    nombre: v.nombre,
                    apellido: v.apellido,
                    dni: v.dni,
                    grupo_tal: v.grupo_tal,
                    cuenta_id: v.cuenta_id,
                    inasistencias: v.inasistencias,
                    pres: true,
                    just: false, 
                }
                if(grpSel=="both"||grpSel=="all"){//Verifica si se selecciono algun grupo en especifico
                    setAlumnsFinal(prevVal=>[...prevVal, aluToAdd])
                    return
                }
                if(grpSel==v.grupo_tal){
                    setAlumnsFinal(prevVal=>[...prevVal, aluToAdd])
                    return
                }
            }
    })
}

export async function filterCourses(originalList, setNewList, turno){
    await setNewList([])
    if(turno=="all"){
        await setNewList(originalList);
        return
    }
    originalList.forEach(async v => {
        
        if(turno==v.turno){
            const courseToAdd={
                id: v.id,
                curso: v.curso,
            }
            setNewList(prevList=>[...prevList, courseToAdd]);
            return
        }
    });
}