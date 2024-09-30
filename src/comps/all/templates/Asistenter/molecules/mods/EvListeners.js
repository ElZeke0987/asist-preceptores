export function CheckAlumnsHandler(){
    checkAll.addEventListener("change",()=>checkAllFunc())
}

export function ChangeModuleSel(){
    moduloSel.addEventListener("change", ()=>{
        grpOpts();
    })
}

export function SelCourse(){
    gruposInp.forEach(g=>{
        g.addEventListener("click",()=>{
            if(g.checked)requestToLoadAlumns(g.id);
        })
    })
}

export function ChangeTourn(){
    tournSelect.forEach(inp=>{
        inp.addEventListener("change", ()=>requestToLoadCourses(inp.id))
    })
}