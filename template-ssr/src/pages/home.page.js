import { Div, state, after, list, observableArray, when, persist } from '@granularjs/core';
import { Button, Card, Stack, Text, Title, TextInput, Flex, List, Icon, ActionIcon, Chip } from '@granularjs/ui';
import { todoStore, addTodo, removeTodo, toggleTodo, moveTodoUp, moveTodoDown } from '../stores/todo.store';
import { TodoItem } from '../components/todo-item.component.js';



export const Home = () => {
  const task = state('');

  const add = () => {
    const text = task.get().trim();
    if (text === '') return;
    addTodo(text)
    task.set('')
  }

  return Stack({ gap: 'xl' },
    Title({ order: 1, className: 'wellcome' }, 'Welcome to Granular'),
    Text({ size: 'lg', color: 'muted' },
      'A JS-first framework with granular reactivity. No VDOM, no JSX, just JavaScript.'
    ),
    Stack({ gap: 'md' },
      Title({ order: 4 }, 'Task List'),
      Flex({ direction: 'row', gap: 'sm', align: 'end' },
        TextInput({
          placeholder: 'Type your task...',
          value: task,
        }),
        Button({ onClick: add }, 'Add'),
      ),
      List(
        list(todoStore, TodoItem)
      )
    )

  );
};
