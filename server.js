require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./src/routes/pokemonRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', pokemonRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`
====================================
Servidor rodando:
http://localhost:${PORT}
====================================

Eu amo o senai 
    `);

});