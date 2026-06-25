const router = require('express').Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
  try {
    const data = await Venta.find().populate('cliente_id', 'nombre apellido');
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    for (const item of req.body.productos) {
      const producto = await Producto.findById(item.producto_id);
      if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
      if (producto.tipo === 'Producto' && producto.stock < item.cantidad)
        return res.status(400).json({ msg: `Stock insuficiente para ${producto.nombre}` });
    }

    const venta = await Venta.create(req.body);

    for (const item of req.body.productos) {
      const producto = await Producto.findById(item.producto_id);
      if (producto.tipo === 'Producto') {
        await Producto.findByIdAndUpdate(item.producto_id, {
          $inc: { stock: -item.cantidad }
        });
      }
    }
    res.status(201).json(venta);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.put('/anular/:id', auth, async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) return res.status(404).json({ msg: 'Venta no encontrada' });
    if (venta.estado === 'anulada') return res.status(400).json({ msg: 'Ya está anulada' });

    for (const item of venta.productos) {
      const producto = await Producto.findById(item.producto_id);
      if (producto && producto.tipo === 'Producto') {
        await Producto.findByIdAndUpdate(item.producto_id, {
          $inc: { stock: item.cantidad }
        });
      }
    }
    venta.estado = 'anulada';
    await venta.save();
    res.json({ msg: 'Venta anulada', venta });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;