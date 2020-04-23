import actionCreatorFactory from 'typescript-fsa';
import { TodoList } from '../types';

const actionCreator = actionCreatorFactory();

const fetchSubmit =
  actionCreator.async<{}, { data: TodoList }, {}>('ACTIONS_SUBMIT')

//   async<Params, Result, Error = {}>(type: string, commonMeta?: Meta): AsyncActionCreators<Params, Result, Error>;
//   Params, Result, Error = {}


export const todoListActions = {
  start: fetchSubmit.started,
  failed: fetchSubmit.failed,
  done: fetchSubmit.done
}
