import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignupRoute from './views/signup/SignupRoute';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/signup" component={SignupRoute} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
