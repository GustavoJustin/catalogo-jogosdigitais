const express = require('express');
const cors = require('cors');
const jogosRouter = require('./routes/jogos');
const favoritosRouter = require('./routes/favoritos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jogos', jogosRouter);
app.use('/favoritos', favoritosRouter);

module.exports = app;
