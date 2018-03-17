import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import MainState from './state/MainState';

const history = createHistory();
const middleware = routerMiddleware(history);

let store = createStore<MainState>(
    combineReducers({routerReducer}),
    {},
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Layout/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
