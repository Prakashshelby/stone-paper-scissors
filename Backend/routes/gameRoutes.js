const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.post('/start-game', async (req, res) => {
    const { player1, player2 } = req.body;
    const game = new Game({ player1, player2, rounds: [], winner: '' });
    await game.save();
    res.json(game);
});

router.post('/play-round', async (req, res) => {
    const { gameId, player1Choice, player2Choice } = req.body;
    const game = await Game.findById(gameId);

    const result = determineWinner(player1Choice, player2Choice);
    game.rounds.push(result);

    if (game.rounds.length === 6) {
        const player1Wins = game.rounds.filter(r => r === 'Player 1 wins').length;
        const player2Wins = game.rounds.filter(r => r === 'Player 2 wins').length;
        game.winner = player1Wins > player2Wins ? 'Player 1' : player2Wins > player1Wins ? 'Player 2' : 'Tie';
    }

    await game.save();
    res.json(game);
});

router.get('/games', async (req, res) => {
    const games = await Game.find();
    res.json(games);
});

const determineWinner = (p1, p2) => {
    if (p1 === p2) return 'Tie';
    if ((p1 === 'stone' && p2 === 'scissors') || (p1 === 'scissors' && p2 === 'paper') || (p1 === 'paper' && p2 === 'stone')) {
        return 'Player 1 wins';
    } else {
        return 'Player 2 wins';
    }
};

module.exports = router;
