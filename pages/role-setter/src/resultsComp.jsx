import { useState, useEffect } from "react";
import CustomSelect from "../../../src/comps/molecules/customSelect/customSelect";
const roleOpts=[
    {txt:"Preceptor", role:"prec"},
    {txt:"Profesor", role:"prof"},
    {txt:"Alumno", role:"alum"},
    {txt:"Visitante", role:"visit"},
    {txt:"Administrador", role:"adm"}
];
const roleTxt={
    ["prec"]: "Preceptor",
    ["prof"]: "Profesor",
    ["alum"]: "Alumno",
    ["visit"]: "Visitante", 
    ["adm"]: "Administrador",
}
let grps=[
    {txt: "Grupo A", grp: "a"},
    {txt: "Grupo B", grp: "b"},
];

export default function ResultUser({alumnItem, type="account", courses, itemId}){//ItemId puede ser la id tanto de la cuenta como de la peticion
    let courseObjs = alumnItem.curso_id?{id:alumnItem.curso_id, curso: alumnItem.curso, año: alumnItem.año, division: alumnItem.division}:{id:1, curso: "1ro1ra", año: 1, division: 1}
    let [end, setEnd]=useState(false);
    let [role, setRole]=useState(alumnItem.rol||alumnItem.role);
    let [form, setForm]=useState(false);
    /*form vars (if type is account)*/
    let [nom,setNom]=useState(alumnItem?.nombre);
    let [ape,setApe]=useState(alumnItem?.apellido);
    let [dni,setDni]=useState(alumnItem?.dni);
    let [couSel,setCouSel]=useState(courseObjs);
    let [grp,setGrp]=useState(alumnItem?.grupo_tal||"a");
    /*---------*/
    let [errorInp, setErrorInp]=useState();
  //let [search, setSearch]=useState("");//Se usa en caso de usar el boton de Search
    useEffect(()=>{
        if(errorInp){
            setTimeout(()=>setErrorInp(undefined), 5000);
        }
    }, [errorInp])
    async function handleSelectRol(selVal){
        await setRole(selVal)
    }
    function handleSend(){
        const actualRole = alumnItem.rol
        const setRoleReq={
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                role,
                nom,
                ape,
                dni,
                grp, 
                type,
                actualRole,
                courseVar: couSel,//courseVar tiene: .id, .curso, .año y .division
                itemId: itemId,
                roleBodyId: alumnItem?.rol_id,
                accId: alumnItem.cuenta_id||alumnItem.id//Primero prueba si es una peticion, y si no existe tal propiedad de peticion, pasa con la id, que seria tambien propia de las cuentas
            })
        }
        fetch("/set-role", setRoleReq).then(r=>r.json()).then(data=>{
            console.log("server msg: ", data.msg)
            if(data.code!=3){
                setErrorInp(data.msg)
                return
            }
            if(data.res){
                console.log("Setted role succesfuly to: ", data.res);
            }
            setForm(false)
            if(type=="petitions")setEnd(true);
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
    function handleForm(){
        console.log("testing condition for handling form aparition:  ", role.role!="adm"||role.role!="visit", " role var test: ", role.role);

        if(role.role!="adm"&&role.role!="visit")setForm(role!=undefined);
        else {handleSend()}
    }
    return(
        <>
        {(end==false)&&<div className={"result-item result-"+type}>
            {/**Fichar esta revision de variables y como funciona para que se muestre cada elemento */}
            {errorInp!=undefined&&<div className="result-error">{errorInp}</div>}
           {form==false&&
           <>
                <div className="res-item-name">username: {alumnItem.username||alumnItem.cuenta_id}</div>
                <div className="res-item-role">
                    <CustomSelect opts={roleOpts} propVal="role" onSelect={opt=>handleSelectRol(opt)} defaultText={roleTxt[alumnItem.rol]} defaultValue={alumnItem.rol} overDefaults={true} clases={"res-item-role-select"}/>
                </div>
                <div className="res-item-opts">
                    {type=="petitions"&&
                    <div className="opts">{/* En caso de ser una peticion */}
                        <div className="del-opt" onClick={e=>handleDelPet()}>
                            {"<"}Eliminar
                        </div>
                        <div className="ace-opt" onClick={e=>handleSend()}>
                            Aceptar{">"}
                        </div>
                    </div>
                    }
                    <div className="send-opt" onClick={e=>handleForm()}>{/* si tu rol es diferente de undefined, se podra proseguir, si es admin o visitante */}
                        {type=="account"?">>":"Cambiar datos"} 
                    </div>
                </div>
            </>}
            {form&&<div className="res-form">
                        <label>Nombre</label>
                        <input className="res-inp res-inp-name" onChange={e=>setNom(e.target.value)} defaultValue={nom}/>
                        <label>apellido</label>
                        <input className="res-inp res-inp-ape" onChange={e=>setApe(e.target.value)} defaultValue={ape}/>
                        <label>DNI</label>
                        <input className="res-inp res-inp-dni" onChange={e=>setDni(e.target.value)} defaultValue={dni}/>
                        {
                            role.role=="alum"&&
                            <>
                                <CustomSelect opts={courses} onSelect={setCouSel} propVal={"id"} propTxt={"curso"} defaultText={alumnItem.curso||"1ro1ra"||'Select Course'} defaultValue={couSel||1} overDefaults={true} clases="res-item-select" />
                                <CustomSelect opts={grps} onSelect={setGrp} propVal={"grp"} defaultText={"Grupo "+grp.toUpperCase()||"Grupo A"||'Select Group'} clases="res-item-select" defaultValue={grp||"a"} overDefaults={true}/>
                            </>
                        }
                        <button onClick={e=>handleSend()}>Enviar datos</button>
                    </div>}
        </div>
        }
        </>
    )
}