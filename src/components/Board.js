import React from 'react';
import Rebase from 're-base';
import IdentifierCreator from '../utility/IdentifierCreator';

import BoardCell from './BoardCell.js';
import ChooseColor from './ChooseColor.js';

class Board extends React.Component {
  
  constructor() {
    super();
    this.state = {
      board: [],
      playerView: 0,
      playerOneWins: false,
      playerTwoWins: false,
      boardEnabled: false

    }
  }

  componentDidMount() {
    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');
    this.base.syncState('/boards/' + this.props.params.boardId + '/board/', {
      context: this,
      state: 'board',
      asArray: true
    });

    var that = this;
    this.base.listenTo('/boards/' + this.props.params.boardId + '/lastCellTaken', {
      context: this,
      then(data) {
        if (data[0] == '1' && that.testWinConditions(data)) {
          that.setState({
            playerOneWins: true
          });
        } else if (data[0] == '2' && that.testWinConditions(data)) {
          that.setState({
            playerTwoWins: true
          });
        }
        
      }
    });
  }

  testWinConditions(lastCellTaken) {
    var player = parseInt(lastCellTaken[0]);
    var row = lastCellTaken[1] ? parseInt(lastCellTaken[1]) : 0 ;
    var column = lastCellTaken[2] ? parseInt(lastCellTaken[2]) : 0 ;

    //horizontal pattern, both ways
    var h1 = false;
    var h2 = false;

    //vertical pattern, one way because you can only put a coin on top
    var v1 = false;

    //diagonal patterns, four ways becaue you CAN put a coin at the bottom of a diagonal
    //d1 goes top to right, d2 top to left
    //d3 goes bottom to right, d2 bottom to left
    var d1 = false;
    var d2 = false;
    var d3 = false;
    var d4 = false;

    if (player != 0) {
      h1 = (this.state.board[row]['column' + column] == player
            && this.state.board[row]['column' + (column + 1)] == player
            && this.state.board[row]['column' + (column + 2)] == player
            && this.state.board[row]['column' + (column + 3)] == player);
      h2 = (this.state.board[row]['column' + column] == player
            && this.state.board[row]['column' + (column - 1)] == player
            && this.state.board[row]['column' + (column - 2)] == player
            && this.state.board[row]['column' + (column - 3)] == player);
      //Only check if all the indices are valid i.e. it will break if you try to check row index 6
      if (row < 3) {
        v1 = (this.state.board[row]['column' + column] == player
              && this.state.board[row + 1]['column' + (column)] == player
              && this.state.board[row + 2]['column' + (column)] == player
              && this.state.board[row + 3]['column' + (column)] == player);
        d1 = (this.state.board[row]['column' + column] == player
              && this.state.board[row + 1]['column' + (column + 1)] == player
              && this.state.board[row + 2]['column' + (column + 2)] == player
              && this.state.board[row + 3]['column' + (column + 3)] == player);
        d2 = (this.state.board[row]['column' + column] == player
              && this.state.board[row + 1]['column' + (column - 1)] == player
              && this.state.board[row + 2]['column' + (column - 2)] == player
              && this.state.board[row + 3]['column' + (column - 3)] == player);
      }

      if (row > 2) {
        d3 = (this.state.board[row]['column' + column] == player
              && this.state.board[row - 1]['column' + (column + 1)] == player
              && this.state.board[row - 2]['column' + (column + 2)] == player
              && this.state.board[row - 3]['column' + (column + 3)] == player);
        d4 = (this.state.board[row]['column' + column] == player
              && this.state.board[row - 1]['column' + (column - 1)] == player
              && this.state.board[row - 2]['column' + (column - 2)] == player
              && this.state.board[row - 3]['column' + (column - 3)] == player);
      }


    };
    
    console.log(h1,h2,v1,d1,d2,d3,d4);
    return h1 || h2 || v1 || d1 || d2 || d3 || d4;
  }


  //this needs some serious reworkage, shouldn't need to click to confirm player view
  testPlayerView() {
    var hash;
    var that = this;
    new IdentifierCreator().convertBrowserComponents(function (results) {
      hash = results;
      that.base.fetch('/boards/' + that.props.params.boardId + '/players/', {
        context: that,
        then(data) {
          if (hash.toString() == data.playerone) {
            that.setState({
              playerView: 1
            });
          } else if (hash.toString() == data.playertwo) {
            that.setState({
              playerView: 2
            });
          }
        }
      })
    }); 

  }

  getRow(row, index) {

    return (
      <div key={index} className='row' onClick={this.testPlayerView.bind(this)}>
        <BoardCell key={index + '1'} cellRow={index} cellOwner={row['column1']} cellColumn='1' board={this.props.params.boardId}/>
        <BoardCell key={index + '2'} cellRow={index} cellOwner={row['column2']} cellColumn='2' board={this.props.params.boardId}/>
        <BoardCell key={index + '3'} cellRow={index} cellOwner={row['column3']} cellColumn='3' board={this.props.params.boardId}/>
        <BoardCell key={index + '4'} cellRow={index} cellOwner={row['column4']} cellColumn='4' board={this.props.params.boardId}/>
        <BoardCell key={index + '5'} cellRow={index} cellOwner={row['column5']} cellColumn='5' board={this.props.params.boardId}/>
        <BoardCell key={index + '6'} cellRow={index} cellOwner={row['column6']} cellColumn='6' board={this.props.params.boardId}/>
        <BoardCell key={index + '7'} cellRow={index} cellOwner={row['column7']} cellColumn='7' board={this.props.params.boardId}/>
      </div>
    )
  }

  render() {
    var that = this;
    console.log(this.state.playerView);
    return (
      <div>
        {this.state.playerView != 0 ? <div className={this.state.playerView == 1 ? 'player-info pink' : 'player-info blue'}></div> : null}
        <div className="board-container">
          <ChooseColor boardid={this.props.params.boardId}/>
          <div className="react-4-board">
            {this.state.board.map(that.getRow, that)}
          </div>
        </div>
        <div className="modal">
          <input className="modal-state" checked={this.state.playerTwoWins ? "checked" : this.state.playerOneWins ? "checked" : null } id="modal-1" type="checkbox" />
          <div className="modal-fade-screen">
            <div className="modal-inner">
              <div className="modal-close" htmlFor="modal-1"></div>
              {this.state.playerTwoWins ? <h1 className="player-two-wins">Blue Player Wins</h1> : <h1 className="player-one-wins">Pink Player Wins</h1> }
              <p className="modal-intro">Want to play again? <a href={window.location.toString().split('/board/')[0]}>Click here!</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Board;