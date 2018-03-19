import { mount, shallow } from 'enzyme';
import * as React from 'react';
import Specie from '../../../domain/Specie';
import { SpeciesListEmptyStageView, SpeciesListLoadingView, SpeciesListView } from './view';
import { SpeciesListController, SpeciesListControllerStateOptions } from './controller';
import * as sinon from 'sinon';
import EmptyFunction = jest.EmptyFunction;

describe('<SpeciesListController>', () => {
    const emptyFetchService: EmptyFunction = () => null;

    describe('empty stage', () => {
        it('renders an empty stage given no data', () => {
            const wrapper = mount(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.Fetched}
                    fetchService={emptyFetchService}
                    list={[]}
                />
            );
            expect(wrapper.find(SpeciesListEmptyStageView).exists()).toBeTruthy();
        });

        it('hides the empty stage given an non empty species list', () => {
            const wrapper = mount(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.Fetched}
                    fetchService={emptyFetchService}
                    list={[new Specie(1, 'Bulbasaur')]}
                />
            );
            expect(wrapper.find(SpeciesListEmptyStageView).exists()).toBeFalsy();
        });
    });

    describe('Fetching data', () => {
        it('calls the fetchData method given the no fetch state', () => {
            const stubFetchService = sinon.stub();
            mount(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.NotFetched}
                    fetchService={stubFetchService}
                    list={[]}
                />
            );
            expect(stubFetchService.called).toBeTruthy();
        });

        describe('does not fetch data when', () => {
            it('is in the loading state', () => {
                const stubFetchService = sinon.stub();
                mount(
                    <SpeciesListController
                        state={SpeciesListControllerStateOptions.Loading}
                        fetchService={stubFetchService}
                        list={[]}
                    />
                );
                expect(stubFetchService.called).toBeFalsy();
            });

            it('is in the fetched state', () => {
                const stubFetchService = sinon.stub();
                mount(
                    <SpeciesListController
                        state={SpeciesListControllerStateOptions.Fetched}
                        fetchService={stubFetchService}
                        list={[]}
                    />
                );
                expect(stubFetchService.called).toBeFalsy();
            });
        });
    });

    describe('Show loading', () => {
        it('renders a loading message given the loading state', () => {
            const wrapper = shallow(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.Loading}
                    fetchService={emptyFetchService}
                    list={[]}
                />
            );
            expect(wrapper.find(SpeciesListLoadingView).exists()).toBeTruthy();
        });

        it('hide the loading message given a species list', () => {
            const wrapper = shallow(
                <SpeciesListController
                    state={SpeciesListControllerStateOptions.Fetched}
                    fetchService={emptyFetchService}
                    list={[]}
                />
            );
            expect(wrapper.find(SpeciesListLoadingView).exists()).toBeFalsy();
        });
    });

    describe('Show list', () => {
       it('renders the list when it is given', () => {
           const givenSpecies = [
               new Specie(1, 'Bubasauro')
           ];

           const wrapper = shallow(
               <SpeciesListController
                   state={SpeciesListControllerStateOptions.Fetched}
                   fetchService={emptyFetchService}
                   list={givenSpecies}
               />);
           expect(wrapper.find(SpeciesListView).prop('list')).toEqual(givenSpecies);
       });
    });
});