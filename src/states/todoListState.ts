import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { todoListActions } from '../actions/todoListAction';
import { TodoList } from '../types';

// type alias
export type TodoListState = TodoList;

// type TodoListState = Todo[]
export const todoListReducers = reducerWithInitialState<TodoListState>([])
  .case(todoListActions.fetchStart, (state) => {
    return state;
  })
  .case(todoListActions.fetchFailed, (state) => {
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
  .case(todoListActions.fetchDone, (state, payload) => {
    //   {}
    return payload.result.data;
  })
  .case(todoListActions.addStart, (state) => {
    return state;
  })
  .case(todoListActions.addFailed, (state) => {
    return state;
  })
  .case(todoListActions.addDone, (state, payload) => {
    //  TodoListState = TodoList = Todo[]

    // payload.result.data: Todo
    return state.concat(payload.result.data);
  })
  .case(todoListActions.deleteStart, (state) => {
    return state;
  })
  .case(todoListActions.deleteFailed, (state) => {
    return state;
  })
  .case(todoListActions.deleteDone, (state, payload) => {
    return state.filter(x => x.id !== payload.result.id);
  })

  .case(todoListActions.updateStart, (state) => {
    return state;
  })
  .case(todoListActions.updateFailed, (state) => {
    return state;
  })
  .case(todoListActions.updateDone, (state, payload) => {
    return state.map(x => x.id === payload.result.data.id ? payload.result.data : x);
  })

// StoreのStateが「Todoの配列」で管理してる
// Reducer, 元々のStateとActionを受け取って「新しいStateを返却する」
// Reducerの返り値 = 新しいState
