import getTodoList from "./getTodoList";
import { Todo } from "./index"

// export interface Todo {
//     id: number;
//     title: string;
//     description: string;
//     createdAt: Date;
// }

// addTodo関数
// addTodo関数はtodoを受け取ってlocalStorageに保存する関数
// 要件: todoのID自体はサーバー側で付与することが多い
// なので今回は擬似的にaddTodo関数ないで、idを付与するようにします。

// 現状の問題点として、引数のTODO型では不要idを持っている必要がある。
// 引数のTodoの型をこうしたいなぁ {
//     title: string;
//     description: string;
//     createdAt: Date;
// }
// 理由としてはidはaddTodo関数内部で付与するから
// 引数としてわたされたtodoの中のidは使用しない
export default async (todo: Omit<Todo, "id">): Promise<Todo> => {
    // localStorageの中から一回全部打ち抜いてくる
    // 1. 被らないか確認するためZ
    const prevTodoList = await getTodoList();

    // ランダムなIDを追加
    let id: number;
    // idが既存のTodo全てと衝突していないか確認
    while (true) {
        id = Math.random();
        // それ無視！
        if (prevTodoList.every(x => x.id !== id)) {
            break;
        }
    }

    const newTodo = { ...todo, id };

    // 全体のものに一つ付与
    const todoList = prevTodoList.concat(newTodo);

    // Jsonに変換
    const todoListValue = JSON.stringify(todoList);
    // Jsonに変換したのをlocalStorageに反映
    localStorage.setItem("todoList", todoListValue);

    return newTodo;
}

// // before
// addTodo({
//     id: 1, // <- 使わない
//     title: "thoge",
//     description: "description",
//     createdAt: new Date()
// })

// // after
// addTodo({
//     title: "thoge",
//     description: "description",
//     createdAt: new Date()
// })
