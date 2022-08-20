'use strict'

//Import Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require ('cors');

//Import the Routes//
const contestantRoutes = require('../src/routes/contestant.routes');

//APP -> HTTP Server (Express)
const app = express(); //Create Express Server

/*----- SERVER CONFIGURATION ---------*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet({}));
app.use(cors());

app.use('/contestant', contestantRoutes);

//Export//
module.exports = app;