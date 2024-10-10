import { useState } from "react"
import Params from "./molecules/Params"
import { requestToPostInform } from "./molecules/mods/Reqs"
import AlumnItem from "./molecules/AlumnItem";

export default function AsistenterPage(){
    let [alumnsList, setAlumnsList]=useState([
        {
        "id": 1,
        "nombre": "Elias",
        "apellido": "Teran",
        "grupo_tal": "B",
        "inasistencias": "25",
        "dni": "48220979"
    },
    {
        "id": 2,
        "nombre": "EJFJF",
        "apellido": "Teran",
        "grupo_tal": "A",
        "inasistencias": "29",
        "dni": "48220979"
    },
]);
    return(
        <div className="background-asist">
            <div className="asistenter-cont">
                <Params setAlumnsList={setAlumnsList}/>
                <div className="alumn-list">
                    <div className='list'>
                        {
                            
                            alumnsList.map(a=>{return(<AlumnItem almn={a} key={a.id}/>)})
                        }
                    </div>
                    <div className="submit-presence">
                        <button onClick={requestToPostInform}>Enviar informe</button>
                    </div>
                </div>
            </div>
        </div>
            
    )
}