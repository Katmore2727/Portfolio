import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

// Game modes
const GAME_MODES = {
  SELECT: 'select',
  VS_PLAYER: 'vsPlayer',
  VS_COMPUTER: 'vsComputer'
};

// Square component
function Square(props) {
  return (
    <button 
      className="w-16 h-16 bg-white border border-gray-300 text-2xl font-bold text-blue-600 hover:bg-blue-50 transition-colors" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

// Board component
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // Computer move using minimax algorithm
  computerMove() {
    const squares = this.state.squares.slice();
    const availableMoves = squares.map((square, index) => square === null ? index : null).filter(move => move !== null);
    
    if (availableMoves.length === 0) return;

    // Try to win first
    for (let move of availableMoves) {
      const squaresCopy = squares.slice();
      squaresCopy[move] = 'O';
      if (calculateWinner(squaresCopy) === 'O') {
        this.makeMove(move);
        return;
      }
    }

    // Block player's winning move
    for (let move of availableMoves) {
      const squaresCopy = squares.slice();
      squaresCopy[move] = 'X';
      if (calculateWinner(squaresCopy) === 'X') {
        this.makeMove(move);
        return;
      }
    }

    // Take center if available
    if (squares[4] === null) {
      this.makeMove(4);
      return;
    }

    // Take a random corner or side
    const corners = [0, 2, 6, 8].filter(corner => squares[corner] === null);
    if (corners.length > 0) {
      this.makeMove(corners[Math.floor(Math.random() * corners.length)]);
      return;
    }

    // Take any available move
    this.makeMove(availableMoves[Math.floor(Math.random() * availableMoves.length)]);
  }

  makeMove(i, callback = null) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    }, callback);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Make player's move and then check game state
    this.makeMove(i, () => {
      const currentSquares = this.state.squares;
      const winner = calculateWinner(currentSquares);
      const isBoardFull = !currentSquares.includes(null);
      
      // Only make computer move if game isn't over
      if (!winner && !isBoardFull && this.props.gameMode === GAME_MODES.VS_COMPUTER) {
        setTimeout(() => this.computerMove(), 500);
      }
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.squares.every(square => square !== null)) {
      status = 'Game Draw!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="mb-4 text-lg font-semibold text-gray-700">{status}</div>
        <div className="grid grid-cols-3 gap-1 max-w-fit">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Helper function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Main TicTacToe Demo component
const TicTacToeDemo = () => {
  const [gameMode, setGameMode] = useState(GAME_MODES.SELECT);
  const [key, setKey] = useState(0); // Used to reset the game

  const resetGame = (mode) => {
    setGameMode(mode);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tic-Tac-Toe Game</h3>
        <p className="text-gray-600 mb-4">Choose your game mode</p>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => resetGame(GAME_MODES.VS_PLAYER)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md
              ${gameMode === GAME_MODES.VS_PLAYER 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 hover:bg-blue-50'}`}
          >
            Play vs Player
          </button>
          <button
            onClick={() => resetGame(GAME_MODES.VS_COMPUTER)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md
              ${gameMode === GAME_MODES.VS_COMPUTER 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 hover:bg-blue-50'}`}
          >
            Play vs Computer
          </button>
        </div>
      </div>
      
      {gameMode !== GAME_MODES.SELECT && (
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Board key={key} gameMode={gameMode} />
          </div>
        </div>
      )}

      {gameMode === GAME_MODES.SELECT && (
        <div className="text-center text-gray-600">
          Select a game mode to start playing!
        </div>
      )}
    </div>
  );
};

export default TicTacToeDemo;