
const jwt = require('jsonwebtoken')
const Auth = require('../database/auth');
const Usuarios = require('../database/usuario')



const userGet = async (req, res = response) => {
    const { token } = req.body;
    
    const decoded = jwt.verify(token, 'THATSITSASECRET');

    console.log('decoded: ', decoded)
    const user_ID= decoded.uid

    console.log('userID: ', user_ID)
   
    const usuario = await Auth.findById( user_ID );
        
   const {_id,
    username,
    password, tribu} = usuario

   const usuarios = await Usuarios.find({creador : user_ID }) 

   console.log('usuarios: ', usuarios) 

   
    
   console.log('devolvemos del back: ', usuario, usuarios)
   
    res.json({
        _id,
        username,
        password,
         tribu,
       usuarios
    })
}

module.exports = {
    userGet
}