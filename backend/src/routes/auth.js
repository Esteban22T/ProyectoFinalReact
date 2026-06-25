const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, telefono, password, confirmar } = req.body;

    if (!nombre || !correo || !telefono || !password || !confirmar)
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });

    if (password !== confirmar)
      return res.status(400).json({ msg: 'Las contraseñas no coinciden' });

    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ msg: 'Correo ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const token6 = Math.floor(100000 + Math.random() * 900000).toString();

    await Usuario.create({ nombre, correo, telefono, password: hash, token: token6 });

    res.json({ msg: 'Registro exitoso. Usa este token para verificar tu cuenta:', token: token6 });
  } catch (err) {
    res.status(500).json({ msg: 'Error en servidor', error: err.message });
  }
});

router.post('/verificar', async (req, res) => {
  try {
    const { correo, token } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
    if (usuario.token !== token) return res.status(400).json({ msg: 'Token incorrecto' });

    usuario.verificado = true;
    usuario.token = null;
    await usuario.save();

    res.json({ msg: 'Cuenta verificada. Ya puedes iniciar sesión.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
    if (!usuario.verificado) return res.status(403).json({ msg: 'Cuenta no verificada' });
    if (!usuario.estado) return res.status(403).json({ msg: 'Cuenta desactivada' });

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const jwtToken = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: jwtToken, nombre: usuario.nombre });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

module.exports = router;