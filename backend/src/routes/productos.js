const router = require('express').Router();
const Producto = require('../models/Producto');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
  try {
    const data = await Producto.find({ estado: true });
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const data = await Producto.create(req.body);
    res.status(201).json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const data = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, { estado: false });
    res.json({ msg: 'Producto desactivado' });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

module.exports = router;