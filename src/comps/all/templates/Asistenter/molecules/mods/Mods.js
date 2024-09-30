export function getTourn(){
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

export function grpOpts (){
    if(moduloSel.value=="taller"){grupoTaller.style.display = "flex"; return}
    grupoTaller.style.display = "none"; 
    requestToLoadAlumns()
}

export function checkAllFunc(alItem){
    let a = alItem?  alItem.querySelector("input[type='checkbox']"):document.querySelectorAll(".alumn-item .pres-alumn");
    if(alItem)a.checked=checkAll.checked;
    else a.forEach(alu=>alu.checked=checkAll.checked);
}

export function searchTalSelGrp(gruposInp){
    let ret;
    gruposInp.forEach(opt=>{if(opt.checked)ret=opt.id})
    return ret;
}