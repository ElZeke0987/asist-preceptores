
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import IndexPage from "../../../../pages/index/src/ind.jsx";
import Login from "../../all/templates/Log&Reg/Login/log.jsx";
import Register from "../../all/templates/Log&Reg/Register/reg.jsx";
import ReAsistenter from "./otherPages/errorPage.jsx";


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
                <Route path="/index.html" element={<Navigate to="/"/>}/>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/asistenter" element={<ReAsistenter/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>  
    )
}