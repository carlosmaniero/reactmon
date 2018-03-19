import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import './index.css';
import { combineMainReducers, partialReducer } from './reducers/configure';
import * as SpeciesListReducer from './reducers/SpeciesListReducer';
import registerServiceWorker from './registerServiceWorker';
import { initialMainState, MainState } from './state/MainState';

const history: History = createHistory();
const middleware = routerMiddleware(history);

let store = createStore<MainState>(
    combineMainReducers([
        partialReducer(routerReducer),
        SpeciesListReducer.loadingReducer,
        SpeciesListReducer.fetchedReducer,
        SpeciesListReducer.fetchErrorReducer
    ]),
    initialMainState,
    applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
