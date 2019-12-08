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
import DonorOverview from './components/DonorOverview';
import TokenContext, { useTokenState } from './contexts/TokenContext';
import { withCookies } from 'react-cookie';
import AddDonor from "./components/AddDonor";

const App = ({ cookies }) => {
  const [token, setToken, unsetToken] = useTokenState(cookies);
  const tokenState = { token, setToken, unsetToken }

  return (
    <TokenContext.Provider value={ tokenState }>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path='/' component={DonorRecords}/>
          <Route path="/donation-records" component={DonationRecords}/>
          <Route path="/upload-records" component={UploadRecords}/>
          <Route path="/donor-record" component={DonorOverview}/>
          <Route path="/donors/:id/donations" component={DonorOverview} />
          <Route path="/add-donor" component={AddDonor} />
        </Switch>
      </Router>
    </TokenContext.Provider>
  );
};

export default withCookies(App);
