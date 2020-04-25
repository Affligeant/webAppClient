import React from 'react';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
	let isSentByCurrentUser = false;
	
	const trimmedName = name.trim();
	
	if(user === trimmedName) {
		isSentByCurrentUser = true;
	}
	
	return(
		isSentByCurrentUser
			? (
				<div className="messageContainer justifyStart">
					<p className="sentText pl-10">{trimmedName}</p>
					<div className="messageBox">
						<p className="messageText colorDark">{text}</p>
					</div>
				</div>
			)
			: (
				<div className="messageContainer justifyStart">
					<p className="sentText pl-10">{user}</p>
					<div className="messageBox">
						<p className="messageText colorWhite">{text}</p>
					</div>
				</div>
			)
	);
	
};

export default Message;



