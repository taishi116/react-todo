import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hogeActions } from '../actions/hogeAction';

export interface HogeState {
  name: string;
  email: string;
}

const initialState: HogeState = {
  name: '',
  email: ''
};

export const hogeReducer = reducerWithInitialState(initialState)
  .case(hogeActions.updateName, (state, name) => {
    return { ...state, name };
  })
  .case(hogeActions.updateEmail, (state, email) => {
    return { ...state, email };
  });