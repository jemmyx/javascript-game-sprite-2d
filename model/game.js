class Game{
	
	init(){
		//_initGame();
		canvas.width = gameConfig.canvas.width;
		canvas.height = gameConfig.canvas.height;
		this.refreshCanvas(canvas, ctx, gameConfig);
		window.addEventListener('keydown', handleKeys, true);
		window.addEventListener('keyup', handleKeys, true);
	}

	/*----------------------------------------------*/
	/* 												*/
	/* 				CANVAS - SET DECORATION			*/
	/* 												*/
	/*----------------------------------------------*/

	refreshCanvas(canvas, ctx, gameConfig){

		var that = this;
		var background = new Image();
		background.src = gameConfig.info.background;

		background.onload = function(){
			ctx.clearRect(0, 0, gameConfig.canvas.width, gameConfig.canvas.height);	//put this once img loaded to avoid flickering...
			ctx.drawImage(background, 0, 0);
			that.setSprites(canvas, ctx, gameConfig.sprites);
		}

	}
	
	setSprites(canvas, ctx, sprites){
	
		let sprite = sprites[0];
		this.initEnergyBars(canvas, ctx, sprite.energybars);
		this.initCharacters(canvas, ctx, sprite);
	
	}

	render(ctx, image, coords){
		ctx.drawImage(image, coords.sx, coords.sy, coords.sW, coords.sH, coords.dx, coords.dy, coords.dW, coords.dH);
	}
	

	/*----------------------------------------------*/
	/* 												*/
	/* 				CANVAS - ENERGY BARS			*/
	/* 												*/
	/*----------------------------------------------*/


	initCharacters(canvas, ctx, configSprite){

		let sprite = new Image();
		sprite.src = configSprite.info.source;
		this.render(ctx, sprite, configSprite.frames.coords);

	}

	initEnergyBars(canvas, ctx){

		ctx.rect(20,20,200,16);
		ctx.strokeStyle = 'red';
		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'green';
		ctx.fill();
		
		ctx.rect(740,20,200,16);
		ctx.strokeStyle = 'red';
		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'green';
		ctx.fill();
		
	}



}