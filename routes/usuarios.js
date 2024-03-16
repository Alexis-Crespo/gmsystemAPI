const { response, request } = require('express');
const {Router} = require('express');
const { check } = require("express-validator");
const { usuariosGet, usuariosPost, usuarioDelete,usuarioUpdate, loginUpdate, traeDatahdler } = require('../controllers/usuarios');


const router = Router();

router.get('/:id',  usuariosGet)

router.post('/', usuariosPost)

router.put('/:id' , usuarioUpdate)

router.delete('/:id' , usuarioDelete)

router.post('/log' , loginUpdate)

router.post('/retrieveData', traeDatahdler)

module.exports = router;
     