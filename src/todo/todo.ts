export interface TodoState {
    todo: Todo[];
    status: 'idle' | 'loading' | 'failed';
}
export interface Todo {
    id?: number;
    text: string;
}
