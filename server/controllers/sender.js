const nodemailer = require("nodemailer");

async function senderMail(from, to, subject, message){

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,        
        secure: true, // true for 465, false for other ports
        auth: {
          user: "grupobrain.utmach@gmail.com",
          pass: "videobrain2015" // generated ethereal password
        }
    });
    let f = ` "${from} 👻" <${from}@mail.com>`;
    let info = await transporter.sendMail({
        from: f,
        to, 
        subject, 
        text: "", 
        html: message
    });

    console.log("Mensaje enviado: %s", info.messageId);
}

module.exports = {
    senderMail
}