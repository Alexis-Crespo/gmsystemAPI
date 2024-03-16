const { Schema, model } = require('mongoose');

const CuentaSchema = new Schema({
  principal: {
    type: Boolean,
    required: false,
  },
  tipo: {
    type: String,
    required: false,
  },
  saldo: {
    type: String,
    required: false,
  },
  numero_cuenta: {
    type: String,
    required: false,
  },
});

const UsuarioSchema = new Schema({
  doc: {
    type: Number,
  },
  du: {
    type: Boolean,
  },
  pass: {
    type: String,
  },
  usuario: {
    type: String,
  },
  
  publico: {
    type: Boolean
},
creador:{
    type: Schema.Types.ObjectId,
    ref: 'Auth',
},
logeado: {
    type: Boolean
},
traeData: {
    type: Boolean
},
  

  cuentas: {
    type: [CuentaSchema], // Aquí usamos un arreglo de objetos CuentaSchema
    default: [],          // Valor por defecto: un arreglo vacío
  },

  
});

module.exports = model('usuario', UsuarioSchema);
