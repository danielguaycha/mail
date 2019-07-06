const express = require('express');
const api = express.Router();
const EmailController = require('./../controllers/email');

api.post('/mail/category', EmailController.addCategory);
api.get('/mail/category', EmailController.getCategory);
api.get('/mail/all/:u/:estado', EmailController.getMails)

api.post('/mail/:estado?',  EmailController.sendEmail);
api.get('/mail/:u/:estado?', EmailController.listRecvEmail);
api.get('/mail/sended/:u/:estado?', EmailController.listSendEmail);
api.put('/mail/delete/:id/:estado', EmailController.deleteEmail);

api.put('/mail/destroy/:id', EmailController.destroyEmail);
api.put('/mail/readed/:id', EmailController.readed);

module.exports = api;