let mongoose = require('mongoose');

let gameDataSchema = new mongoose.Schema({
    player: { 
        type: Schema.Types.ObjectId, 
        ref: 'Player',
        required: true 
    },
    bestScore: { 
        type: Number, 
        default: 0 
    },
    lastScore: { 
        type: Number, 
        default: 0 
    },
    playedAt: { 
        type: Date, 
        default: Date.now 
    }
});

let GameData = new mongoose.model('GameData', gameDataSchema);

module.exports = GameData;