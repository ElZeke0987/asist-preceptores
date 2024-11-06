import {join, dirname} from "path";
import { fileURLToPath } from "url";
import { readdir, readFile, stat} from "fs";
import express from "express";
import { pageMiddles } from "./middles.js";
import { mySQLConnection } from "../connection.js";

const __dirname = dirname(fileURLToPath(import.meta.url))
const proyect = join(__dirname, "../../../../");

let pageNoUsed=["login", "", "register"];


function setListenerPages(app){
    const baseDir=join(proyect, "pages");
    readdir(baseDir, (err, fls)=>{
        if(err){
            console.log("Ocurrio un error (l: 18): ", err);
            return
        }
        fls.forEach(page=>{
            const rutaPublic = join(baseDir, page, "dist");
            const rutaIndex = join(rutaPublic, "index.html");

            app.use(express.static(rutaPublic));
            app.use((req, res, next)=>{
                console.log("archivo descargado: ", req.url, rutaPublic);
                next()
            })

            if(pageNoUsed.includes(page)){
                app.get(`/${page}`, pageMiddles, (req, res)=>{
                    res.setHeader("Content-Type", "text/html")
                    res.sendFile(rutaIndex);
                })
                return
            }
            app.post(`/${page}`, pageMiddles,(req, res)=>{
                let userInfo = req.body.userinfo
                if(userInfo){
                    mySQLConnection("SELECT * FROM cuentas WHERE username=? AND email=? AND password=?", [userInfo.username, userInfo.email, userInfo.pass]).then(results=>{
                        const user = results[0];
                        console.log("Ruta index: ", rutaIndex);
                        if (page=="asistenter" && canAsistance.includes(user.rol)){
                            res.setHeader("Content-Type", "text/html")
                            res.sendFile(rutaIndex);
                            return
                        }
                    })
                }else console.log("No hay cuenta iniciada, que estas intentando? neandertal");
            })
        })
    })
}


export default function postNormals(app){
    let rutaPage = join(proyect, "pages");
    const funcJoin=(page, x="dist")=>{return join(rutaPage, page, x)};

    const funcPost=(page, cond=true)=>{
        const ruta = page==""?"index":page;
        console.log("ruta public: ", funcJoin(ruta));
        app.use(`/${page}`,express.static(funcJoin(ruta)));
        app.post(`/${page}`, pageMiddles,(req, res)=>{
            app.use(`/${page}`,express.static(funcJoin(ruta)));
            let userInfo = req.body.userinfo;
            const rutaIndex = funcJoin(ruta, "dist/index.html");
            if(userInfo){
                mySQLConnection("SELECT * FROM cuentas WHERE username=? AND email=? AND password=?", [userInfo.username, userInfo.email, userInfo.pass])
                .then(results=>{
                    const user = results[0];
                    console.log("Ruta index: ", rutaIndex);
                    if (eval(cond)){
                        console.log("Devolviendo index.html");
                        res.setHeader("Content-Type", "text/html")
                        res.sendFile(rutaIndex);
                        return
                    }
                })
            }else console.log("No hay cuenta iniciada, que estas intentando? neandertal");
        })
    }

    app.use((req, res, next)=>{
        console.log("archivo descargado: ", req.url);
        next()
    })
    funcPost("");
    funcPost("asistenter");
    funcPost("account");
}