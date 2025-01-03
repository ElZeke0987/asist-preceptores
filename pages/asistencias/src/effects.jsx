import { useEffect } from "react"

export function alumnIdSelEff(alumnsLoadFinal, setAlumnObjSel, alumnIdSel){//La lista final despues de todos los filtros, seria la de los grupos
//Hay que probar si dejar que sea en la lista pequeña y filtrada es buena opcion o si usar la lista total de alumnos para buscar al mismo, buscar cual es mas propensa a errores
    console.log("Testing alumnIdSelEff: ", alumnsLoadFinal);
    alumnsLoadFinal.forEach((v, i)=>{//Cuando se elija un alumno
        //console.log("Testing v.id with selected alumn id: ", v.id, " = ", alumnIdSel.id);
        if(v.id==alumnIdSel.id){
            let newAlumnObjSel={
                id: v.id,
                nom_comp: v.nom_comp,
                nombre: v.nombre,
                apellido: v.apellido,
                curso: v.curso,
                cursoId: v.cursoId,
                dni: v.dni,
                grupo_tal: v.grupo_tal,
                cuenta_id: v.cuenta_id,
                inasistencias: v.inasistencias,
                inas_tal: v.inas_tal,
                inas_aula: v.inas_aula,
                inas_preh: v.inas_preh,
                inas_fis: v.inas_fis,
            };

            console.log("hola testing: ", newAlumnObjSel );
            setAlumnObjSel(newAlumnObjSel)
        }
    })
}

//El filtro se aplica aca, cada vez que se va cambiando el curso
export function courseIdSelEff(data, courseIdSel, setAlumnsLoadCourse, alumnsLoadCourse, setAlumnsLoadFinal){

    let newAlumnsLoadCourse=[];
    
    setAlumnsLoadFinal([])
    setAlumnsLoadCourse([])
    data?.alumnList.forEach(async (v, i)=>{//alumnosList se carga una vez;
        
        if(v.curso_id==courseIdSel.id){
            const objToPush={
                id: v.id,
                nom_comp: v.nom_comp,
                nombre: v.nombre,
                curso: v.curso,
                cursoId: courseIdSel.id,
                apellido: v.apellido,
                dni: v.dni,
                grupo_tal: v.grupo_tal,
                cuenta_id: v.cuenta_id,
                inasistencias: v.inasistencias,
                inas_tal: v.inas_tal,
                inas_aula: v.inas_aula,
                inas_preh: v.inas_preh,
                inas_fis: v.inas_fis,
            };

            newAlumnsLoadCourse.push(objToPush)
            
            
            return
        }
        
    })
    setAlumnsLoadCourse(newAlumnsLoadCourse)
}

//El segundo filtro, para los grupos de taller y esas cosas, se puede aplicar sobre los alumnos ya filtrados de curso
export function grpIdSelEff(grp, alumnsLoadCourse, alumnsLoadGrp, setAlumnsLoadGrp, setAlumnsLoadFinal){
    let newAlumnsLoadGrp=[];
    setAlumnsLoadFinal([])
    setAlumnsLoadGrp([])
    //console.log("testing grp par of grpIdSelEff: ", grp, " and alumns Loaded by course filter: ", alumnsLoadCourse)
    alumnsLoadCourse.forEach(async v => {
        //console.log("testing forEach grpIdSelEff");
        if(grp=="all"||grp==undefined){
            //console.log("Setting new alumnsLoadFinal: ", alumnsLoadCourse)
            await setAlumnsLoadGrp(alumnsLoadCourse)
            return
        }
        if(v.grupo_tal===grp){
            const objToAdd={
                id: v.id,
                nom_comp: v.nom_comp,
                nombre: v.nombre,
                apellido: v.apellido,
                curso: v.curso,
                cursoId: v.curso_id,
                dni: v.dni,
                grupo_tal: v.grupo_tal,
                cuenta_id: v.cuenta_id,
                inasistencias: v.inasistencias,
                inas_tal: v.inas_tal,
                inas_aula: v.inas_aula,
                inas_preh: v.inas_preh,
                inas_fis: v.inas_fis,
            };

            newAlumnsLoadGrp.push(objToAdd)
            
            
        }
    });
    setAlumnsLoadGrp(newAlumnsLoadGrp);
}