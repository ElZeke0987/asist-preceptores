import { useEffect, useState } from "react";
const moduleText = {
    ["taller"]: "T",
    ["edu_fis"]: "ED",
    ["5to_mod"]: "PH",
    ["aula"]: "A",
    [undefined]: "Und"
};
function ToJustCheckbox({ asistItem, setJustModInas, justModInas }) {
    useEffect(() => console.log("justModInas test: ", justModInas), [justModInas]);
    return (
        <div>
            <input type="checkbox" checked={justModInas[asistItem.modulo]}
                onClick={() => setJustModInas(prev => {
                    console.log("Checkbox clicked for module: ", asistItem.modulo);
                    return { ...prev, [asistItem.modulo]: !prev[asistItem.modulo] }
                })} />
            <label>{asistItem.modulo}</label>
        </div>
    );
}

function ModuleElement({ asist }) {
    console.log("value of mapped asistList: ", asist)
    return <div className={"asist-mod-" + asist?.modulo + " asist-mod " + (asist?.presencia == 1 ? "asist-pres" : "asist-inas")}> {moduleText[asist?.modulo]}: {asist?.presencia == 1 ? "Pres" : "Inas"}</div>
}

export default function ConjuntCell(
    {asistList,
    shouldJustify,
    opened}) {
    if(!asistList)return
    const [justModInas, setJustModInas] = useState({
        taller: false,
        edu_fis: false,
        aula: false,
        ["5to_mod"]: false,
    });
    const [justOpen, setJustOpen] = useState(false); // Maneja el estado de que si se abre o no el sistema para justificar faltas
    const [justifyItem, setJustifyItem] = useState(false);
    const [asistanceOpen, setAsistanceOpen]=useState(false)

    const [justMsg, setJustMsg]=useState("");
    useEffect(()=>{
        console.log("Open asist state: ", asistanceOpen)
    },[asistanceOpen])
    useEffect(()=>console.log("New object: ", justModInas), [justModInas])

    function handleSendJustInfo(){
        console.log("Sending info to SV DB")
    }
    return (
        <div className={`asist-day`}>
            <button onClick={e => setAsistanceOpen(!asistanceOpen)}>{asistanceOpen?"Volver":"Cambiar datos"}</button>
            {!asistanceOpen&&<div className="asist-four-modules">
                {asistList?.map((v, e) => {
                    return (<ModuleElement asist={v} key={e} />);
                })}
            </div>}
            
            {asistanceOpen && <div className="asist-changes">
                
                <button onClick={e => setJustOpen(!justOpen)}>Justificar</button>
                {justOpen && <div className="justifier-form">
                    {asistList.map((v, i) => {
                        if (v == undefined) return;
                        return (<ToJustCheckbox asistItem={v} setJustModInas={setJustModInas} justModInas={justModInas} key={i} />);
                    })}
                    <label>Mensaje Justificativo</label>
                    <textarea placeholder="Un justificativo claro, conciso y veridico" onChange={e=>setJustMsg(e.target.value)}></textarea>
                    <button onClick={e=>handleSendJustInfo()}>Enviar Justificativo</button>
                </div>}
            </div>}
        </div>
    );
}
