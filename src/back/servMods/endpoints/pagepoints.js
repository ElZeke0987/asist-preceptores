import {join, dirname} from "path";
import { fileURLToPath } from "url";
import { readdir, readFile, stat} from "fs";
import express from "express";
import { pageMiddles } from "./middles.js";
import { mySQLConnection } from "../connection.js";

const __dirname = dirname(fileURLToPath(import.meta.url))
const proyect = join(__dirname, "../../../../");

let pageNoUsed=["login", "", "register"];
const canAsistance=["prec", "adm"];

export default function setListenerPages(app){
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

            if(pageNoUsed.includes(page)){
                app.get(`/${page}`, pageMiddles, (req, res)=>{
                    res.setHeader("Content-Type", "text/html")
                    res.sendFile(rutaIndex);
                })
                return
            }
            app.post(`/${page}`, pageMiddles,(req, res)=>{
                console.log("req body: ",req.body.userinfo)
                let userInfo = req.body.userinfo
                
                if(userInfo){
                    mySQLConnection("SELECT * FROM cuentas WHERE username=? AND email=? AND password=?", [userInfo.username, userInfo.email, userInfo.pass]).then(results=>{
                        console.log("results", results);
                        const user = results[0];
                        console.log("Verificando si es posible que tu cuenta tome asistencia");
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
/*
    pageArr.forEach(page => {
        app.get(page.url, (req, res)=>{
            res.setHeader("Content-Type", "text/html")
            res.sendFile(join(publico, page.dir));
        })
    });*/
}
