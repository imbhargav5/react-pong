import React from 'react';
var x = 0,y=0,rotate : 0;

var getPosition = function(){
	x+=1;
	y+=1;
	rotate +=1;
	return {
		x,y,rotate
	}
}

class Bar extends React.Component{
	constructor(args){
		super();
		this.radius = 10;
	}
	render(state){
		const position = getPosition();
		const {context} = state;
		context.save();
		context.translate(position.x, position.y);
	    context.rotate(position.rotate * Math.PI / 180);
	    context.strokeStyle = '#ffffff';
	    context.fillStyle = '#e91e63';
	    context.lineWidth = 2;
	    context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI*2);
		context.fill();
	    context.stroke();
	    context.restore();
	}
}
export default Bar;