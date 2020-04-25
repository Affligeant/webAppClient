import React from 'react';
import io from 'socket.io-client';

import './Canvas.css';

const ENDPOINT = 'https://contamination.herokuapp.com/';
let socket = io(ENDPOINT);
let permanentLines = [];

function drapeau(x, y, scale) {
	const ctx = document.getElementById("canvas").getContext("2d");
	
	let color = ctx.fillStyle;
	
	ctx.beginPath();
	ctx.moveTo(x, y);
	
	ctx.fillStyle = 'black';
	ctx.lineWidth = 1.5;
	ctx.lineTo(x, y - 20 * scale);
	ctx.stroke();
	
	ctx.lineWidth = 1
	ctx.fillStyle = 'red';
	ctx.fillRect(x - 18 * scale, y - 30 * scale, 20 * scale, 10 * scale);
	
	ctx.fillStyle = color;
	
}

function draw_player(x, y, pseudo) {
	const ctx = document.getElementById("canvas").getContext("2d");
	
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineWidth = 2;
	
	ctx.lineTo(x - 5, y + 15); //jambe gauche
	ctx.moveTo(x, y);
	ctx.lineTo(x + 5, y + 15); //jambe droite
	ctx.moveTo(x, y);
	ctx.lineTo(x, y - 15); //tronc
	ctx.lineTo(x - 5, y); //bras gauche
	ctx.moveTo(x, y - 15);
	ctx.lineTo(x + 5, y); //bras droit
	ctx.stroke();
	
	//tête
	ctx.beginPath();
	ctx.arc(x, y - 20, 5, 0, 2* Math.PI, false);
	ctx.stroke();
	
	//pseudo
	ctx.font = '12px serif'
	ctx.fillText(pseudo, x - 3 * pseudo.length, y - 30);
}

function clearCanvas() {
	let canvas = document.getElementById("canvas")
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMap() {
	
	var ctx = document.getElementById('canvas').getContext('2d');
	
	ctx.lineWidth = 3;
	ctx.fillStyle = 'black';
	
	permanentLines.forEach(function(l){
		ctx.beginPath();
		ctx.moveTo(l.x1, l.y1);
		ctx.lineTo(l.x2, l.y2);
		ctx.stroke();
	});
	
	ctx.lineWidth = 1;
	
	ctx.moveTo(520, 60);
	ctx.fillRect(520, 60, 85, 395);
	drapeau(590, 50, 1);
	
	ctx.moveTo(530, 60);
	ctx.arc(530, 60, 10, 0, 2* Math.PI, true);
	ctx.fill();
	
	ctx.moveTo(530, 50);
	ctx.fillRect(530, 50, 71, 11);
}

socket.on('users', (users) => {
	clearCanvas();
	drawMap();
	users.forEach(function({name, x, y}) {
		draw_player(x, y, name);
	});
});

class Canvas extends React.Component {
	
	componentDidMount() {
		socket.emit('askMap');
		socket.on('map', (lines) => {
			permanentLines = lines;
			drawMap();
		});
		
	}
	
	render() {
		return (
			<div className="canvasDiv">
				<canvas id="canvas" width={600} height={450}></canvas>
			</div>
		);
	}
};

export default Canvas;


