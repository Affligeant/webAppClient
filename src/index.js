import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';


//Injecte le component "App" importé plus haut dans la div d'id #root de la page html
ReactDOM.render(<App />, document.querySelector('#root'));
