const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

module.exports = (app) => {
    app.use(cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        optionsSuccessStatus: 200
    }));
    app.use(compression());
    app.use(express.json());
    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
}
