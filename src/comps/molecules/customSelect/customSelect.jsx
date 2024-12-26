import { use } from "react";
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
/**
 * Recuerda que no se pueden pasar objetos
 */
export default function CustomSelect(
    {defaults=false, defaultValue="none",defaultText="Seleccione una opcion", overDefaults=true,
        opts, Eleme=DefaultOptElem, 
        onSelect, onChange, onOpen,clases,
        propTxt="txt", propVal="val",//Tener en cuenta esto para ver las propiedades de cada valor seleccionado, ya que son objetos los que seleccionamos, con una propiedad visual y otra funcional (txt e id)
        forEffectVal, forEffectTxt, 
        isOpenPar, setIsOpenPar}){//Custom handlers de cuando se abra el customSelect
    let [isOpen, setIsOpen]=useState(false);
    if(opts==[]){return}
    /* Valor seleccionado */
    let [selOpt, setSelOpt]=useState((opts[0]==undefined||overDefaults)?{[propVal]: defaultValue||"none", [propTxt]: defaultText||"Seleccione una opcion"}:opts[0]);
    async function handleSelect(opt){//ACORDARSE QUE ESTO NO ES TIPO EVENTO QUE TE DEVUELVE UN OBJETO EVENT, DEVOLVERA LA OPCION SELECCIONADA EN EL PRIMER PARAMETRO
        await setSelOpt(opt);
        await isOpenPar!=undefined?setIsOpenPar(false):setIsOpen(false);
        if(onSelect)onSelect(opt);
    }
    async function handleOpen(e) {
        if(onOpen)await onOpen(e);  
        await isOpenPar!=undefined?setIsOpenPar(!isOpenPar):setIsOpen(!isOpen)
    }
    
        useEffect(()=>{//Para manejar el evento de cambio de valor de otras formas
            if(forEffectVal&&forEffectTxt){
                setSelOpt(forEffectVal)
            }
        },[forEffectVal])
    
       
    /*Defaults
        --Agarra el defaultText o defaultValue
        --SelOpt es lo seleccionado
        --prop* son propiedades definidas, custom digamos
        --overDefaults define si se usaran los ddefaults
    */
    /*let valFinal=overDefaults?defaultValue: (selOpt?selOpt[propVal]:defaultValue);
    let txtFinal=overDefaults? defaultText: (selOpt?selOpt[propTxt]:defaultText);
    let [mounted, setMounted]=useState(true);*/
    return(
        <div className={`cus-selec-wrapper ${clases||clases.join(" ")}`} data-value={selOpt[propVal]} >
            <div className="cus-select">
                <div className="cus-select-selected opt-selected" data-value={selOpt[propVal]} onClick={()=>{handleOpen()}}>
                    {forEffectTxt||selOpt[propTxt]}
                </div>
                {(isOpenPar!=undefined?isOpenPar:isOpen)&&
                    (<div className="cus-select-options">
                        {opts.map((opt, i)=>{
                            
                            return (Eleme===DefaultOptElem?
                            <Eleme key={i} text={forEffectTxt||opt[propTxt]} value={opt||opt[propVal]} onClick={()=>{handleSelect(opt).then(()=>{/*if(onChange)onChange()*/})}} />:
                            <Eleme className="cus-select-option" key={i} onClick={()=>{handleSelect(opt||opt[propVal]).then(()=>{/*if(onChange)onChange()*/})}} />)
                        })}
                    </div>)
                }
            </div>
        </div>
        
    )
}