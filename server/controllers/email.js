const Email = require('./../models/email');
const Category = require('./../models/category');
const mailController = require('./sender')

// Enviar Email o Guardar como borrador
async function sendEmail(req, res){

    let body = req.body;

    let estado = 1;

    if(req.params.estado)
        estado = req.params.estado;

    if(!body.receptor || !body.emisor || !body.contenido || !body.asunto){
        return res.status(400).send({ message: "Existen campos obligatorios"} )
    }

    let file = await uploadFile(req);

    Email.create({
        emisor: body.emisor,
        receptor: body.receptor,
        asunto: body.asunto,
        contenido: body.contenido,
        estado: estado,
        extrainfo: file
    }).then( (email) => {

        mailController.senderMail(email.emisor, body.receptor, body.asunto, body.contenido);

        return res.status(200).send({ email })
    }).catch( err => {
        console.log(err);
        return res.status(400).send({ err })
    })
}

function uploadFile(req){
    return new Promise( (resolve, reject) => {
        if(!req.files){
            resolve("");
        }
    
        let file = req.files.file;
        let fileNameSplit = file.name.split('.');
        let extension = fileNameSplit[fileNameSplit.length - 1 ];
            
        let validExts = ['jpg', 'png', 'jpeg'];
    
        if(validExts.indexOf(extension)<0){
            resolve("");
        }
    
        // Cambiar nombre
        let fileName = `${ fileNameSplit[0] }-${ new Date().getMilliseconds() }.${ extension }`
    
        // Use the mv() method to place the file somewhere on your server
        file.mv(`public/files/${fileName}`, function(err) {
            if (err){
                console.log(err);
                resolve("null");
            }        
            resolve(fileName);
        });
    });
    
}


function listRecvEmail(req, res){
    let user = req.params.u;
    let estado = 1;

    if(!user)
        return res.status(404).send({ message: "Usuario no encontrado" })

    if(req.params.estado)
        estado = req.params.estado

    Email.findAll({  where: { receptor: user, estado: estado } }).then( emails => {

        if(!emails) return res.status(404).send({ message: "No existen mensajes" });
        
        if(emails.length === 0) return res.status(200).send({ message: "No tienes mensajes" });


        return res.status(200).send({ emails })

    })
}

// liste enviados, borrador, eliminados
function listSendEmail(req, res){
    let user = req.params.u;
    let estado = 1;
    if(!user)
        return res.status(404).send({ message: "Usuario no encontrado" })

    if(req.params.estado)
        estado = req.params.estado;

    Email.findAll({  where: { emisor: user, estado: estado } }).then( emails => {

        if(!emails) return res.status(404).send({ message: "No existen mensajes" });
        
        if(emails.length === 0) return res.status(200).send({ message: "No tienes mensajes" });


        return res.status(200).send({ emails })

    })
}

function deleteEmail(req, res){
    let id = req.params.id;
    let estado = req.params.estado;

    if(!id || !estado) return res.status(400).send({ message: "Proporciona un id y estado"})

    Email.update({
        estado: estado
    }, { returning: true, where: { id: id } }).then( email => {
        console.log(email);
        return res.status(200).send({ message: "Estado del mensaje cambiado"})
    })
}

function readed(req, res){

    let id = req.params.id;
    console.log(`Readed`);

    if(!id) return res.status(400).send({ message: "Proporciona un id"})

    Email.update({
        leido: false
    }, { returning: true, where: { id: id } }).then( email => {
        return res.status(200).send({ message: "Mensaje marcado como no leido"})
    })

}

function destroyEmail(req, res){
    let id = req.params.id;
    

    if(!id) return res.status(400).send({ message: "Proporciona un id valido"})

    Email.destroy({
        where: {
            id: id
        }
    }).then( () => {
        return res.status(200).send({ message: "Email Eliminado con exito"})
    })
}

async function addCategory(req, res){
    let body = req.body;
    if(!body.name){
        return res.status(400).send({message:"Ingrese nombre de categoria"});
    }

    let value = await Category.max('value');
    if(!value)
        value = 1;

    Category.create({
        nombre: body.name,
        value: value+1
    }).then( category => {
        return res.status(200).send({ category })
    }).catch( err =>{
        return res.status(400).send({message:"Error al guardar categoría", err});
    })
}

function getCategory(req, res){
    Category.findAll().then( categories => {
        return res.status(200).send({ categories })
    }).catch( err => {
        return res.status(400).send({message:"Error al consultar categorías", err});
    })
}

function getMails(req, res){
    let user = req.params.u;
    let estado = 1;

    if(!user)
        return res.status(404).send({ message: "Usuario no encontrado" })

    if(req.params.estado)
        estado = req.params.estado

    Email.findAll({  where: { 
        [Op.or]: [{receptor: user}, { emisor: user}],
        [Op.and]: [{ estado: estado }]
     } }).then( emails => {

        if(!emails) return res.status(404).send({ message: "No existen mensajes" });
        
        if(emails.length === 0) return res.status(200).send({ message: "No tienes mensajes" });

        return res.status(200).send({ emails })
    })
}


module.exports = {
    sendEmail, listRecvEmail, listSendEmail, deleteEmail, readed, destroyEmail, addCategory, getCategory, getMails
}
