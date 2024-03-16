const { response, request } = require('express');
const {Router} = require('express');
const { usuariosLogin, dataUser } = require('../controllers/executions');




const router = Router();

router.post('/login',  usuariosLogin)
router.post('/traeData',  dataUser)



module.exports = router;
     