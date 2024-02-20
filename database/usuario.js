const {Schema, model, SchemaType} = require('mongoose');

const UsuarioSchema = Schema({
    doc : {
        type: Number,   
    },
    du:{
        type:Boolean
    },
    pa:{
        type:Boolean
    },
    usuario: {
        type: String,
    },
    pass: {
        type: String
    },
    tarjetas: {
        type: Boolean
    },
    visa: {
        type:Boolean
    },

    mastercard: {
        type: Boolean
    },
    amex: {
        type:Boolean
    },
    ca: {
        type: Boolean
    },
    cc: {
        type:Boolean
    },
    usd: {
        type:Boolean
    },
    monotributista: {
        type:Boolean
    },
    autonomo: {
        type:Boolean
    },

    homologacion:{
        type: Boolean
    },
    desarrollo:{
        type: Boolean
    },
    cliente:{
        type:Boolean
    },
    publico: {
        type: Boolean
    },
    creador:{
        type: Schema.Types.ObjectId,
        ref: 'Auth',
    }

})


module.exports = model('usuario', UsuarioSchema);