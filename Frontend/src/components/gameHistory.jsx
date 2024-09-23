import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.css';  

function GameHistory() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await axios.get('http://localhost:5000/api/games');
            setGames(response.data);
        };
        fetchGames();
    }, []);

    return (
        <div className="game-container">
            <h2 className="game-title">Game History</h2>
            <ul>
                {games.map((game, index) => (
                    <li key={index}>
                        {game.player1} vs {game.player2}: Winner - {game.winner}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GameHistory;
