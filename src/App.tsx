import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import { getPath } from './router-paths';
import Home from './routes/Home';
import ViewCharacter from './routes/ViewCharacter';

export default class App extends Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={getPath('home')} render={() => <Home></Home>} />
            <Route
              exact
              path={getPath('viewCharacter', ':character')}
              render={props => <ViewCharacter {...props} />}
            />
            <Route render={() => <div>Page not found!</div>} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
