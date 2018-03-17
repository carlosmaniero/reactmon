import { mount } from 'enzyme';
import App from './App';
import * as React from 'react';
import HomePage from './components/Pages/HomePage';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './components/Pages/NotFoundPage';

describe('routes', () => {
    let wrapper;

    it('is in the home page when the route is "/', () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App/>
            </MemoryRouter>
        );

        expect(wrapper.find(NotFoundPage).length).toEqual(0);
        expect(wrapper.find(HomePage).length).toEqual(1);
    });

    it('is in the not found page given any other page', () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ '/digimon' ]}>
                <App/>
            </MemoryRouter>
        );

        expect(wrapper.find(NotFoundPage).length).toEqual(1);
    });
});