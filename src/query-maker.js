let number= {
    "1": "r",
    "2": "d",
    "3": "r",
    "4":"t",
    "5":"t",
    "6":"t",
    "7": "m"
};
let ori4= {
    "1": "alimentos",
    "2": "programacion",
    "3": "alimentos",
    "4":"informatica",
    "5":"programacion",
};
let ori5= {
    "1": "alimentos",
    "2": "programacion",
    "3": "informatica",
    "4":"alimentos",
    "5":"programacion",
};

let tourn3={
    "1": "morn",
    "2": "morn",
    "3": "afnoon",
    "4": "afnoon",
    "5": "morn",
    "6": "afnoon",
}
let tourn4={
    "1": "morn",
    "2": "morn",
    "3": "afnoon",
    "4": "afnoon",
    "5": "afnoon",
}
let tourn5={
    "1": "morn",
    "2": "morn",
    "3": "afnoon",
    "4": "morn",
    "5": "afnoon",
}
let actualTourn={
    "3": tourn3,
    "4": tourn4,
    "5": tourn5,
    "6": "night",
    "7": "night"
}
let endLog = false;
let index=24;
let query="INSERT INTO `cursos` (`id`, `curso`, `año`, `division`, `orientacion`, `alumnos`, `turno`) VALUES "
for(i=5; i<=6; i++){
    let maxDivision= 2;
    for(d=1; d<=maxDivision;d++){
        console.log(`${i}${number[i]}o${d}${number[d]}a`);
        let ori = i==4? ori4[d] : ori5[d];
        let orid = i<=3?"basico": ori;
        let tourn = actualTourn[i][d]?actualTourn[i][d]:actualTourn[i];
        query += `(${index}, '${i}${number[i]}o${d}${number[d]}a', '${i}', '${d}', '${orid}', NULL, '${tourn}'),\n`;
        index++;
    }
    
}
console.log(query)