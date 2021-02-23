import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    'ciclo',
    '/ciclo',
    'cicloForm',
    '/ciclos'
);

export default handleActions(reducers, initialState)