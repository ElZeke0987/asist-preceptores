
export function handleStyleCheckTourn(e){
    let elem = e.currentTarget;
    let inp = elem.querySelector("input");
    Array.from(elem.parentElement.children).forEach(tourn => {tourn.classList.remove("checked-opt"); inp.checked=false});
    inp.checked=true;
    if(inp.checked)elem.classList.toggle("checked-opt");
}
