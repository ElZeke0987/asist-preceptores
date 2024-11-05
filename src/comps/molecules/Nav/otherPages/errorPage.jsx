import { reqPage } from "../mods"

export default function errorPage({page}){

    
    return (reqPage(page)||<div>No tienes permisos para ingresar en esta pagina o no existe</div>)
}