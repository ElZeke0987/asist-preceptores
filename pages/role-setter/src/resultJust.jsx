import { useState } from "react"

export default function ResultJust({alumnItem, justAsist, type}){
    const [end, setEnd]=useState(false)
    const [errorInp, setErrorInp]=useState()
    const fJustReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({justAsistId: justAsist.id})
    }
    console.log("testing justAsist object: ", justAsist)
    function handleSendJust(action){
        fetch(action=="justificar"?"/verify-justify":"/reject-justify", fJustReq).then(r=>r.json()).then(final=>{setEnd(true);console.log("Succesfuly justified asistance")})
    }
    return(
        <>
        {(end==false)&&<div className={"result-item result-"+type}>
            {/** Manejar errores */}
            {errorInp!=undefined&&<div className="result-error">{errorInp}</div>}

        <>
            <div className="res-item-alumn-info">
                <div className="res-alumn-name">Alumno: {justAsist?.nom_comp}</div>
                <div className="res-alumn-course">Curso: {justAsist?.curso}</div>
            </div>
            <div className="res-item-just-msg">Mensaje del justificativo:
                <div className="just-msg-text">
                    {justAsist.msg_just}
                </div>
            </div>
            <div className="res-item-opts">

            <div className="opts">
                {/* A futuro un boton para denunciar y todo un sistema para ello */}
                <div className="del-opt" onClick={e=>handleSendJust("rechazar")}>
                    {"<"}Rechazar
                </div>
                <div className="ace-opt" onClick={e=>handleSendJust("justificar")}>
                    Justificar{">"}
                </div>
            </div>
            </div>
        </>
            
        </div>
        }
        </>
    )
}