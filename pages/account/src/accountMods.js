export function sendClearReq(setLogoutBut, bool="yes"){
    
    if(bool=="no"){
        console.log("No bool")
        setLogoutBut(true);
        return
    }
    console.log("Clearing auth token");
    const clearCookieReq={
        method: "GET",
        credentials: "include"
    }

    fetch("/clear-auth").then(r=>r.json()).then(body=>{
        window.location.href="/";
        console.log(body.msg);
    });

}