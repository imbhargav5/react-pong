import React from 'react';


class Bar extends React.Component{
	constructor(args){
		super();
		this.radius = 10;
		let x = args.position.x, y = args.position.y;
		this.position= {x,y};
		this.size = args.size;
		this.velocity = {
			x : 0,
			y : 0
		}
		this.vertices = {
			top : {
				x: this.position.x,
				y :this. position.y
			},
			right : {
				x: this.position.x + this.size.width,
				y :this. position.y
			},
			bottom : {
				x: this.position.x + this.size.width,
				y :this. position.y + this.size.height
			},
			left: {
				x: this.position.x,
				y :this. position.y + this.size.height
			}
		};
	}

	render(state){
		const position = this.position;
		const {context,keys} = state;
		if(keys.left){
			if(this.velocity.x>0){
				this.velocity.x = 0;
			}
			else{
				this.velocity.x = -3;
			}
			
		}
		if(keys.right){
			if(this.velocity.x<0){
				this.velocity.x=0;
			}else{
				this.velocity.x =3;	
			}
			
		}
		this.position.x+=this.velocity.x;
		console.log(keys);
		context.save();
		context.strokeStyle = '#fff';
	    context.fillStyle = '#000';
	    context.beginPath();
	    context.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
		context.fill();
	    context.stroke();
	    context.restore();
	}
}
export default Bar;