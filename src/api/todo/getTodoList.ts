import { Todo } from "./index"

export default async (): Promise<Todo[]> => {
    // Argument of type 'string | null' is not assignable to parameter of type 'string'.  Type 'null' is not assignable to type 'string'.ts
    // (method) JSON.parse(text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined): any
    // todoListは必ず配列になる
    // TypeScript `as`
    const todoList= JSON.parse(localStorage.getItem("todoList") ?? "[]") as Todo[];
    // const todoList = JSON.parse(localStorage.getItem("todoList")) ?? [];

    return todoList;
}
