import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Scroll from 'react-scroll-to-bottom';

import './userList.css';

let socket;


//Bug quand qqun déco la liste des joueurs disparait il faut attendre une nouvelle connexion pour qu'elle soit mise à jour
const UserList = ({ name }) => {
	
	const [users, setUsers] = useState('');
	const ENDPOINT = 'https://contamination.herokuapp.com/';
	socket = io(ENDPOINT);
	
	useEffect(() => {
		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	}, []);
	
	return (
		<div className="userList">
		{
			users
				? (
					<div>
						<h1>Online users</h1>
						<Scroll className="scroll">
							<div className="users">
								<h2>
									{users.map(({name, score}) => (
										<div key={name} className="user">
											{name} {score}
										</div>
									))}
								</h2>
							</div>
						</Scroll>
					</div>
				)
			: null
		}
		</div>
	)
};

export default UserList;
