import { Todo } from "./index"

type StorageTodo =  Omit<Todo, "createdAt"> & { createdAt: string };

export default async (): Promise<Todo[]> => {
    // Argument of type 'string | null' is not assignable to parameter of type 'string'.  Type 'null' is not assignable to type 'string'.ts
    // (method) JSON.parse(text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined): any
    // todoListは必ず配列になる
    // TypeScript `as`
    const todoList: StorageTodo[] = JSON.parse(localStorage.getItem("todoList") ?? "[]");
    const result = todoList.map<Todo>(x => ({ ...x, createdAt: new Date(x.created_at)}));
    console.log(result);
    return result;
    // result = Date[]

    // todoList.map(x => ({ ...x, createdAt: Date.parse(x.createdAt)}) );
    // const todoList = JSON.parse(localStorage.getItem("todoList")) ?? [];
    // todoList.map
}

// interface Config {
//     mode: "dev" | "local"
//     origin: string
// }

// const setConfg = (config: Config) => { /* なんかの処理 */ }

// const config: Config = {
//     mode: "dev",
//     origin: "https://lenet.jp"
// }



// type User = { name: string; age: number; displayName: string};
// type UserList = User[]

// const userList: UserList = [{ name: "test", age: 11, displayName: "hoge" }, { name: "test2", age: 12, displayName: "huga" }, { name: "test3", age: 13, displayName: "piyo" }, { name: "test4", age: 14, displayName: "foo" }]
// // 渡された関数を要素の全てに実行する。
// const userList2 = userList.map(x => ({ ...x, name: " " + x.name }))

// // callbackfn: (value: User, index: number, array: User[]) => {
//     // name: string;
//     // age: number;
// // },

// const xxx: string = 1;

// const a = 1 as any as string;
// console.log("aの値は: ", a);
// console.log("aの値は: ", a);

// [1, 2, 3].map(x => x + 1) // [2, 3, 4]
// // ↑ [1, 2, 3]
// // class Array {
// //     map(fn) {
// //         // this自体はArray
// //         const result = [];
// //         for (const x of this) {
// //             result.push(fn(x))
// //         }
// //         return result;
// //     }
// // }

// // スプレッド構文
// const x = { a: 1, b: 2, c: 3, d: 4, e: 5}
// const x1 = { ...x, f: 6 } // { a: 1, b: 2, c: 3, d: 4, e: 5, f:6 }

// const y = [1, 2, 3, 4, 5]
// const y1 = [...y, 6] // [1, 2, 3, 4, 5, 6]


