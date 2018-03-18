import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { combineMainReducers, partialReducer } from './reducers/configure';
import * as SpeciesListReducer from './reducers/SpeciesListReducer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { MainState, initialMainState } from './state/MainState';
import { History } from 'history';
import App from './App';

const history: History = createHistory();
const middleware = routerMiddleware(history);

let store = createStore<MainState>(
    combineMainReducers([
        partialReducer(routerReducer),
        SpeciesListReducer.loadingReducer,
        SpeciesListReducer.fetchedReducer
    ]),
    initialMainState,
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
