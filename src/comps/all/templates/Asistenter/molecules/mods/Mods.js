import { requestToLoadAlumns } from "./Reqs";

export function getTourn(e){
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

export function grpOpts (setAlumnsList){//Es para cuando se elija si hay taller o no
    let moduloSel = document.querySelector(".modulo");
    let grupoTaller = document.querySelector(".grupo-taller");
    if(moduloSel.value=="taller"){grupoTaller.style.display = "flex"; return}
    grupoTaller.style.display = "none"; 
    requestToLoadAlumns(setAlumnsList);
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