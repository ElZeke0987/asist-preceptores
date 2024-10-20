import { useState } from "react";

function DefaultOptElem({text, value, onClick}){
    return (<div data-value={value} className="cus-select-option" onClick={onClick}>{text}</div>)
}

let defaultOptions=[
    {val:"opt1",txt:"Opcion 1"},
    {val:"opt2",txt:"Opcion 2"},
    {val:"opt3",txt:"Opcion 3"},
];

export default function CustomSelect(
    {defaults=false, defaultValue="none",defaultText="Seleccione una opcion", 
        opts=defaultOptions, Eleme=DefaultOptElem, 
        onSelect, onChange, clases}){

    
    let [isOpen, setIsOpen]=useState(false);
    let [selOpt, setSelOpt]=useState(defaults?{val: defaultValue, txt: defaultText}:opts[0]);
    async function handleSelect(opt){
        await setSelOpt(opt);
        await setIsOpen(false);
        if(onSelect)onSelect(opt);
    }
    return(
        <div className={`cus-selec-wrapper ${clases||clases.join(" ")}`} data-value={selOpt.val} >
            <div className="cus-select">
                <div className="cus-select-selected" data-valueset={selOpt.val} onClick={()=>{setIsOpen(!isOpen)}}>{selOpt.txt}</div>
                {isOpen&&
                        (<div className="cus-select-options">
                            {opts.map((opt, i)=>{
                            return (Eleme===DefaultOptElem?
                            <Eleme key={i} text={opt.txt} value={opt.val} onClick={()=>{handleSelect(opt).then(()=>onChange())}} />:
                            <Eleme className="cus-select-option" key={i} onClick={()=>{handleSelect(opt).then(()=>onChange())}} />)
                            })}
                        </div>)
                        }
            </div>
        </div>
    )
}