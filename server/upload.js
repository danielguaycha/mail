const express = require('express');
const api = express.Router();
const fs = require('fs');
const path = require('path');

api.post('/upload', (req, res) => {
    if(!req.files){
        return res.status(400).send({ ok: false, message: 'Error, proporcione un archivo'})
    }

    let file = req.files.file;
    let fileNameSplit = file.name.split('.');
    let extension = fileNameSplit[fileNameSplit.length - 1 ];
        
    let validExts = ['jpg', 'png', 'jpeg', 'pdf', 'docx', 'doc'];

    if(validExts.indexOf(extension)<0){
        return res.status(400).send({ ok: false, message:'Archivo no válido'})
    }

    // Cambiar nombre
    let fileName = `${ fileNameSplit[0] }-${ new Date().getMilliseconds() }.${ extension }`

    // Use the mv() method to place the file somewhere on your server
    file.mv(`public/files/${fileName}`, function(err) {
        if (err)
            return res.status(500).send({ ok: false, err });
        return res.status(200).send({ ok:true, file: fileName, ext: extension })
    });

})


api.post('/avatar', (req, res) => {
    if (!req.files && !req.body.name) {
        return res.status(400).send({ menssage: 'Sube un archivo ' })
    }

    let name = req.body.name;

    let file = req.files.file;
    let fileNameSplit = file.name.split('.');
    let ext = fileNameSplit[fileNameSplit.length - 1];
    let fileName = name + '.' + ext;
    file.mv(`public/files/${fileName}`, (err) => {
        if (err)
            return res.status(500).send(err);

        return res.status(200).send({ menssage: 'Subido con exito', file: fileName, })
    });
});

api.get('/file/:img', (req, res) => {

    if(!req.params.img){
        return res.status(200).send({ok: false, message:"Nombre de la imagen requerido"})
    }

    let image_file = req.params.img;
    let path_file = './public/files/'+image_file;
    fs.exists(path_file, exist => {
        if(exist)
             res.sendFile(path.resolve(path_file));
        else
            return res.status(200).send({ok: false, message:"No existe el archivo"})
    })
})

module.exports = api;