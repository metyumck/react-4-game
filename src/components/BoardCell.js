import React from 'react';
import Rebase from 're-base';

class BoardCell extends React.Component {

  validateMove() {
    //get the cell underneath
    var cellU;
    this.base.fetch('/boards/' + this.props.board + '/board/' + (parseInt(this.props.cellRow) + 1) + '/column' + this.props.cellColumn, {
      context: this,
      then(data) {
        cellU = data;
      }
    })

    //check the cellOwner is not 1 or 2
    //check that the circle beneath is not equal to 0
    if (this.props.cellOwner == 0 && this.props.cellRow == 5) {
      return true;
    } else if (this.props.cellOwner == 0 && cellU == 1 || cellU == 2) {
      return true
    }

    return false;

    
  }

  handleClick(e) {
    e.preventDefault();
    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');
    if (this.validateMove()) {
      
      this.base.post('/boards/' + this.props.board + '/board/' + this.props.cellRow + '/column' + this.props.cellColumn, {
        data: 1
      })
    }
  }
 
  render() {
    var classNames = 'cell owner' + this.props.cellOwner;
    return (
      <span className={classNames} onClick={this.handleClick.bind(this)}></span>
    );
  }

}

export default BoardCell;