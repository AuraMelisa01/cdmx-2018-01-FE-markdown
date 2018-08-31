
const fs = require('fs');
const markdown = require( "markdown" ).markdown;
const path = require("path");

/*  funcion que lee el archivo md y muestra la ruta donde se encuentra el archivo */
const readReadme = (archivo) => {
    if(path.isAbsolute(archivo)!=true){
        //console.log("Es falso")
        let fileAbsolut = path.resolve(archivo)
        console.log(fileAbsolut)
     }
    else{
    fs.readFile(archivo,'utf8', (err, data) => {
        if(err){
            console.log('Tienes un error');
        } else {
            console.log(data);
        } 
    })
}
}

//Retorno implicito
readReadme('./README.md');
    
  

/*  funcion que lee linea por linea el archivo md y muestra el total  */

const countLines = (err, data) => {
    if(err){
        console.log('No tienes README.md');
     } else {
        let lines = data.split('\n').length
        let html = markdown.toHTML(data.toString());
        console.log(html);
        console.log('El archivo tiene:' + lines + 'lineas');    
    } 
}

fs.readFile('./README.md', 'utf8', countLines);

