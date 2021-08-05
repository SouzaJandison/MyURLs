import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Logon } from './views/Logon/index';
import { Register } from './views/Register/index';

export default function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
