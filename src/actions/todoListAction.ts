import actionCreatorFactory from 'typescript-fsa';
import { TodoList, Todo } from '../types';
import updateTodo from '../api/todo/updateTodo';

const actionCreator = actionCreatorFactory();

const fetchSubmit =
  actionCreator.async<{}, { data: TodoList }, {}>('ACTIONS_FETCH_SUBMIT')

const addSubmit =
  actionCreator.async<{}, { data: Todo }, {}>('ACTIONS_ADD_SUBMIT')

const deleteSubmit =
  actionCreator.async<{}, { id: Todo["id"] }, {}>('ACTIONS_DELETE_SUBMIT')

const updateSubmit =
  actionCreator.async<{}, { data: Todo }, {}>('ACTIONS_UPDATE_SUBMIT')

//   async<Params, Result, Error = {}>(type: string, commonMeta?: Meta): AsyncActionCreators<Params, Result, Error>;
//   Params, Result, Error = {}

// addTodoも非同期
export const todoListActions = {
  fetchStart: fetchSubmit.started,
  fetchFailed: fetchSubmit.failed,
  fetchDone: fetchSubmit.done,

  addStart: addSubmit.started,
  addFailed: addSubmit.failed,
  addDone: addSubmit.done,

  deleteStart: deleteSubmit.started,
  deleteFailed: deleteSubmit.failed,
  deleteDone: deleteSubmit.done,

  updateStart: updateSubmit.started,
  updateFailed: updateSubmit.failed,
  updateDone: updateSubmit.done
}
