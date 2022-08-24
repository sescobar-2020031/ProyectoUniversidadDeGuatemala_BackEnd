'use strict'

const mongoose = require('mongoose');

const contestantSchema = mongoose.Schema({
    carnet: String,
    fullName: String,
    address: String,
    gender: String,
    phone: String,
    birthDate: Date,
    age: Number,
    studentCareer: String,
    poetryGenre: String,
    enrollmentDate: Date,
    declamationDate: Date
});

module.exports = mongoose.model('Contestant', contestantSchema);