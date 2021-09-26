import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

declare global {
  // eslint-disable-next-line no-var
  var __APP_LOADED__ : boolean
}
global.__APP_LOADED__ = true;

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);
