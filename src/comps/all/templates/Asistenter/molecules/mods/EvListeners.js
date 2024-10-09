import { grpOpts } from "./Mods";
import { requestToLoadAlumns, requestToLoadCourses } from "./Reqs";

/*
export function ChangeModuleSel(){
    let moduloSel = document.querySelector(".modulo");
    moduloSel.addEventListener("change", ()=>{
        grpOpts();
    })
}*/

export function SelGroupTaller(e, setAlumnsList){
    if(e.target.checked) requestToLoadAlumns( setAlumnsList,e.target.id);
}

export async function ChangeTourn(e, setCourses){
    let loadedCourses = await requestToLoadCourses(e.target.id);
    setCourses(loadedCourses);
}