import { readWriteOnly } from "../clientMods/indexedDBmods.js";
//1234%t&6eE
const welMsg = document.querySelector(".wel-msg span");
readWriteOnly("readonly").then(data=>{
    welMsg.innerHTML=data.username
})