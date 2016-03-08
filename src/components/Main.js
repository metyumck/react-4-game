require('normalize.css');
require('styles/Main.scss');

import React from 'react';
import { render } from 'react-dom';
import { Router, Link, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import GenerateBoard from './GenerateBoard.js';
import Board from './Board.js';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


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
  <Router history={appHistory}>
    <Route path="/" component={GenerateBoard} />
    <Route path="/board/:boardId" component={Board} />
  </Router>
), document.getElementById('app'));

AppComponent.defaultProps = {

};


export default AppComponent;
