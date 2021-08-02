import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './views/Logon';

export default function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
      </Switch>
    </BrowserRouter>
  );
}
