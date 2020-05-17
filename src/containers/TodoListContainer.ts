import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { todoListActions } from '../actions/todoListAction';
import { Todo } from "../types";
import TodoList from '../components/TodoList';
import getTodoList from '../api/todo/getTodoList';
import addTodoToStorage from '../api/todo/addTodo';
import deleteTodo from '../api/todo/deleteTodo';
import updateTodo from '../api/todo/updateTodo';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTodoList: async () => {
    dispatch(todoListActions.fetchStart({}));
    const todoList = await getTodoList();
    const data = todoList.map<Todo>(x => ({ id: x.id, title: x.title, description: x.description, createdAt: x.created_at }));  
    const x = todoListActions.fetchDone({params: {}, result: { data } });
    console.log(x);
    dispatch(x);
  },

  addTodo: async (title: Todo["title"], description: Todo["description"]) => {
    const createdAt = new Date();
    dispatch(todoListActions.addStart({}));
    //   (alias) addTodoToStorage(todo: Pick<Todo, "description" | "title" | "createdAt">): Promise<void>
    // addTodoToStorage(todo: Omit<Todo, "id">);
    const x = await addTodoToStorage({
      title,
      description,
      created_at: createdAt
    });
    const data = { id: x.id, title: x.title, description: x.description, createdAt: x.created_at }
      dispatch(todoListActions.addDone({params: {}, result: { data }}));

  //   {
  //       params: {},
  //       result: {
  //-       newTodo: {
  //+          data: {
  //             title,
  //             description,
  //             createdAt
  //         }
  //       }
  //   }
  },
  deleteTodo: async (id: Todo["id"]) => {
    dispatch(todoListActions.deleteStart({}))
    await deleteTodo(id);
    dispatch(todoListActions.deleteDone({params: {}, result: { id }}));
  },

  modifyTodo: async (id: Todo["id"], title: Todo["title"], description: Todo["description"]) => {
    dispatch(todoListActions.updateStart({}))
    // const data = await updateTodo({ id, title, description })
    //     .catch(e => dispatch(todoListActions.updateFailed({params: {}, error: {}})));
    // dispatch(todoListActions.updateDone({params: {}, result: { data }}));

    // [Todo | Error, boolean]
    const result = await new Promise<[Todo, true] | [Error, false]>((resolve, reject) => {
      updateTodo({ id, title, description })
        .then(x => resolve([{id: x.id, title: x.title, description: x.description, createdAt: x.created_at}, true]))
        .catch(e => reject([e, false]))
    });

    if (result[1] === true) {
      dispatch(todoListActions.updateDone({params: {}, result: { data: result[0] }}));
    } else {
      dispatch(todoListActions.updateFailed({params: {}, error: {} }));
    }
  }
});

const mapStateToProps = (appState: AppState) => ({ todoList: appState.todoList });

const fn = connect(mapStateToProps, mapDispatchToProps);
export default fn(TodoList);

// const connect2 = (fn1, fn2) => {
//     // storeをpropsにわりあて
//     const props1 = fn1(this.store);
//     // dispatchをpropsにわりあて
//     const props2 = fn2(this.dispatch);
//     const margedProps = Object.assign(props1, props2);
//     // Componentを引数にとってComponentを返す関数を返却
//     return (Component) => (props) => <Component {...margedProps} {...props} />;
// }
