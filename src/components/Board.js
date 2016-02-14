import React from 'react';
import Rebase from 're-base';

class Board extends React.Component {
  
  constructor() {
    super();
    this.state = {
      board: undefined

    }
  }

  componentDidMount() {

    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');
    this.base.bindToState('/board/' + this.props.params.boardId, {
      context: this,
      state: 'board',
      asArray: true
    });


  }

  render() {
    return (
      <div>
        <div>
          <p>Hi</p>
        </div>
      </div>
    );
  }

}

export default Board;