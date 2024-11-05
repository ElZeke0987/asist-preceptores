
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import errorPage from "./otherPages/errorPage.jsx";
import { reqPage } from "./mods.js";


export default function Nav(){

    return(
        <Router>
            <nav className="ap-nav">
                <div className="ap-nav-cont logo-nav">
                    <Link to="/"><img src="./logo.png"/></Link>
                </div>
                <div className="ap-nav-cont home-it">
                    <Link to="/">Home</Link>
                </div>
                <div className="ap-nav-cont base-nav-cont">
                    <Link to="/asistenter">Tomar asistencia</Link>
                </div>
                <div className="ap-nav-cont account-it">
                    <Link to="/login"> Iniciar sesion </Link>
                    <Link to="/register"> Registrarse </Link>
                </div>
            </nav>
            <Routes>
                <Route path="/index.html" element={<errorPage/>}/>
                <Route path="/" element={<errorPage/>}/>
                <Route path="/asistenter" element={<errorPage page="asistenter"/>}/>
                <Route path="/login" element={<errorPage page="login"/>}/>
                <Route path="/register" element={<errorPage page="register"/>}/>
            </Routes>
        </Router>  
    )
}