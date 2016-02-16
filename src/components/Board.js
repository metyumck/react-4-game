import React from 'react';
import Rebase from 're-base';

import BoardCell from './BoardCell.js';

class Board extends React.Component {
  
  constructor() {
    super();
    this.state = {
      board: []

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

  getRow(row, index) {

    return (
      <div key={index} className='row'>
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
    console.log(this.state.board);
    return (
      <div>
        <div>
          <p>Hi, you are looking at board: {this.props.params.boardId}</p>
          <div className="react-4-board">
            {this.state.board.map(that.getRow, that)}
          </div>
        </div>
      </div>
    );
  }

}

export default Board;