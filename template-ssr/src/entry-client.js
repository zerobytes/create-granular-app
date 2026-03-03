import { setThemeMode } from '@granularjs/ui';
import { router } from './router.js';
import './styles.css';

setThemeMode('dark');

router.mount(document.getElementById('app'));
