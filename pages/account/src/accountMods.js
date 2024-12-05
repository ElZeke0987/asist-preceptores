export function sendClearReq(setLogoutBut, bool="yes"){
    if(bool=="no"){
        setLogoutBut(true);
        return
    }
    const clearCookieReq={
        method: "GET",
        credentials: "include"
    }
    fetch("/clear-auth").then(r=>r.json()).then(body=>{console.log(body.msg)});

}