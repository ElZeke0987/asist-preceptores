
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

export function handleAlumnClick(e){
    
    if(!e.target.classList.contains("just-asist-alumn")||!e.target.classList.contains("pres-alumn")){
        let elem= e.currentTarget;
        if(e.type=="dblclick"){
            
            let inp = elem.querySelector(".just-asist-alumn");
            inp.checked = inp.checked?false:true;
            inp.parentElement.classList.toggle("alumn-checked");
        }
        
            let inp = elem.querySelector(".pres-alumn");
            inp.checked = inp.checked?false:true;
            inp.parentElement.classList.toggle("alumn-checked");
    }
        
}

