import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
require('file-loader?name=demo.html!./demo.html');
ReactDOM.render(<App />, document.getElementById('app'));
