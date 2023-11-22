import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import PrivateHomePage from './PrivateHomePage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={PrivateHomePage} />
                {/* Add more routes as needed */}
            </Switch>
        </Router>
    );
};

export default App;
