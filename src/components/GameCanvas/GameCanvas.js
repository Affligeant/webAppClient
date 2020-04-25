import React from 'react';
import io from 'socket.io-client';

import './GameCanvas.css';

const ENDPOINT = 'https://contamination.herokuapp.com/';
let socket = io(ENDPOINT);

setInterval(() => {
	if (document.getElementById("gameCanvas")) {
		socket.emit('draw', lines);
		lines.length = 0;
	}
}, 100);

var state = {
	last_x: -1, last_y: -1,
}

let lines = [];

function clearCanvas() {
	let canvas = document.getElementById("gameCanvas")
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
	const canvas = document.getElementById("gameCanvas");
	canvas.addEventListener("mousedown", handler);
	canvas.addEventListener("mouseup", handler);
	canvas.addEventListener("mousemove", handler);
	
	//Ne marche pas... Comment avoir le focus ?
	canvas.addEventListener("keydown", handler);
}

function draw_line(x1, y1, x2, y2) {
	const ctx = document.getElementById("gameCanvas").getContext("2d");
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function handler(event) {
	// les coordonnées sont relatives à la fenêtre
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	if(event.type === "mousedown") {
		state.last_x = x;
		state.last_y = y;
	}
	else if(event.type === "mousemove") {
		if(state.last_x !== -1 && state.last_y !== -1) {
			let x1 = state.last_x
			let x2 = x;
			let y1 = state.last_y;
			let y2 = y;
			lines.push({x1, y1, x2, y2});
			state.last_x = x;
			state.last_y = y;
		}
	}
	else if(event.type === "mouseup") {
		state.last_x = -1;
		state.last_y = -1;
	}
	else {
		console.log(event);
	}
}

socket.on('lines', (data) => {
	clearCanvas();
	data.lines.forEach(function(l) {
		draw_line(l.x1, l.y1, l.x2, l.y2);
	});
});

class GameCanvas extends React.Component {
	
	componentDidMount() {
		const ctx = document.getElementById("gameCanvas").getContext("2d");
		ctx.fillStyle = "black";
		ctx.lineWidth = 2;
		init();
	}
	
	render() {
		return (
			<div className="gameDiv">
				<canvas id="gameCanvas" width={600} height={450}></canvas>
			</div>
		);
	}
};

export default GameCanvas;
