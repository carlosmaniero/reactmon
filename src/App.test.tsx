import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import createMockStore from 'redux-mock-store';
import App from './App';
import HomePage from './components/Pages/HomePage';
import NotFoundPage from './components/Pages/NotFoundPage';
import { initialMainState } from './state/MainState';

describe('routes', () => {
    let wrapper;
    const store = createMockStore()(initialMainState);

    it('is in the home page when the route is "/', () => {
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
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
                <MemoryRouter initialEntries={['/digimon']}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find(NotFoundPage).length).toEqual(1);
    });
});