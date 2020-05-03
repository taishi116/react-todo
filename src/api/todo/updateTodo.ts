import getTodoList from "./getTodoList";
import  { Todo } from './index';

const fn = async (todo: Partial<Todo> & { id: Todo["id"] }): Promise<Todo> => {
    // 既存のTodo一覧を取得
    const prevTodoList = await getTodoList();

    // 変更対象のTodoを取得
    const prevTodo = prevTodoList.find(x => x.id === todo.id);
    // 存在しなかった場合 Errorをthrow
    if (!prevTodo) {
        throw new Error("更新対象のTodoのIDが存在しません")
    }
    // 過去のTodoと引数で受け取ったTodoをマージ
    const editedTodo = Object.assign(prevTodo, todo);

    // const editTodoList = prevTodoList.filter(x => x.id !== id);
    // const newTodoList = editTodoList.concat(editedTodo);

    // 変更後のTodoを既存のTodoと置き換え
    const newTodoList = prevTodoList.map(x => x.id === todo.id ? editedTodo : x);

    // JSON stringの作成
    const todoListValue = JSON.stringify(newTodoList);
    // localstorageへと値を上書き
    localStorage.setItem("todoList", todoListValue);

    // 「過去のTodoと引数で受け取ったTodoをマージ」した値を返却
    return editedTodo;
}


// Todo {
//     id: number;
//     title?: string;
//     description?: string;
//     created_at?: Date;
// }

export default fn;
// // todo: Omit<Todo, "created_at">だと出来なかった
// const fn2 = async ({ id, title, description }: Omit<Todo, "created_at">): Promise<Todo> => {
//     console.log(id);
//     return {}
// }

// const fn = async (todo: Partial<Todo> & { id: number }): Promise<Todo> => {
//     const prevTodoList = await getTodoList();
//     console.log("1", prevTodoList);
//     const newTodo = Object.assign(prevTodoList.find(x => x.id === todo.id), todo)
//     const newTodoList = prevTodoList.map(x => x.id === todo.id ? newTodo : x)
//     console.log("1", newTodoList);
//     const sortedTodoList = newTodoList.sort((a, b) => a.created_at.getTime() - b.created_at.getTime()); // <= 破壊的

//     console.log("2", prevTodoList); // "1" と同じ
//     console.log("2", newTodoList); // "1" と違う
//     localStorage.setItem("todoList", JSON.stringify(sortedTodoList));
//     return newTodo;
// }

// const a = new Date("2020/01/01").getTime();
// const b = new Date("2020/01/02").getTime();
// const c = new Date("2020/01/03").getTime();
// const d = new Date("2020/01/04").getTime();

// [a, b, c, d].sort((a, b) => a - b)
//     .map(x => new Date(x));
// (4) [Wed Jan 01 2020 00:00:00 GMT+0900 (Japan Standard Time), Thu Jan 02 2020 00:00:00 GMT+0900 (Japan Standard Time), Fri Jan 03 2020 00:00:00 GMT+0900 (Japan Standard Time), Sat Jan 04 2020 00:00:00 GMT+0900 (Japan Standard Time)]
// 0: Wed Jan 01 2020 00:00:00 GMT+0900 (Japan Standard Time) {}
// 1: Thu Jan 02 2020 00:00:00 GMT+0900 (Japan Standard Time) {}
// 2: Fri Jan 03 2020 00:00:00 GMT+0900 (Japan Standard Time) {}
// 3: Sat Jan 04 2020 00:00:00 GMT+0900 (Japan Standard Time) {}
