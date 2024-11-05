
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import errorPage from "./otherPages/errorPage.jsx";
import { reqPage } from "./mods.js";


export default function Nav(){

    return(
        <nav className="ap-nav">
            <div className="ap-nav-cont logo-nav">
                <div onClick={()=>reqPage("")}><img src="./logo.png"/></div>
            </div>
            <div className="ap-nav-cont home-it">
                <div onClick={()=>reqPage("")}>Home</div>
            </div>
            <div className="ap-nav-cont base-nav-cont">
                <div onClick={()=>reqPage("asistenter")}>Asistenter</div>
            </div>
            <div className="ap-nav-cont account-it">
                <div onClick={()=>reqPage("login")}>Iniciar sesion</div>
                <div onClick={()=>reqPage("register")}>Registrarse</div>
            </div>
        </nav>
    )
}