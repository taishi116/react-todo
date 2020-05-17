import getTodoList from "./getTodoList";
import { Todo } from "./index";

export default async (id: Todo["id"]): Promise<void> => {
    const prevTodoList = await getTodoList();
    const newTodoList = prevTodoList.filter(x => x.id !== id);
    const todoListValue = JSON.stringify(newTodoList);
    localStorage.setItem("todoList", todoListValue);
    return
}


// export default async (todo: Omit<Todo, "id">): Promise<Todo> => {
//     const prevTodoList = await getTodoList(); // <=

       // 元々のtodoListに新しいTodoを追加する            // <= ここが変わる
//     const todoList = prevTodoList.concat(newTodo); // <= ここが変わる


//     const todoListValue = JSON.stringify(todoList);
//     localStorage.setItem("todoList", todoListValue);

//     return;
// }


// filter() メソッドは、引数として与えられたテスト関数を各配列要素に対して実行し、それに合格したすべての配列要素からなる新しい配列を生成します。

// 次の例では、filter() を使って 10 未満の値を持つ要素をすべて取り除いた配列を生成します。
// var filtered = [12, 5, 8, 130, 44].filter(x -> x >= 10);
// filtered は [12, 130, 44] となる（10未満の配列要素が取り除かれている）

