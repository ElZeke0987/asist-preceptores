export default function reAsistenter(){

    let bodyReq={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            
        }
    }
    return(fetch("/asistenter", )||<div>No tienes permisos para ingresar en asistenter</div>)
}