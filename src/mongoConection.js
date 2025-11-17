// src/mongoConection.js
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_ADMIN;
//banananaaaa

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB conectado');
        return mongoose;
    })
    .catch(err => {
        console.error('Error conexión MongoDB:', err);
        process.exit(1);
    });

/*
Ejemplo de uso con Express (index.js):

const express = require('express');
const { connectMongo } = require('./src/mongoConection');

connectMongo().then(() => {
    const app = express();
    // middlewares, rutas, etc.
    app.listen(process.env.PORT || 3000, () => {
        console.log('Servidor escuchando');
    });
});
*/
