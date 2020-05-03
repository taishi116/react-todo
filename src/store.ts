import { createStore, combineReducers } from 'redux';
import { todoListReducers, TodoListState } from './states/todoListState';
import middlewares from "./middlewares";

export type AppState = {
  todoList: TodoListState
};

const store = createStore(
  combineReducers<AppState>({
    todoList: todoListReducers
  }),
  middlewares
);

console.log(store);

export default store;


// この時点でコンソールを確認しても先程の出力と変わりは無く、console.log("store changed", store.getState()); の出力はまだ出ません。
// その理由はこのソースコードではまだstore を変更する処理は入っていないからです。
// また、dispatch された後、これまでのサンプルではreducer が呼ばれていましたがmiddleware を使う場合はmiddleware (今回の例ではlogger 関数)が呼ばれた後にreducer が呼ばれるように処理の最後にnext(action); を追加します。

// next()が呼ばれた時の処理の流れ
// +--------------+                        +--------------+               +----------------------+
// |  mapDispops  | -- dispatch(action)--> | logger       | -- next() --> | reducer(action)      |
// +--------------+                        +--------------+               +----------------------+