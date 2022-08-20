'use strict'

const Contestant = require('../models/contestant.model');

exports.testContestant = (req, res) => {
    return res.send({ message: 'Test is running in Contestant' })
}

exports.saveContestant = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            carnet: params.carnet,
            fullname: params.fullname,
            address: params.address,
            gender: params.gender,
            phone: params.phone,
            birthDate: params.birthDate,
            studentCareer: params.studentCareer,
            poetryGenre: params.poetryGenre,
            enrollmentDate: params.enrollmentDate
        }
        let keys = Object.keys(data), msg = '';
        for (let key of keys) {
            if (data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `The ${key} is required\n`;
        }
        if (msg.trim()) return res.status(400).send(msg);
        let contestant = new Contestant(data);
        await contestant.save();
        return res.send({ message: 'Contestant Save Successfully', contestant });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving contestant' });
    }
}


exports.getContestants = async (req,res) => {
    try{
        const participants = await Contestant.find();
        if(participants.length === 0) return res.status(400).send({message: 'There are no participants'});
        return res.send({message: 'Found participants: ', participants})
    }catch(er){
        console.log(err);
        return res.status(500).send({err, message: 'Error getting contestants'})
    }
}

exports.getContestant = async (req,res) => {
    try{
        const participationId = req.params.id;
        const contestantParticipation = await Contestant.findOne({_id: participationId});
        if(!contestantParticipation) return res.status(400).send({message: 'Participation not found'});
        return res.send({message: 'Found participant: ', contestantParticipation})
    }catch(err){
        console.log(err);
        return res.status(500).send({ err, message: 'Error getting contestant'})
    }
}