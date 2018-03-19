import { connect, Dispatch } from 'react-redux';
import { fetchServiceAction, SpeciesListActions } from '../../../actions/SpeciesList';
import { MainState } from '../../../state/MainState';
import {
    SpeciesListController,
    SpeciesListControllerActions,
    SpeciesListControllerProps,
    SpeciesListControllerState
} from './controller';

function mapStateToProps({speciesListState}: MainState): SpeciesListControllerState {
    return speciesListState;
}

function mapDispatchToProps(dispatch: Dispatch<SpeciesListActions>): SpeciesListControllerActions {
    return {
        fetchService: () => {
            fetchServiceAction(dispatch);
        }
    };
}

function mapMerge(data: SpeciesListControllerState, actions: SpeciesListControllerActions): SpeciesListControllerProps {
    return {...data, ...actions};
}

export const SpeciesList = connect(mapStateToProps, mapDispatchToProps, mapMerge)(SpeciesListController);