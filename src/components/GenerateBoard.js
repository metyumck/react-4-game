import React from 'react';
import Rebase from 're-base';
import Link from 'react-router';


class GenerateBoard extends React.Component {
  
  constructor() {
    super();
    this.defaultBoard = [
      {
        column1: 0,
        column2: 0,
        column3: 0,
        column4: 0,
        column5: 0,
        column6: 0,
        column7: 0
      },
      {
        column1: 0,
        column2: 0,
        column3: 0,
        column4: 0,
        column5: 0,
        column6: 0,
        column7: 0
      },
      {
        column1: 0,
        column2: 0,
        column3: 0,
        column4: 0,
        column5: 0,
        column6: 0,
        column7: 0
      },
      {
        column1: 0,
        column2: 0,
        column3: 0,
        column4: 0,
        column5: 0,
        column6: 0,
        column7: 0
      },
      {
        column1: 0,
        column2: 0,
        column3: 0,
        column4: 0,
        column5: 0,
        column6: 0,
        column7: 0
      },
      {
        column1: 0,
        column2: 0,
        column3: 0,
        column4: 0,
        column5: 0,
        column6: 0,
        column7: 0
      }

    ]

  }


  componentWillMount() {
    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');
    this.state = {
      generatedBoard: undefined,
      boardLink: undefined,
      showButton: true
    };
  }

  handleClick(e) {
    e.preventDefault();
    var that = this;
    this.setState({generatedBoard: this.base.push('/boards', {
        data: {
          board: this.defaultBoard
        },
        then() {
          that.setLink();
        }
 
      })
    });

    
  }

  setLink() {
    this.setState({
      boardLink: window.location + 'board/' + this.state.generatedBoard.toString().split('boards/')[1]
    });
    this.setState({
      showButton: false
    });
  }

  render() {
    return (
      <div>
        <div className="generate">
          <h1>Make a Board</h1>
          <p>Click the button below to create a board,
             then send the link to the person you want to play with. Note:
             in order for the game to remember who you are, please play
             from the browser that you initially start playing on.</p>
          {this.state.showButton ? <button onClick={this.handleClick.bind(this)}>Make me a board!</button> : null }
          <br /><a href={this.state.boardLink}>{this.state.boardLink}</a>
        </div>
      </div>
    );
  }

}

export default GenerateBoard;