import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { todoListActions } from '../actions/todoListAction';
import { TodoList } from '../types';
// src <= Project Root
//  |--- actions
//  |--- api
//    |-- getTodoList.ts     from "../api/getTodoList"
//  |--- components
//  |--- containers
//  |--- states
//    |-- todoListState.ts
//    |-- hoge.ts            from "hoge"
//    |-- huga
//       |-- piyo.ts         -- from "../../api/getTodoList"
//  |--- App.css             from "../App"
//  |--- App.tsx
//  |--- types.ts
//  |--- etc...

export type TodoListState = TodoList;

// type TodoListState = Todo[]
export const todoListReducers = reducerWithInitialState<TodoListState>([])
  .case(todoListActions.start, (state) => {
    return state;
  })
  .case(todoListActions.failed, (state) => {
    return state;
  })
  // Store(state)に取得したTodoListを反映させる
  //     Type '{ data: TodoList; }' is missing the following properties from type 'Todo[]': length, pop, push, concat, and 28 more.ts(2345)
// --------------------------------------------------------------
// payload: {
//     params: {};
// } & {
//     result: {
//         data: TodoList;
//     };
// }
// --------------------------------------------------------------
//   'Todo[]' の型に '{ data: TodoList; }' ←を割り当てることができません

// 'Todo[]' = TodoListState <= これが返り値に欲しい
  .case(todoListActions.done, (state, payload) => {
    //   {}
    return payload.result.data;
  })
  