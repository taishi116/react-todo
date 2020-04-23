import { createStore, combineReducers } from 'redux';
import { todoListReducers, TodoListState } from './states/todoListState';

export type AppState = {
  todoList: TodoListState
};

const store = createStore(
  combineReducers<AppState>({
    todoList: todoListReducers
  })
);

export default store;
