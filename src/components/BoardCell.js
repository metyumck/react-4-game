import React from 'react';
import Rebase from 're-base';
import IdentifierCreator from '../utility/IdentifierCreator';

class BoardCell extends React.Component {

  componentDidMount() {
    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');
  }

  handleClick(e) {
    e.preventDefault();
    //get the cell underneath
    var cellU;
    this.base.fetch('/boards/' + this.props.board + '/board/' + (parseInt(this.props.cellRow) + 1) + '/column' + this.props.cellColumn, {
      context: this,
      then(data) {
        cellU = data;
      }
    });

    var lockedToPlayer;
    this.base.fetch('/boards/' + this.props.board + '/lockedToPlayer', {
      context: this,
      then(data) {
        lockedToPlayer = data;
      }
    });
    
    var that = this;
    new IdentifierCreator().convertBrowserComponents(function (results) {
      var moverHash = results;
      that.base.fetch('/boards/' + that.props.board + '/players/', {
        context: that,
        then(data) {
          if (parseInt(data.playerone) == moverHash && lockedToPlayer == 1) {
            that.executeMove(true, 1, cellU);
          } else if (parseInt(data.playertwo) == moverHash && lockedToPlayer == 2) {
            that.executeMove(true, 2, cellU);
          } else {
            that.executeMove(false);
          }

          
        }
      });
      
    });
    

    
  }

  executeMove(moverCanMove, mover, cellU) {
    //check the cellOwner is not 1 or 2
    //check that the circle beneath is not equal to 0
    var that = this;

    if (this.props.cellOwner == 0 && (this.props.cellRow == 5 || (cellU == 1 || cellU == 2)) && moverCanMove) {
      this.base.post('/boards/' + this.props.board + '/board/' + this.props.cellRow + '/column' + this.props.cellColumn, {
        data: mover,
        then() {
          that.lockToPlayer(mover);
          that.updateLastMove(mover);
        }
      });
    } else {
      console.log("move was denied");
    }
    
  }

  lockToPlayer(mover) {
    var newLock = mover == 1 ? 2 : 1;
    this.base.post('/boards/' + this.props.board + '/lockedToPlayer', {
      data: newLock
    });

  }

  updateLastMove(mover) {
    this.base.post('/boards/' + this.props.board + '/lastCellTaken', {
      data: mover.toString() + this.props.cellRow + this.props.cellColumn
    });
  } 

  render() {
    var classNames = 'cell owner' + this.props.cellOwner;
    return (
      <span className={classNames} onClick={this.handleClick.bind(this)}></span>
    );
  }

}

export default BoardCell;