import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import DonorTable from './components/DonorTable';

const App = () => {
  return (
      <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/donortable">
          <DonorTable />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
