export interface Todo {
  id: number;
  title: string;
  description: string;
  created_at: Date;
}

export type TodoList = Todo[]

// cmd + option + 任意の上下キー
