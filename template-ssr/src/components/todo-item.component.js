import { state, after, when, Div } from '@granularjs/core';
import { Button, Flex, Stack, Text, TextInput, Icon, ActionIcon, Chip, List } from '@granularjs/ui';
import { todoStore, toggleTodo, removeTodo, moveTodoUp, moveTodoDown } from '../stores/todo.store';


export const TodoItem = (todo, index) => {
    const input = state(null);
    const editing = state(false);
    const temporaryText = state(todo.text);

    const edit = () => {
        editing.set(!editing.get());
        if (editing.get()) {
            input.get().focus();
        }
    }
    const toggle = () => toggleTodo(todo.get().id);
    const remove = () => removeTodo(todo.get().id);
    const save = () => {
        todo.set().text = temporaryText.get();
        editing.set(false);
    }
    const cancel = () => {
        temporaryText.set(todo.text);
        editing.set(false);
    }

    const canMoveUp = after(index).compute((index) => index > 0);
    const canMoveDown = after(index).compute((index) => index < todoStore.length - 1);

    const chipColor = after(todo.done).compute((done) => done ? 'success' : 'primary');


    return List.Item({
        title: when(editing,
            () => TextInput({ node: input, value: temporaryText, size: 'sm' }),
            () => Stack({ gap: 'xs' },
                when(todo.done,
                    () => Text({ color: 'muted', decoration: 'line-through' }, todo.text),
                    () => Text(todo.text)
                ),
                Flex({ gap: 'sm', onDblClick: edit },
                    Text({ color: 'muted', size: 'xs' }, 'Created at: ', todo.createdAt),
                    when(todo.updatedAt, () => Text({ color: 'muted', size: 'xs' }, 'Updated at: ', todo.updatedAt)),
                ),
            ),
        ),
        leftSection: Flex({ gap: 'sm' },
            Div({ style: { width: '22px' } }, when(todo.done, () => Icon({ color: 'success' }, 'check'))),
            Chip({ color: chipColor }, todo.id),
        ),
        rightSection: when(editing,
            () => Flex({ gap: 'sm' },
                Button({ color: 'success', size: 'xs', onClick: save, leftSection: Icon('edit') }, 'Save'),
                Button({ color: 'danger', size: 'xs', onClick: cancel, leftSection: Icon('cancel') }, 'Cancel'),
            ),
            () => Flex({ gap: 'sm' },
                when(canMoveDown, () => ActionIcon({ variant: 'outline', onClick: () => moveTodoDown(todo.get().id) }, Icon('arrow_downward')), () => null),
                when(canMoveUp, () => ActionIcon({ variant: 'outline', onClick: () => moveTodoUp(todo.get().id) }, Icon('arrow_upward')), () => null),
                when(todo.done,
                    () => ActionIcon({ color: 'warning', onClick: toggle }, Icon('cancel')),
                    () => ActionIcon({ color: 'success', onClick: toggle }, Icon('check_circle')),
                ),
                ActionIcon({ color: 'primary', onClick: edit }, Icon('edit')),
                ActionIcon({ color: 'danger', onClick: remove }, Icon('delete')),
            ),
        ),
        withBorder: true,
    });
};