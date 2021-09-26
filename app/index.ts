import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

(window as any).__APP_LOADED__ = true;

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
