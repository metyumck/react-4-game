require('normalize.css');
require('styles/Main.scss');

import React from 'react';
import { render } from 'react-dom';
import { Router, Link, Route, browserHistory } from 'react-router';

import GenerateBoard from './GenerateBoard.js';
import Board from './Board.js';


class AppComponent extends React.Component {

  render() {
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        {this.props.children}
      </div>
    );
  }

}

render((
  <Router history={browserHistory}>
    <Route path="/" component={GenerateBoard} />
    <Route path="/board/:boardId" component={Board} />
  </Router>
), document.getElementById('app'));

AppComponent.defaultProps = {

};


export default AppComponent;
