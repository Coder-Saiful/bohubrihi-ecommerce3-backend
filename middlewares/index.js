const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

module.exports = (app) => {
    app.use(cors({
        origin: [process.env.LOCAL_URL, process.env.FRONTEND_URL],
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }));
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
}
