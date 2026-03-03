import { Div, state, after } from '@granularjs/core';
import { ActionIcon, AppBar, Button, Container, Text, Icon, setThemeMode, getThemeMode } from '@granularjs/ui';
import { router } from '../router.js';

export const AppLayout = (outlet) => {
  const themeMode = state(typeof document !== 'undefined' ? getThemeMode() : 'dark');

  const toggleTheme = () => {
    setThemeMode(themeMode.get() === 'light' ? 'dark' : 'light');
    themeMode.set(getThemeMode());
  };

  const themeIcon = after(themeMode).compute((themeMode) => {
    return themeMode === 'light' ? 'brightness_5' : 'dark_mode';
  });

  return Div({ className: 'app' },
    AppBar({ position: 'sticky' },
      Text({ size: 'lg', weight: 'bold' },
        'My Granular App'
      ),

      Div({ style: { flex: 1 } }),
      ActionIcon({ onClick: toggleTheme }, Icon(themeIcon)),
      Button({ variant: 'subtle', onClick: () => router.navigate('/') },
        'Home'
      ),
      Button({ variant: 'subtle', onClick: () => router.navigate('/about') },
        'About'
      )
    ),
    Container({ size: 'md', style: { paddingTop: '24px', paddingBottom: '48px' } },
      outlet
    )
  );
};
