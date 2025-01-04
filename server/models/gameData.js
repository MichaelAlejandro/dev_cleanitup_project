let mongoose = require('mongoose');

let gameDataSchema = new Schema({
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

let GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;