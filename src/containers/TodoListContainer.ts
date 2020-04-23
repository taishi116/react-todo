import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { todoListActions } from '../actions/todoListAction';
import TodoList from '../components/TodoList';
import getTodoList from "../api/todo/getTodoList";

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchTodoList: async () => {
      dispatch(todoListActions.start({}));
      const todoList = await getTodoList();
      const data = todoList.map(x => ({ id: x.id, title: x.title, description: x.description, created_at: x.createdAt }));

      const x = todoListActions.done({ params: {}, result: { data } });
      console.log(x);
      dispatch(x);
    },
  };
};

function mapStateToProps(appState: AppState) {
  // return Object.assign({}, appState.todoList);
  return Object.assign({}, { todoList: appState.todoList });
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
