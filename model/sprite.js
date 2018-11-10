class Sprite{
	
	constructor(name, country, src){
		this.name = name;
		this.country = country;
		this.src = src;
	}
	
	test(){
		console.log('sprite');
	}

	clearAllTimers(){
		clearInterval(punchDownTimer);
		clearInterval(moveFallbackTimer);
	}

	sprite_FallbackAndRefresh(){

		//console.log('__sprite_FallbackAndRefresh');
		
		this.clearAllTimers();
		
		/* prepare new sprite */
		
		var sprite = gameConfig.sprites[0];
		sprite.info.source = 'images/sprites/characters1/sprite-character1-movement-fall1-forward.png';
		sprite.frames.nb = 7;
		sprite.frames.selected = 0;
		
		let frames = gameConfig.sprites[0].frames;
		let it = 1;
		let step = 1;
		let curOffset = 0;
		let originalCoordsDY = sprite.frames.coords.dy;
		
		moveFallbackTimer = setInterval(function(){

			sprite.frames.selected+=step;
			
			if(sprite.frames.selected==sprite.frames.nb-1){
				clearInterval(moveFallbackTimer);	//end of movement
			}
			
			//update frame
			sprite.frames.coords.sx = sprite.frames.selected*sprite.frames.coords.sW;
			
			curOffset = sprite.frames.selected<((sprite.frames.nb)/2)  ? sprite.frames.coords.dyOffset*(-1) : sprite.frames.coords.dyOffset;
			sprite.frames.coords.dy += curOffset;
			
			if( (sprite.frames.selected+1) == sprite.frames.nb){
				sprite.frames.coords.dy = originalCoordsDY;
			}

			/* move backward but not for the last frame */
			if( sprite.frames.selected+2< sprite.frames.nb){
				sprite.frames.coords.dx -= sprite.frames.coords.dxOffset;
			}

			MainGame.refreshCanvas(canvas, ctx, gameConfig);
			
		},120);

		
	}


	sprite_jumpAndRefresh(){
		
		let frames = gameConfig.sprites[0].frames;
		let it = 1;
		let initialCoordY = frames.coords.dy;

		const thisMove = setInterval(function(){
			
			if(it>20){
				clearInterval(thisMove);
				return;
			}
			
			if(it > 10){	//descente
				frames.coords.dy+=frames.coords.dyOffset;
			}else{						//montee
				frames.coords.dy-=frames.coords.dyOffset;
			}

			it++;
			MainGame.refreshCanvas(canvas, ctx, gameConfig);
		},14);
		
	}


	sprite_punchUpTimerUpAndRefresh(){

		var sprite = gameConfig.sprites[0];
		var step = 1;
		sprite.info.source = 'images/sprites/characters1/sprite-character1-movement-strike1-forward.png';
		sprite.frames.nb = 7;
		sprite.frames.selected = 0;
		this.clearAllTimers();
		this.sprite_executePunch(step, sprite);
		
	}

	sprite_punchDownTimerUpAndRefresh(){

		var sprite = gameConfig.sprites[0];
		var step = 1;
		sprite.info.source = 'images/sprites/characters1/sprite-character1-movement-strike2-forward.png';
		sprite.frames.nb = 6;
		sprite.frames.selected = 0;
		clearInterval(punchDownTimer);
		
		this.sprite_executePunch(step, sprite);
		
	}


	sprite_executePunch(step, sprite){

		punchDownTimer = setInterval( ()=>{

			sprite.frames.selected+=step;
			
			if(sprite.frames.selected==sprite.frames.nb){
				step = -step;
			}
			
			if(sprite.frames.selected==0){
				clearInterval(punchDownTimer);
			}
			
			sprite.frames.coords.sx = sprite.frames.selected*sprite.frames.coords.sW;

			MainGame.refreshCanvas(canvas, ctx, gameConfig);

		}, 26);
		
		MainGame.refreshCanvas(canvas, ctx, gameConfig);	

		
	}


	sprite_moveAndRefresh(positive){	//direction: positive==true for right, positive==false for left

		gameConfig.sprites[0].info.source = 'images/sprites/characters1/sprite-character1-movement-walk-forward.png';
		gameConfig.sprites[0].frames.nb = 7;

		let frames = gameConfig.sprites[0].frames;
		frames.selected++;
		if(frames.selected==frames.nb){
			frames.selected = 0;
		}
		frames.coords.sx = frames.selected*frames.coords.sW;
		if(positive){
			frames.coords.dx += frames.coords.dxOffset;
		}else{
			frames.coords.dx -= frames.coords.dxOffset;
		}

		MainGame.refreshCanvas(canvas, ctx, gameConfig);

	}
















	
}