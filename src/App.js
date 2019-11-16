import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import DonorRecords from './components/DonorRecords';
import DonationRecords from './components/DonationRecords';
import UploadRecords from './components/UploadRecords';

const App = () => {
  return (
      <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path='/' component={DonorRecords}/>
        <Route path="/donation-records" component={DonationRecords}/>
        <Route path="/upload-records" component={UploadRecords}/>
      </Switch>
    </Router>
  );
}

export default App;
