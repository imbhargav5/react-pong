import React from 'react';
import Ball from './ball';

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

class Pong extends React.Component{
	constructor(){
		super();
		this.state = {
			screen : {
				width : window.innerWidth,
				height : window.innerHeight
			},
			keys : {
		        left  : 0,
		        right : 0,
		        up    : 0,
		        down  : 0,
		        space : 0,
		    },
			context : null,
			currentScore : 0,
			topScore: localStorage['topscore'] || 0
		};
		this.ball = [];
		this.bars = [];
		
	}
	handleResize(value, e){
		this.setState({
		  screen : {
		    width: window.innerWidth,
		    height: window.innerHeight,
		  }
		});
	}

	componentDidMount() {
	    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
	    window.addEventListener('keydown', this.handleKeys.bind(this, true));
	    window.addEventListener('resize',  this.handleResize.bind(this, false));

	    const context = this.refs.canvas.getContext('2d');
	    this.setState({ context: context });
	    this.startGame();
	    requestAnimationFrame(() => {this.update()});
	}
	updateObjects(items, group){
	    let index = 0;
	    for (let item of items) {
	      if (item.delete) {
	        this[group].splice(index, 1);
	      }else{
	        items[index].render(this.state);
	      }
	      index++;
	    }
	  }


	startGame(){
		this.setState({
	      inGame: true,
	      currentScore: 0,
	    });

	let ball = new Ball({
		position: {
		x: this.state.screen.width/2,
		y: this.state.screen.height/2
		},
		create: this.createObject.bind(this),
		onDie: this.gameOver.bind(this)
		});

    	this.createObject(ball, 'ball');
	}

	createObject(item,group){
		this[group].push(item);
	}
	gameOver(){
		this.setState({
	      inGame: false
	    });
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleKeys);
		window.removeEventListener('resize', this.handleKeys);
		window.removeEventListener('resize', this.handleResize);
	}

	handleKeys(value, e){
		let keys = this.state.keys;
		if(e.keyCode === KEY.LEFT   || e.keyCode === KEY.A) keys.left  = value;
		if(e.keyCode === KEY.RIGHT  || e.keyCode === KEY.D) keys.right = value;
		if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
		if(e.keyCode === KEY.SPACE) keys.space = value;
		this.setState({
			keys : keys
		});
	}

	update(){
		console.log('updating');
		const context = this.state.context;
		const keys = this.state.keys;
		
		// Motion trail
		context.fillStyle = '#000';
		context.globalAlpha = 0.5;
		context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
		context.globalAlpha = 1;

		this.updateObjects(this.ball, 'ball');
		requestAnimationFrame(() => {this.update()});
	}
	render(){
		return <div>
		 <canvas ref="canvas" width={this.state.screen.width} height={this.state.screen.height} />
		</div>;
	}
};

export default Pong;