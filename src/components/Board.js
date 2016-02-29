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


  //deprecated in favour of a more simple method
  testPlayerViewOld() {
    
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