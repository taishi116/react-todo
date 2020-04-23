import React, { useEffect } from "react";
import { TodoList } from "../types";

interface Props {
  todoList: TodoList; // <- state
  fetchTodoList: () => void;
}

const TodoListComponet: React.FC<Props> = ({ todoList, fetchTodoList }) => {
  useEffect(() => { fetchTodoList(); }, []);

  return (
    <div>
      tolist
      {todoList.map(x => (
        <div>
          <div>{x.title}</div>
          <div>{x.description}</div>
        </div>
      ))}
    </div>
  );
}

export default TodoListComponet;
