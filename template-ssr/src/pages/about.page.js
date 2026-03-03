import { Stack, Title, Text, List, Anchor, Card } from '@granularjs/ui';

export const About = () => {
  return Stack({ gap: 'xl' },
    Title({ order: 1 }, 'About Granular'),
    Text({ size: 'lg', color: 'muted' },
      'Granular is a modern JavaScript framework built for performance and simplicity.'
    ),
    Card({ shadow: 'sm', padding: 'lg', radius: 'md', withBorder: true },
      Stack({ gap: 'md' },
        Title({ order: 3 }, 'Key Features'),
        List({ type: 'ordered' },
          List.Item('JS-first UI: DOM tags are functions'),
          List.Item('Granular updates: only changed nodes update'),
          List.Item('Explicit reactivity: signal, state, after, before, context, computed, persist, observableArray'),
          List.Item('No JSX/TSX: no parallel language, no VDOM'),
          List.Item('No build required: runs directly in browser (ESM)'),
          List.Item('Zero dependency overhead')
        )
      )
    ),
    Text({ color: 'muted' },
      'Learn more at ',
      Anchor({ href: 'https://granular.web.app', target: '_blank' }, 'granular.web.app')
    )
  );
};
