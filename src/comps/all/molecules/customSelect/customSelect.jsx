import { useEffect, useState } from "react";

function DefaultOptElem({text, value, onClick}){
    console.log("text of ", value, ": ", text);
    return (<div data-value={value} className="cus-select-option" onClick={onClick}>{text}</div>)
}
let optValProp = "id";
let optTxtProp = "curso";
let defaultOptions=[
    {val:"opt1",txt:"Opcion 1"},
    {val:"opt2",txt:"Opcion 2"},
    {val:"opt3",txt:"Opcion 3"},
];

export default function CustomSelect(
    {defaults=false, defaultValue="none",defaultText="Seleccione una opcion", 
        opts, Eleme=DefaultOptElem, 
        onSelect, onChange, clases}){
    if(opts==[]){return}
    let [isOpen, setIsOpen]=useState(false);
    let [selOpt, setSelOpt]=useState(opts==[]?{val: defaultValue, txt: defaultText}:opts[0]);
    async function handleSelect(opt){
        await setSelOpt(opt);
        await setIsOpen(false);
        if(onSelect)onSelect(opt);
    }
    return(
        <div className={`cus-selec-wrapper ${clases||clases.join(" ")}`} data-value={selOpt?selOpt.val:""} >
            <div className="cus-select">
                <div className="cus-select-selected" data-valueset={selOpt?selOpt.val:""} onClick={()=>{setIsOpen(!isOpen)}}>
                        {selOpt?selOpt.txt:"select option"}
                </div>
                {isOpen&&
                    (<div className="cus-select-options">
                        {opts.map((opt, i)=>{
                            console.log(i, ":Rendering: ", opt)
                            return (Eleme===DefaultOptElem?
                            <Eleme key={i} text={opt[optTxtProp]} value={opt[optValProp]} onClick={()=>{handleSelect(opt).then(()=>onChange())}} />:
                            <Eleme className="cus-select-option" key={i} onClick={()=>{handleSelect(opt).then(()=>onChange())}} />)
                        })}
                    </div>)
                }
            </div>
        </div>
    )
}