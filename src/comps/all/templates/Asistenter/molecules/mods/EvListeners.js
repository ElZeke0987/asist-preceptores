import { checkAllFunc, grpOpts } from "./Mods";
import { requestToLoadAlumns } from "./Reqs";


export function ChangeModuleSel(){
    moduloSel.addEventListener("change", ()=>{
        grpOpts();
    })
}

export function SelGroupTaller(e){
    if(e.target.checked)requestToLoadAlumns(e.target.id);
}

export function ChangeTourn(e){
    requestToLoadCourses(e.target.id)

}