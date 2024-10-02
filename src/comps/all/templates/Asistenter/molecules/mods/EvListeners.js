import { grpOpts } from "./Mods";
import { requestToLoadAlumns, requestToLoadCourses } from "./Reqs";


export function ChangeModuleSel(){
    moduloSel.addEventListener("change", ()=>{
        grpOpts();
    })
}

export function SelGroupTaller(e){
    if(e.target.checked) requestToLoadAlumns(e.target.id);
}

export async function ChangeTourn(e, setCourses){
    let loadedCourses = await requestToLoadCourses(e.target.id);
    console.log("Valor retornado: ", loadedCourses)
    setCourses(loadedCourses);

}