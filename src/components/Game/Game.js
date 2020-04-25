import React from 'react';
import Chat from '../Chat/Chat.js';
import Canvas from '../Canvas/Canvas.js';
import GameCanvas from '../GameCanvas/GameCanvas.js';
import queryString from 'query-string';
import UserList from '../UserList/userList.js';

import './Game.css'

const Game = ({location}) => {
	
	return (
		<div className="main">
			<Canvas />
			<GameCanvas />
			<UserList name={queryString.parse(location.search)} />
			<div className="Chat">
				<Chat location={location}/>
			</div>
		</div>
	)
};

export default Game;
