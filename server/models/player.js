let mongoose = require('mongoose');

let playerSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

let Player = new mongoose.model('Player', playerSchema);

module.exports = Player;