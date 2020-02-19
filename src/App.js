import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignupRoute from './views/signup/SignupRoute';
import devConfigData from './config/dev/dsuDataConfig.json';
import prodConfigData from './config/prod/dsuDataConfig.json'

function App() {
  let configData = (process.env.NODE_ENV==='production')?prodConfigData:devConfigData;
  console.log(configData);
  return (
    <React.Fragment>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <Router>
        <Switch>
          <Route path="/signup" component={SignupRoute} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
