import React from 'react';
import ReactDOM from 'react-dom';
import store, {history} from './store/';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Redirect, Route, Switch} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.scss';

import Chats from "./pages/Chats";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/chats" component={Chats}/>
          <Redirect to="/chats"/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
