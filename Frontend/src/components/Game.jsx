import React, { useState } from 'react';
import axios from 'axios';
import stoneImg from '../assets/images/Stone.png';
import paperImg from '../assets/images/Paper.png';
import scissorsImg from '../assets/images/Scissors.png';
import './Game.css';  

function Game() {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [game, setGame] = useState(null);
    const [round, setRound] = useState(0);
    const [choices, setChoices] = useState({ player1Choice: '', player2Choice: '' });
    const [currentPlayer, setCurrentPlayer] = useState(1); 

    const startGame = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/start-game', { player1, player2 });
            setGame(response.data);
            setRound(0);
            setChoices({ player1Choice: '', player2Choice: '' });
            setCurrentPlayer(1); 
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    const handleChoice = (choice) => {
        if (currentPlayer === 1) {
            setChoices({ ...choices, player1Choice: choice });
            setCurrentPlayer(2); 
        } else {
            setChoices({ ...choices, player2Choice: choice });
        }
    };

    const playRound = async () => {
        if (choices.player1Choice && choices.player2Choice) {
            try {
                const response = await axios.post('http://localhost:5000/api/play-round', {
                    gameId: game._id,
                    player1Choice: choices.player1Choice,
                    player2Choice: choices.player2Choice
                });
                setGame(response.data);
                setRound(round + 1);
                setChoices({ player1Choice: '', player2Choice: '' });
                setCurrentPlayer(1); 
            } catch (error) {
                console.error("Error playing round:", error);
            }
        }
    };

    if (!game) {
        return (
            <div className="game-container">
                <h2 className="game-title">Start New Game</h2>
                <input 
                    className="player-input" 
                    type="text" 
                    placeholder="Player 1" 
                    value={player1} 
                    onChange={e => setPlayer1(e.target.value)} 
                />
                <input 
                    className="player-input" 
                    type="text" 
                    placeholder="Player 2" 
                    value={player2} 
                    onChange={e => setPlayer2(e.target.value)} 
                />
                <button className="game-button" onClick={startGame}>Start Game</button>
            </div>
        );
    }

    return (
        <div className="game-container">
            <h2 className="game-title">Round {round + 1}</h2>
            <div className="choices-container">
                <div className="player-section">
                    <h3>{player1}'s Turn</h3>
                    <img 
                        src={stoneImg} 
                        alt="Stone" 
                        onClick={() => currentPlayer === 1 && handleChoice('stone')} 
                        className={`choice-image ${choices.player1Choice === 'stone' ? 'selected' : ''}`} 
                    />
                    <img 
                        src={paperImg} 
                        alt="Paper" 
                        onClick={() => currentPlayer === 1 && handleChoice('paper')} 
                        className={`choice-image ${choices.player1Choice === 'paper' ? 'selected' : ''}`} 
                    />
                    <img 
                        src={scissorsImg} 
                        alt="Scissors" 
                        onClick={() => currentPlayer === 1 && handleChoice('scissors')} 
                        className={`choice-image ${choices.player1Choice === 'scissors' ? 'selected' : ''}`} 
                    />
                </div>
                
                <div className="player-section">
                    <h3>{player2}'s Turn</h3>
                    <img 
                        src={stoneImg} 
                        alt="Stone" 
                        onClick={() => currentPlayer === 2 && handleChoice('stone')} 
                        className={`choice-image ${choices.player2Choice === 'stone' ? 'selected' : ''}`} 
                    />
                    <img 
                        src={paperImg} 
                        alt="Paper" 
                        onClick={() => currentPlayer === 2 && handleChoice('paper')} 
                        className={`choice-image ${choices.player2Choice === 'paper' ? 'selected' : ''}`} 
                    />
                    <img 
                        src={scissorsImg} 
                        alt="Scissors" 
                        onClick={() => currentPlayer === 2 && handleChoice('scissors')} 
                        className={`choice-image ${choices.player2Choice === 'scissors' ? 'selected' : ''}`} 
                    />
                </div>
            </div>
            <button className="game-button" onClick={playRound} disabled={!choices.player1Choice || !choices.player2Choice}>Play Round</button>
            <h3 className="game-score">Score: {game.rounds.join(', ')}</h3>
            {game.winner && <h3 className="game-winner">Winner: {game.winner}</h3>}
        </div>
    );
}

export default Game;
