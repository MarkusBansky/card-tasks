import React from 'react';
import {Route, Switch, Router} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Edit from "./pages/Edit";
import history from './history';
import Display from "./pages/Display";
import './styles/App.scss';

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" component={Homepage} exact />
                <Route path="/:name" component={Display} />
                <Route path="/edit" component={Edit} />
            </Switch>
        </Router>
    );
}

export default App;
