const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  fecha:      { type: Date, default: Date.now },
  total:      { type: Number, required: true },
  estado:     { type: String, enum: ['activa', 'anulada'], default: 'activa' },
  productos: [{
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    nombre:      String,
    precio:      Number,
    cantidad:    { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Venta', ventaSchema);