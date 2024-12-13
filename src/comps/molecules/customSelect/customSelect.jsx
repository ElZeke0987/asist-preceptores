import { useEffect, useState } from "react";

function DefaultOptElem({text, value, onClick}){
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
        onSelect, onChange, onOpen,clases,
        propTxt="txt", propVal="val"}){
    if(opts==[]){return}
    let [isOpen, setIsOpen]=useState(false);
    let [selOpt, setSelOpt]=useState(opts==[]?{val: defaultValue, txt: defaultText}:opts[0]);
    async function handleSelect(opt){
        await setSelOpt(opt);
        await setIsOpen(false);
        if(onSelect)onSelect(opt);
    }
    async function handleOpen(e) {
        if(onOpen)await onOpen(e);  
        await setIsOpen(!isOpen)
        
    }
    return(
        <div className={`cus-selec-wrapper ${clases||clases.join(" ")}`} data-value={selOpt?selOpt[propVal]:defaultValue} >
            <div className="cus-select">
                <div className="cus-select-selected opt-selected" data-value={selOpt?selOpt[propVal]:defaultValue} onClick={()=>{handleOpen()}}>
                    {selOpt?selOpt[propTxt]:defaultText}
                    {console.log("selOpt ", selOpt)}
                </div>
                {isOpen&&
                    (<div className="cus-select-options">
                        {opts.map((opt, i)=>{
                            return (Eleme===DefaultOptElem?
                            <Eleme key={i} text={opt[propTxt]} value={opt[propVal]} onClick={()=>{handleSelect(opt).then(()=>onChange())}} />:
                            <Eleme className="cus-select-option" key={i} onClick={()=>{handleSelect(opt[propVal]).then(()=>onChange())}} />)
                        })}
                    </div>)
                }
            </div>
        </div>
    )
}