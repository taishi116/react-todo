import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import TodoComponent from "./Todo";
import { Todo, TodoList } from "../types";

const Host = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 8px;
  grid-auto-flow: row dense;
  width: 100%;
  height: 100%;
`;


interface Props {
  todoList: TodoList; // <- state
  fetchTodoList: () => void;
  addTodo: (title: Todo["title"], description: Todo["description"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  modifyTodo: (id: Todo["id"], title: Todo["title"], description: Todo["description"]) => void;
}

const TodoListComponet: React.FC<Props> = ({ todoList, fetchTodoList, addTodo, deleteTodo, modifyTodo }) => {
  useEffect(() => { fetchTodoList(); }, []);
  const titileInputElement = useRef<HTMLInputElement | null>(null);
  const descriptionInputElement = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <form onSubmit={async e => {
        e.preventDefault();

        if (titileInputElement.current?.value === undefined) {
          return;
        }
        if (descriptionInputElement.current?.value === undefined) {
          return;
        }
        addTodo(titileInputElement.current?.value, descriptionInputElement.current?.value);
      }}>
        <div>
          <label>タイトル</label>
          <input type="text" required ref={titileInputElement} />
        </div>
        <div>
          <label>詳細</label>
          <input type="text" required ref={descriptionInputElement} />
        </div>
        <button type="submit">追加</button>
      </form>
      <Host>
        {todoList.map(x => (<TodoComponent onDelete={() => deleteTodo(x.id)} onUpdate={(id, title, description) => modifyTodo(id, title, description)} key={x.id} {...x}/>))}
      </Host>
    </div>
  );
}

export default TodoListComponet;



// const fn = ({ test, test2, test3: testSan, ...x }) => {
//   console.log("========================== fn ===========================")
//   console.log("test", test);
//   console.log("test2", test2);
//   console.log("test3", testSan);
//   console.log(x)
//   console.log("========================== fn end =======================")
// }

// const arg1 = { test2: 2, test3: 3, test4: 4, test5: 5 };

// fn(arg1);

// const arg2222 = { hoga: 1, huga: 2, test: 3, ...arg1 };
// fn(arg2222);

// // これ
// const { test, huga, ...x } = arg2222;
// console.log("test", test);
// console.log("huga", huga);
// console.log("x", x);

// //  kokomade

// const fn2 = (a, b, c, d, ...x) => {
//   console.log("========================== fn2 ===========================")
//   console.log("a", a);
//   console.log("b", b);
//   console.log("c", c);
//   console.log("d", d);
//   console.log("x", x);
//   console.log("========================== fn2 end =======================")
// }

// const arg2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// fn2(arg2)
// fn2(...arg2)
// // fn2(1, 2, 3, 4, 5, 6, 7, 8, 9);

// // React hooksのステートとかこんな感じに呼び出してた
// const [index1, index2, ...etc] = arg2;
// console.log("index1", index1);
// console.log("index2", index2);
// console.log("etc", etc);
