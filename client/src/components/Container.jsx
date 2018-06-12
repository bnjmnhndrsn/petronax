import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexContainer from './IndexContainer';
import ExplorerContainer from './ExplorerContainer';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={IndexContainer} />
                    <Route path="/explore" component={ExplorerContainer} />
                </Switch>
            </Router>
        );
    }
}

export default App;
