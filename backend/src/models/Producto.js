const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre:      { type: String, required: true },
  descripcion: { type: String, required: true },
  precio:      { type: Number, required: true },
  stock:       { type: Number, default: 0 },
  tipo:        { type: String, enum: ['Producto', 'Servicio'], required: true },
  estado:      { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);