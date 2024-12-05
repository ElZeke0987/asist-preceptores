
//import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
//import errorPage from "./otherPages/errorPage.jsx";
import { reqPage } from "./mods.js";
import { useState } from "react";


export default function Nav(){
const cookieReq={
        method: "GET",
        credentials: "include",
    }
    let [username, setUsername]=useState();
    let [rol, setRol]=useState();
    fetch("/read-auth", cookieReq).then(r=>r.json()).then(decoded=>{
        const newData = decoded.data
        console.log("Decoded data token: ", newData);
        setUsername(newData.use);
        setRol(newData.rol);
    })
    return(
        <nav className="ap-nav">
            <div className="ap-nav-cont logo-nav">
                <a href="/" onClick={()=>reqPage("")}><img src="./logo.png"/></a>
            </div>
            <div className="ap-nav-cont home-it">
                <a href="/" onClick={()=>reqPage("")}>Home</a>
            </div>
            {
                (rol=="prec"||rol=="adm")&&<div className="ap-nav-cont base-nav-cont">
                    <a href="/role-setter" onClick={()=>reqPage("role-setter")}>Asistencias</a>
                </div>
            }
            {(rol=="prec"||rol=="adm")&&<div className="ap-nav-cont base-nav-cont">
                <a href="/asistenter" onClick={()=>reqPage("asist-get")}>Asistenter</a>
            </div>}
            {(rol=="prec"||rol=="adm"||rol=="alum"||rol=="prof")&&<div className="ap-nav-cont base-nav-cont">
                <a href="/asistencias" onClick={()=>reqPage("asistencias")}>Asistencias</a>
            </div>}
            {(username==undefined)?
            <div className="ap-nav-cont account-it">
                <a href="/login" onClick={()=>reqPage("login")}>Iniciar sesion</a>
                <a href="/register" onClick={()=>reqPage("register")}>Registrarse</a>
            </div>:
            <div className="ap-nav-cont account-inited">
                <img/>
                <a href="/account" onClick={()=>reqPage("account")}>Cuenta</a>
            </div>
            }
        </nav>
    )
}