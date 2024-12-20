import { useEffect, useState } from "react"
import Params from "./molecules/Params"
import { requestToPostInform } from "./mods/Reqs"
import AlumnItem from "./molecules/AlumnItem";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
    let [allPresence, setAllPresence]=useState(true);
    let [allJustified, setAllJustified]=useState(false);
    let [alumnsList, setAlumnsList]=useState([]);
    
    useEffect(()=>{
        console.log("Change in all pres and just");
        document.querySelectorAll(".alumn-item").forEach((inp)=>{
            if(allPresence)inp.querySelector(".pres-alumn").checked=true;
            if(allJustified)inp.querySelector(".just-asist-alumn").checked=true;
        }
            
    )
    },[allPresence, allJustified])
    return(
        <div className="background-asist">
            <div className="asistenter-cont">
                <Params setAlumnsList={setAlumnsList} setAllPresence={setAllPresence} allPresence={allPresence} setAllJustified={setAllJustified} allJustified={allJustified}/>
                
                <div className="searcher">
                    <input type="text" placeholder="Buscar alumno..."/>
                    <button className="submit-search">
                        {">"}
                    </button>
                </div>
                    
                    
                <div className="alumn-list">
                    <div className='list'>
                        {

                            alumnsList.map(a=>{return(<AlumnItem almn={a} key={a.id} setAllPresence={setAllPresence} allPresence={allPresence} setAllJustified={setAllJustified} allJustified={allJustified}/>)})
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
/*
createRoot(document.getElementById('root').render(
    <StrictMode>
        <AsistenterPage/>
    </StrictMode>
))*/