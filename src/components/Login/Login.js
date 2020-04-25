import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
	//Hook
	const [name, setName] = useState('');
	
	return (
		<div className="loginBox">
			<div className="loginInputDiv">
				<input autoFocus placeholder="Name" className="loginInput" type="text" onChange={(event) => setName(event.target.value)} />
			</div>
			<Link onClick={event => (!name || name.trim() === 'admin' || name.length > 15) ? event.preventDefault() : null} to={`/game?name=${name}`}>
				<button className="loginButton" type="submit">Login</button>
			</Link>
		</div>
	)
};

export default Login;

