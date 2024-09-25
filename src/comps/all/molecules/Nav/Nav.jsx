import { Link } from "react-router-dom"
import IndexPage from "../../templates/Index/ind.jsx"

/*
<nav class="nav-links">
            <a href="./account-init.html">Iniciar sesion / Registrarse</a>
            <a className="spc-prece" href="./asistenter.html">Tomar asistencia</a>
        </nav>
*/

export default function Nav(){
    return(
        <nav>
            <Link to="/">Home</Link>
        </nav>
    )
}