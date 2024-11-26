export default function regRequest(username, email, tel, pass, rPass, setErr){
    if (!email&&!tel){
        setErr("Necesitamos al menos un email o telefono");
        return
    }
    const regBody={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            email,
            tel,
            pass,
            rPass
        })
    }
    fetch("/register-account", regBody).then(res=>res.json()).then(data=>{
        console.log("data reg: ", data)
    })
}