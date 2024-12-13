import { useState } from "react";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";
const roleOpts=[
    {txt:"Preceptor", role:"prec"},
    {txt:"Profesor", role:"prof"},
    {txt:"Alumno", role:"alum"},
    {txt:"Visitante", role:"visit"},
    {txt:"Administrador", role:"adm"}
];
let grps=[
    {txt: "Grupo A", grp: "a"},
    {txt: "Grupo B", grp: "b"},
];

export default function ResultUser({alumnItem, type="account", courses, itemId}){//ItemId puede ser la id tanto de la cuenta como de la peticion
    let [end, setEnd]=useState(false);
    let [role, setRole]=useState();
    let [form, setForm]=useState(false);
    /*form vars*/
    let [nom,setNom]=useState();
    let [ape,setApe]=useState();
    let [dni,setDni]=useState();
    let [couSel,setCouSel]=useState();
    let [grp,setGrp]=useState();
    /*---------*/
    async function handleSelectRol(selVal){
        await setRole(selVal)
    }
    function handleSend(){
        const setRoleReq={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                role,
                nom,
                ape,
                dni,
                grp,
                type,
                courseVar: couSel,
                itemId: itemId,
                accId: alumnItem.cuenta_id||alumnItem.id//Primero prueba si es una peticion, y si no existe tal propiedad de peticion, pasa con la id, que seria tambien propia de las cuentas
            })
        }
        fetch("/set-role", setRoleReq).then(r=>r.json()).then(data=>{
            console.log("server msg: ", data.msg)
            if(data.code==1){
                return
            }
            if(data.res){
                console.log("Setted role succesfuly to: ", data.res);
            }
            setEnd(true)
        })
    }
    function handleDelPet(){
        const setRoleReq={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                role,
                petiId: alumnItem.id
            })
        }
        fetch("/del-petition", setRoleReq).then(r=>r.json()).then(data=>{
            console.log("Rejected petition succesfuly to: ", alumnItem);
        })
    }
    console.log("role is undefined? ", role!=undefined)
    return(
        <>
        {end==false&&<div className={"result-item result-"+type}>{/**Fichar esta revision de variables y como funciona para que se muestre cada elemento */}
           {form==false&&
           <>
                <div className="res-item-name">username: {alumnItem.username||alumnItem.cuenta_id}</div>
                <div className="res-item-role">
                    <CustomSelect opts={roleOpts} propVal="role" onSelect={opt=>handleSelectRol(opt)} defaultText="Rol" clases={"res-item-role-select"}/>
                </div>
                <div className="res-item-opts">
                    {alumnItem.cuenta_id||type=="petitions"&&<div className="del-opt">
                        {"<"}Eliminar
                    </div>}
                    <div className="send-opt" onClick={e=>setForm(role.role!=undefined)}>{/* si tu rol es diferente de undefined, se podra proseguir */}
                        {">>"}
                        
                    </div>
                </div>
            </>}
            {form&&<div className="res-form">
                        <label>Nombre</label>
                        <input className="res-inp res-inp-name" onChange={e=>setNom(e.target.value)}/>
                        <label>apellido</label>
                        <input className="res-inp res-inp-ape" onChange={e=>setApe(e.target.value)}/>
                        <label>DNI</label>
                        <input className="res-inp res-inp-dni" onChange={e=>setDni(e.target.value)}/>
                        {
                            role.role=="alum"&&
                            <>
                                <CustomSelect opts={courses} onSelect={setCouSel} propVal={"id"} propTxt={"curso"} defaultText='Select Course' clases="res-item-select" />
                                <CustomSelect opts={grps} onSelect={setGrp} propVal={"grp"} defaultText='Select Group' clases="res-item-select" />
                            </>
                        }
                        <button onClick={e=>handleSend()}>Enviar datos</button>
                    </div>}
        </div>
        }
        </>
    )
}