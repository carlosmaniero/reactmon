import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import * as React from 'react';
import HomePage from './components/Pages/HomePage';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './components/Pages/NotFoundPage';
import { initialMainState } from './state/MainState';
import createMockStore from 'redux-mock-store';

describe('routes', () => {
    let wrapper;
    const store = createMockStore()(initialMainState);

    it('is in the home page when the route is "/', () => {
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ '/' ]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find(NotFoundPage).length).toEqual(0);
        expect(wrapper.find(HomePage).length).toEqual(1);
    });

    it('is in the not found page given any other page', () => {
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ '/digimon' ]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find(NotFoundPage).length).toEqual(1);
    });
});