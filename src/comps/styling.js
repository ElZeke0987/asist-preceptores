
export function handleStyleCheckTourn(e){
    let elem = e.currentTarget;
    let inp = elem.querySelector("input");
    let checkBox = elem.querySelector("input[type='checkbox'");

    if(!checkBox){
        console.log("HOLA");
        Array.from(elem.parentElement.children).forEach(tourn => {
            tourn.classList.remove("checked-opt");
            inp.checked=false
        });
        inp.checked=true;
        if(inp.checked)elem.classList.toggle("checked-opt");
        return
        
    }
    checkBox.checked=inp.checked==true?false:true;
    elem.classList.toggle("checked-opt");
}

function setAllOthers(e){
    let allOthers = e.currentTarget.querySelectorAll("input");
    allOthers.forEach(i=>i.checked=false);
}
function setChecked(clase, elem){
    let inp = elem.querySelector(clase);
    inp.checked = inp.checked?false:true;
    inp.parentElement.classList.toggle("alumn-checked");

}
export function handleAlumnClick(e){
    /*
        Un click: presencia = true;(1)
        Doble click: falta justificada = true;(2)
        click sobre los mismos input basandose en la clase del mismo: input = true;(3)
        All others turn to false beforee turn the other one inp to true (4)
    */
    let elem= e.currentTarget;
   console.log("e.currentTarget: ", elem, " e.target: ", e.target);
   if(e.target.classList.contains("justas-cont")||e.target.classList.contains("presence-cont")||
   e.target.parentElement.classList.contains("justas-cont")||e.target.parentElement.classList.contains("presence-cont")){
    setAllOthers(e);
    setChecked("input", e.target);
    return
   }//(3) verificacion

    if(e.type=="dblclick"){//(2)
        setAllOthers(e);
        
        setChecked(".just-asist-alumn", elem);
        return
    }
    //(1)
    setAllOthers(e);
    setChecked(".pres-alumn", elem);
    return

    
}

