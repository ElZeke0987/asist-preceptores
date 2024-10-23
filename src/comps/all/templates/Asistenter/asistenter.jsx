import { useState } from "react"
import Params from "./molecules/Params"
import { requestToPostInform } from "./molecules/mods/Reqs"
import AlumnItem from "./molecules/AlumnItem";
let devMode=false;

let defaultAlmsn=[
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
{
    "id": 3,
    "nombre": "EJFJF",
    "apellido": "Teran",
    "grupo_tal": "A",
    "inasistencias": "29",
    "dni": "48220979"
},
{
    "id": 4,
    "nombre": "EJFJF",
    "apellido": "Teran",
    "grupo_tal": "A",
    "inasistencias": "29",
    "dni": "48220979"
},
{
    "id": 5,
    "nombre": "EJFJF",
    "apellido": "Teran",
    "grupo_tal": "A",
    "inasistencias": "29",
    "dni": "48220979"
},
{
    "id": 6,
    "nombre": "EJFJF",
    "apellido": "Teran",
    "grupo_tal": "A",
    "inasistencias": "29",
    "dni": "48220979"
},
{
    "id": 7,
    "nombre": "EJFJF",
    "apellido": "Teran",
    "grupo_tal": "A",
    "inasistencias": "29",
    "dni": "48220979"
},
{
    "id": 8,
    "nombre": "EJFJF",
    "apellido": "Teran",
    "grupo_tal": "A",
    "inasistencias": "29",
    "dni": "48220979"
},
];

export default function AsistenterPage(){
    let [alumnsList, setAlumnsList]=useState([]);
    console.log("ALUMNS ARRAY RENDERED");
    return(
        <div className="background-asist">
            <div className="asistenter-cont">
                <Params setAlumnsList={setAlumnsList}/>
                
                <div className="searcher">
                    <input type="text" placeholder="Buscar alumno..."/>
                    <button className="submit-search">
                        {">"}
                    </button>
                </div>
                    
                    
                <div className="alumn-list">
                    <div className='list'>
                        {
                            alumnsList.map(a=>{return(<AlumnItem almn={a} key={a.id}/>)})
                        }
                    </div>
                    <div className="submit-presence">
                        <button onClick={requestToPostInform}>
                            <div className="button-cont">
                                <div className="text-submit">Enviar informe</div>
                                <div className="point-down-animation">{">"}</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
            
    )
}