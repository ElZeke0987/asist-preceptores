
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import errorPage from "./otherPages/errorPage.jsx";
import { reqPage } from "./mods.js";


export default function Nav(){

    return(
        <nav className="ap-nav">
            <div className="ap-nav-cont logo-nav">
                <a  onClick={()=>reqPage("")}><img src="./logo.png"/></a>
            </div>
            <div className="ap-nav-cont home-it">
                <a  onClick={()=>reqPage("")}>Home</a>
            </div>
            <div className="ap-nav-cont base-nav-cont">
                <a  onClick={()=>reqPage("asistenter")}>Asistenter</a>
            </div>
            <div className="ap-nav-cont account-it">
                <a  onClick={()=>reqPage("login")}>Iniciar sesion</a>
                <a  onClick={()=>reqPage("register")}>Registrarse</a>
            </div>
        </nav>
    )
}