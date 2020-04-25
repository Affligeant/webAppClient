//useEffect hooks to avoid duplicate codes on componentDidMount and componentDidUpdate for initializing and updating components
import React, { useState, useEffect } from 'react';

//queryString to retrieve the URL query variables as an object
import queryString from 'query-string';

import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = (props) => {
	
	const [name, setName] = useState('');
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const ENDPOINT = 'https://contamination.herokuapp.com/';
	
	useEffect(() => {
		const { name } = queryString.parse(props.location.search);
		
		socket = io(ENDPOINT);
		
		setName(name);
		socket.emit('join', {name}, () => {
			
		});
		
		return () => {
			socket.emit('disconnect');
			socket.off();
		}
		
	}, [ENDPOINT, props.location.search]);
	
	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);
	
	const sendMessage = (event) => {
		event.preventDefault();
		
		if(message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	
	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar />
				<Messages messages={messages} name={name}/>
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	)
};

export default Chat;
