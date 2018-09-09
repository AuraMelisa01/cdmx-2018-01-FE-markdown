const rutaMd = './READMEPRUEBAS.md'; //Ruta del archivo md
const fs = require('fs'); // modulo de nodejs que lee el archivo md
const path = require("path"); //Modulo de nodejs que analiza una ruta absoluta
const markdown = require("markdown").markdown; //liberia que convierte el archivo md a html
const jsdom = require("jsdom"); //libreria
const {
    JSDOM
} = jsdom;
const fetch = require('node-fetch');



/*  funcion que lee el archivo md y muestra la ruta donde se encuentra el archivo */
const readReadme = (route) => {
    if (path.isAbsolute(route) != true) {
        //console.log("Es falso")
        const fileAbsolut = path.resolve(route)
        console.log(fileAbsolut);
    } else {
        fs.readFile(route, (err, data) => {
            if (err) {
                console.log('Tienes un error');
            } else {
                console.log(data);
            }
        })
    }
}

//Retorno implicito
readReadme(rutaMd);



/*  funcion que lee linea por linea el archivo md y muestra el total de lineas */

const countLines = (err, data) => {
    if (err) {
        console.log('No tienes un archivo README.md');
    } else {
        const lines = data.split('\n').length;
        console.log('El archivo tiene: ' + lines + ' lineas');
    }
}

fs.readFile(rutaMd, 'utf8', countLines);




/*  funcion que obtiene los links del archivo md */

const mdLinks = (err, data) => {

    const html = markdown.toHTML(data.toString());
    const dom = new JSDOM(html);
    const selectLinks = dom.window.document.querySelectorAll('a');
    
    const listLinks = [];
    
   
    for (let i = 0; i < selectLinks.length; i++) {
        const titulo = selectLinks[i].text;
        const link = selectLinks[i].href;
        console.log('Título: ' + titulo);
        console.log(link);
        // listLinks.push('Título: ' + titulo);
        listLinks.push(link);

    }

    console.log(`Total de links:  ${selectLinks.length}`);
    console.log(listLinks);
    
    for (let i = 0; i < listLinks.length; i++) {
        fetch(listLinks[i])
            .then(function (response) {
                // 200 OK --- Respuesta estándar para peticiones correctas.
                // 404 Not Found --- Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado

                console.log('Link =', response.url);
                console.log('Status =', response.statusText, response.status);
                console.log('Ruta =', rutaMd);
                // console.log('Status =', response.status);
                // console.log('ok =', response.ok);  

            })
            .catch(function (err) {
                console.error(err);
            });
    };

    // statusLinks(listLinks);
}
 
fs.readFile(rutaMd, mdLinks);






