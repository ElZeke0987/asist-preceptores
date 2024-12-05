export function sendClearReq(setLogoutBut, bool="yes"){
    console.log("Clearing auth token");
    if(bool=="no"){
        console.log("No bool")
        setLogoutBut(true);
        return
    }
    const clearCookieReq={
        method: "GET",
        credentials: "include"
    }
    fetch("/clear-auth").then(r=>r.json()).then(body=>{
        window.location.href="/"
        console.log("cleared token, ",body.msg)
    });

}