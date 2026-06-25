const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  apellido: { type: String, required: true },
  correo:   { type: String, required: true },
  telefono: { type: String, required: true },
  estado:   { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);