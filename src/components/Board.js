import React from 'react';
import Rebase from 're-base';
import FPJS2 from 'fingerprintjs2';

import BoardCell from './BoardCell.js';
import ChooseColor from './ChooseColor.js';

class Board extends React.Component {
  
  constructor() {
    super();
    this.state = {
      board: [],
      playerView: 0

    }
  }

  componentDidMount() {
    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');
    this.base.syncState('/boards/' + this.props.params.boardId + '/board/', {
      context: this,
      state: 'board',
      asArray: true
    });



  }

  testPlayerView() {
    //write a class that returns details from the players browser (details that don' change)
    //the has the. We want to simple be able to return 
    
  }


  //deprecated in favour of a more simple method
  testPlayerViewOld() {
    var hash;
    var that = this;
    new FPJS2().get(function (results, components) {
      hash = results;
      that.base.fetch('/boards/' + that.props.params.boardId + '/players/', {
        context: that,
        then(data) {
          if (hash == data.playerone) {
            that.setState({
              playerView: 1
            });
          } else if (hash == data.playertwo) {
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
      </div>
    );
  }

}

export default Board;