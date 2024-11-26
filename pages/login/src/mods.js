

export function logRequest(userOEmail, password){
    let logBody={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:   JSON.stringify({
            userOEmail,
            password
        })
    }
    fetch("/login-account", logBody).then(res=>res.json).then(data=>{
        console.log("data: ", data);
    })
}