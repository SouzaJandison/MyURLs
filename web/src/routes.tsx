import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './views/Home/index';
import { Logon } from './views/Logon/index';
import { Register } from './views/Register/index';

export default function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
