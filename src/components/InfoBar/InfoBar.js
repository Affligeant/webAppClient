import React from 'react';

import './InfoBar.css';

const InfoBar = () => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<h3>Chat</h3>
		</div>
		<div className="rightInnerContainer">
			<a href="/" className="quitLink">QUITTER LE JEU</a>
		</div>
	</div>
	
);

export default InfoBar;
