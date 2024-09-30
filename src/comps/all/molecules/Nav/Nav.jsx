
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";
import IndexPage from "../../templates/Index/ind.jsx";
import Login from "../../templates/Log&Reg/Login/log.jsx";
import Register from "../../templates/Log&Reg/Register/reg.jsx";
import AsistenterPage from "../../templates/Asistenter/asistenter.jsx";

export default function Nav(){
    return(
        <Router>
            <nav className="ap-nav">
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
                <Route path="/src/public/index.html" element={<Navigate to="/"/>}/>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/asistenter" element={<AsistenterPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>  
    )
}