'use strict'

const express = require('express');
const api = express.Router();

const contestantController = require('../controllers/contestant.controller');

api.get('/testContestant', contestantController.testContestant);
api.post('/saveContestant', contestantController.saveContestant);
api.get('/getContestants', contestantController.getContestants);
api.get('/getContestant/:id', contestantController.getContestant);

module.exports = api;