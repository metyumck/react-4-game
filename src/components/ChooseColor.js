import React from 'react';
import Rebase from 're-base';
import IdentifierCreator from '../utility/IdentifierCreator';

class ChooseColor extends React.Component {
  
  constructor() {
    super();
    this.state = {
      linkSent: false,
      playerOneFP: undefined,
      playerTwoFP: undefined,
      showAlreadyChosenMessage: false
    }
  }

  componentDidMount() {
    this.base = Rebase.createClass('https://react-4-game.firebaseio.com');

    this.base.bindToState('/boards/' + this.props.boardid + '/linkSent', {
      context: this,
      state: 'linkSent'
    });

    this.base.bindToState('/boards/' + this.props.boardid + '/players/playertwo', {
      context: this,
      state: 'playerTwoFP'
    });

    this.base.bindToState('/boards/' + this.props.boardid + '/players/playerone', {
      context: this,
      state: 'playerOneFP'
    });
  }

  //this is a badly named function, consider revising
  handleLinkSentDoneClick(e) {
    e.preventDefault();

    this.base.post('/boards/' + this.props.boardid + '/linkSent', {
      data: true,
      then() {
        console.log('you have sent the link');
      }

    })
    
  }

  //The below functions could be optimised into just one function!!! let's keep it DRY
  handleBlueChoiceClick(e) {
    e.preventDefault();
    var that = this;
    var hash;
    new IdentifierCreator().convertBrowserComponents(function (results) {
      console.log("hash " + results);
      hash = results;
      if (hash == that.state.playerOneFP) {
        that.setState({
          showAlreadyChosenMessage:true
        });
        return;
      } else {
        that.base.post('/boards/' + that.props.boardid + '/players/playertwo', {
          data: hash,
          then() {
            if (that.state.playerTwoFP != undefined) {
              that.base.post('/boards/' + that.props.boardid + '/lockedToPlayer', {
                data: 1,
                then() {
                  console.log('game is live! pink player goes first');
                }
              });
            }
          }

        });
      }

    });
  }

  handlePinkChoiceClick(e) {
    e.preventDefault();
    var that = this;
    var hash;
    new IdentifierCreator().convertBrowserComponents(function (results) {
      console.log("hash " + results);
      hash = results;
      if (hash == that.state.playerTwoFP) {
        that.setState({
          showAlreadyChosenMessage:true
        });
        return;
      } else {
        that.base.post('/boards/' + that.props.boardid + '/players/playerone', {
          data: hash,
          then() {
            if (that.state.playerTwoFP != undefined) {
              that.base.post('/boards/' + that.props.boardid + '/lockedToPlayer', {
                data: 1,
                then() {
                  console.log('game is live! pink player goes first');
                }
              });
            }
          }

        });
      }

    });
    
  }

  render() {
    return (
      <div className={this.state.playerTwoFP && this.state.playerOneFP ? 'steps hide' : 'steps'}>	
        <div className="send">
          <h2 className={!this.state.linkSent ? "highlighted" : null}>Step 1</h2>
          <p>Send the link to a friend!</p>
          {this.state.linkSent ? <button className="done-button clicked">Link sent</button> : <button onClick={this.handleLinkSentDoneClick.bind(this)} className="done-button">I&apos;ve done this</button> }
        </div>
        <div className={this.state.linkSent ? 'choose' : 'choose hidden' }>
          <h2 className={this.state.linkSent ? "highlighted" : null}>Step 2</h2>
        	<p>Choose your colour! (Game starts when both players have chosen)</p>
          {!this.state.playerOneFP ? <span className="choice choice-pink" onClick={this.handlePinkChoiceClick.bind(this)}></span> : null }
          {!this.state.playerTwoFP ? <span className="choice choice-blue" onClick={this.handleBlueChoiceClick.bind(this)}></span> : null } 
          <p className={this.state.showAlreadyChosenMessage ? 'alert' : 'hide' }>You have already chosen a colour!</p>
        </div>
      </div>
    );
  }
}

export default ChooseColor;
