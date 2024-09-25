
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom"
import IndexPage from "../../templates/Index/ind.jsx"
import Login from "../../templates/Log&Reg/Login/log.jsx"
import Register from "../../templates/Log&Reg/Register/reg.jsx"

export default function Nav(){
    return(
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login"> Iniciar sesion </Link>
                <Link to="/register"> Registrarse </Link>
            </nav>
            <Routes>
                <Route path="/src/public/index.html" element={<Navigate to="/"/>}/>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>  
    )
}