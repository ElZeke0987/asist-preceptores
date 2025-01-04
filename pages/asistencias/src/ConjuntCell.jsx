import { useEffect, useState } from "react";
const moduleText = {
    ["taller"]: "T",
    ["edu_fis"]: "ED",
    ["5to_mod"]: "PH",
    ["aula"]: "A",
    [undefined]: "Und"
};
function ToJustCheckbox({ asistItem, setJustModInas, justModInas }) {
    return (
        <div>
            <input type="checkbox" checked={justModInas[asistItem.modulo]}
                onClick={() => setJustModInas(prev => {
                    console.log("Checkbox clicked for module: ", asistItem.modulo);
                    asistItem.should_just=true;
                    return { ...prev, [asistItem.modulo]: !prev[asistItem.modulo] }
                })} />
            <label>{asistItem.modulo}</label>
        </div>
    );
}

function ModuleElement({ asist }) {// asist es un objeto de la tabla asistencias
    return (
    <div className={"asist-mod-" + asist?.modulo + " asist-mod " + (asist?.presencia == 1 ? "asist-pres" : "asist-inas") + (asist?.justificada==1?"asist-just":"")}> 
        {moduleText[asist?.modulo]}
    </div>)
}

export default function ConjuntCell(
    {conjuntAsist,//es la lista de modulos o el conjunto en si mismo de ellos
    alumnId, 
    cursoId, 
    nomComp, 
    curso,
    }) {
        console.log(" rendering asist: ", conjuntAsist)
    if(!conjuntAsist)return<div>Und</div>
    const [justModInas, setJustModInas] = useState({
        taller: false,
        edu_fis: false,
        aula: false,
        ["5to_mod"]: false,
    });
    const [justOpen, setJustOpen] = useState(false); // Maneja el estado de que si se abre o no el sistema para justificar faltas
    const [justifyItem, setJustifyItem] = useState(false);
    const [asistanceOpen, setAsistanceOpen]=useState(false)
    let arrToSendJustAsistId=[];
    const [justMsg, setJustMsg]=useState("");
    
    const fechaOfConjunt={}

    function handleSendJustInfo(){
        let newArrayWithInas =  [];
        conjuntAsist.forEach(asistence => {//Toma las inasistencias de la conjuntAsist que se deban justificar
            if(asistence.presencia==0&&asistence.should_just)newArrayWithInas.push(asistence);
        });
        const setJustifyReq={
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                alumnId,
                cursoId,
                nomComp,
                curso,
                justModInas,
                justifyItem,
                justMsg, 
                
                conjuntAsist: newArrayWithInas})
        }
        console.log("Sending info to SV DB")
        fetch("/set-justify",setJustifyReq).then(r=>r.json()).then(data=>{
            console.log("SV DB response: ",data)
            setAsistanceOpen(false)
            setJustOpen(false)
        })
    }
    
    return (
        <div className={`asist-day`}>
            {!justOpen&&
            <div className="asist-four-modules">
                {conjuntAsist?.map((v, e) => {
                    return (<ModuleElement asist={v} key={e} />);
                })}
            </div>}
            <button onClick={e => setJustOpen(!justOpen)}>{justOpen?"Volver":"Justificar"}</button>
            {justOpen && <div className="justifier-form">
                {conjuntAsist.map((v, i) => {
                    if (v == undefined||v.presencia||v.justificada) return;
                    return (<ToJustCheckbox asistItem={v} setJustModInas={setJustModInas} justModInas={justModInas} key={i} />);
                })}
                <label>Mensaje Justificativo</label>
                <textarea placeholder="Un justificativo claro, conciso y veridico" onChange={e=>setJustMsg(e.target.value)}></textarea>
                <button onClick={e=>handleSendJustInfo()}>Enviar Justificativo</button>
            </div>}

        </div>
    );
}
