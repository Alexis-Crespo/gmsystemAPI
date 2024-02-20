
const {Router} = require('express');
const { userGet } = require('../controllers/jwtDecoded');



const router = Router();

router.post('/',  userGet)



module.exports = router;