const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  proveedor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  fecha:        { type: Date, default: Date.now },
  total:        { type: Number, required: true },
  estado:       { type: String, enum: ['activa', 'anulada'], default: 'activa' },
  productos: [{
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    nombre:      String,
    precio:      Number,
    cantidad:    { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Compra', compraSchema);