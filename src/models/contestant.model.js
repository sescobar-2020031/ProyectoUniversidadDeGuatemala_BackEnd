'use strict'

const mongoose = require('mongoose');

const contestantSchema = mongoose.Schema({
    carnet: String,
    fullName: String,
    address: String,
    gender: String,
    phone: String,
    birthDate: Date,
    studentCareer: String,
    poetryGenre: String,
    enrollmentDate: Date
});

module.exports = mongoose.model('Contestant', contestantSchema);