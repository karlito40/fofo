import 'babel-polyfill';
import { importDefaults } from '../shared/utils/Context';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './root/App';
import { bootstrap } from './app';
import { registerI18n } from '../shared/i18n';

bootstrap();

ReactDOM.render(<App />, document.getElementById('root'));