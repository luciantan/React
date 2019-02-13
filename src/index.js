import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {

//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }

//     render() {
//       return (
//         <button 
//           className="square" 
//           onClick = {() => this.props.onClick()}
//         >
//           {/* TODO */
//             this.props.value
//           }
//         </button>
//       );
//     }
//   }

  function Square(props) {
      return (
          <button className="square" onClick = {props.onClick}>
            {props.value}
          </button>
      );
  }

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
  
  class Board extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares : Array(9).fill(null),
    //         xIsNext : true,
    //     };
    // }

    // handleClick(i) {
    //     const mySquares = this.state.squares.slice();
    //     if (calculateWinner(mySquares) || mySquares[i]) {
    //         return;
    //     }
    //     mySquares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares : mySquares,
    //         xIsNext : !this.state.xIsNext,
    //     });

    //     //this.state.squares[i] = 'X'; //Line 42:  Do not mutate state directly. Use setState()  react/no-direct-mutation-state
    // }

    renderSquare(i) {
      return (
        <Square 
            value = {this.props.squares[i]} 
            onClick = {() => this.props.onClick(i)}
        />
      );
    }
  
    render() {

      // const winner = calculateWinner(this.state.squares);
    
      // let status;
      // if (winner) {
      //     status = 'Winner' + winner;
      // } else {
      //     status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }

      //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        history : [{
          squares : Array(9).fill(null),
        }]
        ,
        stepNumber : 0,
        xIsNext : true,
      };
    }

    handleClick(i) {
      const myHistory = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = myHistory[myHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history : myHistory.concat([{
          squares : squares,
        }]),
        stepNumber : myHistory.length,
        xIsNext : !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber : step,
        xIsNext : (step % 2) === 0,
      });
    }

    render() {

      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move # ' + move : 'Go to game start';
        return (
          <li key = {move}>
            <button onClick = {() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner; 
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'x' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  