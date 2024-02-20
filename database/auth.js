const {Schema, model} = require('mongoose');

const AuthSchema = Schema({
    username : {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    tribu: {
        type: String,
       
    }
})

module.exports = model('auth', AuthSchema);