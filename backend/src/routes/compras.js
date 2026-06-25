const router = require('express').Router();
const Compra = require('../models/Compra');
const Producto = require('../models/Producto');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
  try {
    const data = await Compra.find().populate('proveedor_id', 'nombre apellido');
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const compra = await Compra.create(req.body);
    for (const item of req.body.productos) {
      await Producto.findByIdAndUpdate(item.producto_id, {
        $inc: { stock: item.cantidad }
      });
    }
    res.status(201).json(compra);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.put('/anular/:id', auth, async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) return res.status(404).json({ msg: 'Compra no encontrada' });
    if (compra.estado === 'anulada') return res.status(400).json({ msg: 'Ya está anulada' });

    for (const item of compra.productos) {
      await Producto.findByIdAndUpdate(item.producto_id, {
        $inc: { stock: -item.cantidad }
      });
    }
    compra.estado = 'anulada';
    await compra.save();
    res.json({ msg: 'Compra anulada', compra });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;