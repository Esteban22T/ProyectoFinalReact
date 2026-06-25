const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre:     { type: String, required: true },
  correo:     { type: String, required: true, unique: true },
  telefono:   { type: String, required: true },
  password:   { type: String, required: true },
  token:      { type: String },
  verificado: { type: Boolean, default: false },
  estado:     { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);