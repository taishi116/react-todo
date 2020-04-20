import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { hogeAsyncActions } from '../actions/hogeAsyncAction';

export interface HogeState {
  name: string;
  email: string;
}

const initialState: HogeState = {
  name: '',
  email: ''
};

export const hogeAsyncReducers = reducerWithInitialState(initialState)
  .case(hogeAsyncActions.startLogin, (state) => {
    return {name: '', email: ''}
  })
  .case(hogeAsyncActions.failedLogin, (state) => {
    return {name: '', email: ''}
  })
  .case(hogeAsyncActions.doneLogin, (state) => {
    return {name: '', email: ''}
  })