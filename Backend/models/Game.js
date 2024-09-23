const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    player1: String,
    player2: String,
    rounds: [String], 
    winner: String,  
});

module.exports = mongoose.model('Game', GameSchema);
