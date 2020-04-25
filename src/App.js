import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Game from './components/Game/Game.js';

const App = () => (
	//Pour ajouter des méthodes de root aux composants Login et Game
	<Router>
		<Route path="/" exact component={Login} />
		<Route path="/game" component={Game} />
	</Router>
);

export default App;
