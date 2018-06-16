import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import IndexContainer from './IndexContainer';
import ExplorerContainer from './ExplorerContainer';
import { actions as uiActions } from '../reducers/ui';

import './styles/Container.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={IndexContainer} />
                        <Route path="/explore" component={ExplorerContainer} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
