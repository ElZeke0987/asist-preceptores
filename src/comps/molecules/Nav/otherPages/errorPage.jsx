import { reqPage } from "../mods"

export default function errorPage({page}){
    console.log("Error page render")
    
    return (reqPage(page)||<div>No tienes permisos para ingresar en esta pagina o no existe</div>)
}