import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

global.__APP_LOADED__ = true;

ReactDOM.render(<App />, document.getElementById('root'));