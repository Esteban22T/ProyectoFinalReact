require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth',        require('./routes/auth'));
app.use('/api/clientes',    require('./routes/clientes'));
app.use('/api/proveedores', require('./routes/proveedores'));
app.use('/api/productos',   require('./routes/productos'));
app.use('/api/compras',     require('./routes/compras'));
app.use('/api/ventas',      require('./routes/ventas'));

app.listen(process.env.PORT, () =>
  console.log(`Servidor en puerto ${process.env.PORT}`)
);