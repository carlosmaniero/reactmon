import * as React from 'react';
import Layout from './components/Layout/index';
import { Route, Switch } from 'react-router';
import HomePage from './components/Pages/HomePage';
import NotFoundPage from './components/Pages/NotFoundPage';

export default class App extends React.Component {
    render () {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route exact={true} path="/" component={HomePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}