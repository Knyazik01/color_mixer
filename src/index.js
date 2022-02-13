import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/global.scss';
import { devtools } from 'valtio/utils';
import state from './store/state';

devtools(state, 'color_mixer');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
