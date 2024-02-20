const { response, request } = require('express');
const {Router} = require('express');
const { check } = require("express-validator");
const { usuariosGet, usuariosPost, usuarioDelete,usuarioUpdate } = require('../controllers/usuarios');


const router = Router();

router.get('/',  usuariosGet)

router.post('/', usuariosPost)

router.put('/:id' , usuarioUpdate)

router.delete('/:id' , usuarioDelete)

module.exports = router;
     