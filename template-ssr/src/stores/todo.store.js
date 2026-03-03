import { state, observableArray, persist, before, after} from '@granularjs/core';

const memoryStorage = { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } };
const storage = typeof localStorage !== 'undefined' ? undefined : memoryStorage;

const firstRun = persist(state(new Date()), { key: 'firstRun', storage });
const counter = persist(state(9), { key: 'todo-counter', storage });

export const todoStore = persist(observableArray([
    { id: 'todo-1', text: 'Create new Granular App', createdAt: firstRun.get(), done: true, updatedAt: null },
    { id: 'todo-2', text: 'Create an Unauthenticated Layout Component', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-3', text: 'Create the Authentication Page', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-4', text: 'Setup Routes for Authentication', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-5', text: 'Create an Authenticated Layout Component', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-6', text: 'Create the Dashboard Page', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-7', text: 'Setup Routes for Dashboard', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-8', text: 'Create the Profile Page', createdAt: firstRun.get(), done: false, updatedAt: null },
    { id: 'todo-9', text: 'Setup Routes for Profile', createdAt: firstRun.get(), done: false, updatedAt: null },
]), { key: 'todos', storage });


export const addTodo = (text) => {
    counter.set(counter.get() + 1);
    todoStore.push({ id: `todo-${counter.get()}`, text, createdAt: new Date(), done: false })
}

export const removeTodo = (id) => {
    todoStore.splice(todoStore.findIndex(todo => todo.id === id), 1);
}

export const toggleTodo = (id) => {
    const idx = todoStore.findIndex(t => t.id === id);
    if (idx === -1) return;
    const item = todoStore[idx];
    todoStore[idx] = { ...item, done: !item.done };
};

export const moveTodoUp = (id) => {
    const idx = todoStore.findIndex(t => t.id === id);
    if (idx === -1) return;
    const item = todoStore[idx];
    todoStore[idx] = todoStore[idx - 1];
    todoStore[idx - 1] = item;
};

export const moveTodoDown = (id) => {
    const idx = todoStore.findIndex(t => t.id === id);
    if (idx === -1) return;
    const item = todoStore[idx];
    todoStore[idx] = todoStore[idx + 1];
    todoStore[idx + 1] = item;
};