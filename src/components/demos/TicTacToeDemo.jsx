import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
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
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Tic-Tac-Toe Game</h3>
        <p className="text-gray-600">Classic two-player game built with React</p>
      </div>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default TicTacToeDemo;