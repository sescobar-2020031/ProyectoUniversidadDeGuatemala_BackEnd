'use strict'

const Contestant = require('../models/contestant.model');

exports.testContestant = (req, res) => {
    return res.send({ message: 'El test en -Contestant- es funcional' });
}

exports.saveContestant = async (req, res) => {
    try {
        const params = req.body;

        /** Data Obligatoria */
        const data = {
            carnet: params.carnet,
            fullName: params.fullname,
            address: params.address,
            gender: params.gender,
            phone: params.phone,
            birthDate: params.birthDate,
            studentCareer: params.studentCareer,
            poetryGenre: params.poetryGenre,
            enrollmentDate: new Date()
        };

        /** Valida que venga la data obligatoria */
        let keys = Object.keys(data), msg = '';
        for (let key of keys) {
            if (data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `El campo ${key} es requerido\n`;
        }
        if (msg.trim()) return res.status(400).send(msg);

        /** VALIDACIONES DEL CARNET */

        /** Valida que el carnet tenga 6 caracteres */
        const lengthCarnet = data.carnet.length;
        if (lengthCarnet !== 6) return res.status(400).send({ message: 'El carnet tiene que tener una longitud de 6 dígitos' });

        /** Valida que el carnet no contenga 0 */
        for (let letter of data.carnet) {
            if (letter == 0) return res.status(400).send({ message: 'El carnet no debe de contener 0' });
        }

        /** Valida que el primer caracter sea A o a*/
        if (data.carnet[0] !== 'A' && data.carnet[0] !== 'a') {
            return res.status(400).send({ message: 'El carnet debe de contener una "A" o "a" en el primer carácter' });
        }

        /** Valida que el tercer caracter sea 5 */
        if (data.carnet[2] != 5) {
            return res.status(400).send({ message: 'El carnet debe de contener un "5" en el tercer carácter' });
        }

        /** Valida que el ultimo caracter sea 1,3 o 9 */
        const lastCharacter = data.carnet.charAt(lengthCarnet - 1);
        if (lastCharacter != 1 && lastCharacter != 3 && lastCharacter != 9) {
            return res.status(400).send({ message: 'El carnet debe de contener un "1","3" o "9" en el último carácter' });
        }

        /** Valida que el concursante sea mayor a 17 años */
        /** Fechas Actuales */
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        const currentWeekDay = currentDate.getDay();

        /** Fechas del cumpleaños */
        const birthDate = new Date(data.birthDate);
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate() + 1;

        /** Cálculo */
        let age = currentYear - birthYear;
        if (currentMonth < birthMonth) {
            age--;
        } else if (currentMonth == birthMonth) {
            if (currentDay < birthDay) {
                age--;
            }
        }
        if (age < 18) return res.status(400).send({ message: 'Tienes que ser mayor de 17 años para participar' });
        data.age = age;

        /** Validaciones de Fechas para Declamar */
        let dayToDeclaim;
        if (lastCharacter == '1' && data.poetryGenre === 'Dramatico') {
            if (currentWeekDay == 5) dayToDeclaim = currentDay + 10;
            else if (currentWeekDay == 6) dayToDeclaim = currentDay + 9;
            else dayToDeclaim = currentDay + 8;
            data.declamationDate = new Date(currentDate).setDate(dayToDeclaim);
        } else if (lastCharacter == '3' && data.poetryGenre == 'Epico') {
            dayToDeclaim = new Date(currentYear, currentMonth + 1, 0).getDate();
            data.declamationDate = new Date(currentDate).setDate(dayToDeclaim);
        } else {
            if (currentWeekDay == 0) dayToDeclaim = currentDay + 5;
            else if (currentWeekDay == 1) dayToDeclaim = currentDay + 4; 
            else if (currentWeekDay == 2) dayToDeclaim = currentDay + 3;
            else if (currentWeekDay == 3) dayToDeclaim = currentDay + 2;
            else if (currentWeekDay == 4) dayToDeclaim = currentDay + 1;
            else if (currentWeekDay == 5) dayToDeclaim = currentDay + 7;
            else dayToDeclaim = currentDay + 6;
            data.declamationDate = new Date(currentDate).setDate(dayToDeclaim);
        }

        let contestant = new Contestant(data);
        await contestant.save();
        return res.send({ message: 'Inscrito Exitosamente', contestant });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error inscribiendote' });
    }
}


exports.getContestants = async (req, res) => {
    try {
        const participants = await Contestant.find();
        if (participants.length === 0) return res.status(400).send({ message: 'No se encontraron participantes' });
        return res.send({ message: 'Participantes encontrados: ', participants });
    } catch (er) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participantes' });
    }
}

exports.getContestant = async (req, res) => {
    try {
        const participationId = req.params.id;
        const contestantParticipation = await Contestant.findOne({ _id: participationId });
        if (!contestantParticipation) return res.status(400).send({ message: 'Participante no encontrado' });
        return res.send({ message: 'Participante encontrado: ', contestantParticipation });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error obteniendo participante' });
    }
}