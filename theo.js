/* jeux 2D pour theo */

/*----------------------------------------------*/
/* 												*/
/* 			GAME & SPRITES CONFIGURATION		*/
/* 												*/
/*----------------------------------------------*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var punchDownTimer = {};
var moveFallbackTimer = {};


var gameConfig = {

	info: {
		background: 'images/bg-1.jpg'
	},
	canvas: {
		width:1000,
		height:900
	},
	sprites : [
		{
			info: {
				name: 'Trulock',
				country:'Swizerland',
				source: 'images/sprites/characters1/sprite-character1-movement-walk-forward.png'
			},
			energybars : {
				min: 0,
				max: 100,
				value : 100
			},
			frames : {
				nb: 7,
				selected: 0,
				width :719,
				coords: {
					sx: 0, 
					sy:0, 
					sW: 719, 
					sH: 600, 
					dx: -300, 
					dxOffset: 50,	//offset lors du deplacements de ce sprite
					dy: -95, 
					dyOffset: 16,	//offset lors du saut de ce sprite
					dW: 719, 
					dH: 600
				}
			}
		}
	]
}


main();

function main(){

	_initGame();
	
}



function _initGame(){
	
	canvas.width = gameConfig.canvas.width;
	canvas.height = gameConfig.canvas.height;
	_refreshCanvas(canvas, ctx, gameConfig);
	window.addEventListener('keydown', handleKeys, true);
	window.addEventListener('keyup', handleKeys, true);
	
}



/*----------------------------------------------*/
/* 												*/
/* 				CANVAS - SET CHARACTERS			*/
/* 												*/
/*----------------------------------------------*/



function _initCharacters(canvas, ctx, configSprite){

	let sprite = new Image();
	sprite.src = configSprite.info.source;
	_render(ctx, sprite, configSprite.frames.coords);

}

function _render(ctx, image, coords){
	ctx.drawImage(image, coords.sx, coords.sy, coords.sW, coords.sH, coords.dx, coords.dy, coords.dW, coords.dH);
}



/*----------------------------------------------*/
/* 												*/
/* 				CANVAS - SET DECORATION			*/
/* 												*/
/*----------------------------------------------*/


function _setSprites(canvas, ctx, sprites){
	
	let sprite = sprites[0];
	_initEnergyBars(canvas, ctx, sprite.energybars);
	_initCharacters(canvas, ctx, sprite);
	
}

function _refreshCanvas(canvas, ctx, gameConfig){
	

	var background = new Image();
	background.src = gameConfig.info.background;

	background.onload = function(){
		ctx.clearRect(0, 0, gameConfig.canvas.width, gameConfig.canvas.height);	//put this once img loaded to avoid flickering...
		ctx.drawImage(background, 0, 0);
		_setSprites(canvas, ctx, gameConfig.sprites);
	}

}


/*----------------------------------------------*/
/* 												*/
/* 				CANVAS - ENERGY BARS			*/
/* 												*/
/*----------------------------------------------*/


function _initEnergyBars(canvas, ctx){

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



/*----------------------------------------------*/
/* 												*/
/* 				HANDLE KEYBOARDS 				*/
/* 												*/
/*----------------------------------------------*/


/* 

13: ENTER
65 - 37		: a / fleche gauche
87 - 38		: w / fleche haut
68 - 39		: d / fleche droite
83 - 40		: s / fleche bas
32			: space
 */

var map = [];

function handleKeys(e){
	
	const keyCodeAuthorized = [17, 116, 123];
	
	e = e || event;
	
	if( keyCodeAuthorized.indexOf(e.keyCode)=== -1 ){
		e.preventDefault();
	}

	map[e.keyCode] = e.type == 'keydown';
	
	/* test one key */

	if( this.testDoubleKeys(65, 32) ){
		console.log('do action');
		map = [];
	}else if( this.testSimpleKey(65) || this.testSimpleKey(37) ){

		__sprite_moveAndRefresh(false);

	}else  if( this.testSimpleKey(68) || this.testSimpleKey(39) ){

		__sprite_moveAndRefresh(true);
		
	}else  if( this.testSimpleKey(32)){
		
		if(e.type=='keydown'){
			__sprite_jumpAndRefresh();
		}
		
	}else  if( this.testSimpleKey(83) || this.testSimpleKey(40) ){
		
		if(e.type=='keydown'){
			__sprite_punchDownTimerUpAndRefresh();
		}
		
		
	}else  if( this.testSimpleKey(87) || this.testSimpleKey(38) ){

		if(e.type=='keydown'){
			__sprite_punchUpTimerUpAndRefresh();
		}

	}else  if( this.testSimpleKey(76) ){

		if(e.type=='keydown'){
			__sprite_FallbackAndRefresh();
		}

	}
	
}


function testSimpleKey(key){
	return map[key]!=undefined && map[key]===true;
}


function testDoubleKeys(key1, key2){
	return ( map[key1]!=undefined && map[key2]!=undefined ) && ( map[key1]===true && map[key2]===true );
}


function __clearAllTimers(){
	clearInterval(punchDownTimer);
	clearInterval(moveFallbackTimer);
}

function __sprite_FallbackAndRefresh(){

	console.log('__sprite_FallbackAndRefresh');
	
	__clearAllTimers();
	
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
		
		console.log('sprite.frames.selected = '+sprite.frames.selected);
		
		sprite.frames.selected+=step;
		
		if(sprite.frames.selected==sprite.frames.nb-1){
			console.log('stop: select='+sprite.frames.selected+', frame nb = '+sprite.frames.nb);
			clearInterval(moveFallbackTimer);	//end of movement
		}
		
		//update frame
		sprite.frames.coords.sx = sprite.frames.selected*sprite.frames.coords.sW;
		console.log('update sprite with coords X = '+sprite.frames.coords.sx+', Y ='+sprite.frames.coords.sy);
		
		curOffset = sprite.frames.selected<((sprite.frames.nb)/2)  ? sprite.frames.coords.dyOffset*(-1) : sprite.frames.coords.dyOffset;
		sprite.frames.coords.dy += curOffset;
		
		console.log('sprite.frames.selected='+sprite.frames.selected);
		console.log('sprite.frames.nb='+sprite.frames.nb);
		
		if( (sprite.frames.selected+1) == sprite.frames.nb){
			sprite.frames.coords.dy = originalCoordsDY;
		}

		/* move backward but not for the last frame */
		if( sprite.frames.selected+2< sprite.frames.nb){
			sprite.frames.coords.dx -= sprite.frames.coords.dxOffset;
		}

		_refreshCanvas(canvas, ctx, gameConfig);
		
	},120);

	
}


function __sprite_jumpAndRefresh(){
	
	let frames = gameConfig.sprites[0].frames;
	let it = 1;
	let initialCoordY = frames.coords.dy;
	// console.log('coord Y = '+frames.coords.dy+', it = '+it);
	
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
		_refreshCanvas(canvas, ctx, gameConfig);
	},14);
	
}

function __sprite_punchDownTimerUpAndRefresh(){

	var sprite = gameConfig.sprites[0];
	sprite.info.source = 'images/sprites/characters1/sprite-character1-movement-strike2-forward.png';
	sprite.frames.nb = 6;
	sprite.frames.selected = 0;
	clearInterval(punchDownTimer);
	step = 1;
	
	_sprite_executePunch(step, sprite);
	
}


function __sprite_punchUpTimerUpAndRefresh(){

	var sprite = gameConfig.sprites[0];
	sprite.info.source = 'images/sprites/characters1/sprite-character1-movement-strike1-forward.png';
	sprite.frames.nb = 7;
	sprite.frames.selected = 0;
	// clearInterval(punchDownTimer);
	__clearAllTimers();
	step = 1;
	
	_sprite_executePunch(step, sprite);
	
}

function _sprite_executePunch(step, sprite){
	
	punchDownTimer = setInterval( ()=>{

		sprite.frames.selected+=step;
		console.log('selected = '+sprite.frames.selected);
		
		if(sprite.frames.selected==sprite.frames.nb){
			console.log('max frames ['+sprite.frames.nb+'] reached, now decrease');
			step = -step;
		}
		
		if(sprite.frames.selected==0){
			console.log('loop of frames reached');
			clearInterval(punchDownTimer);
		}
		console.log(punchDownTimer);
		
		sprite.frames.coords.sx = sprite.frames.selected*sprite.frames.coords.sW;
		console.log('sprite sx = '+sprite.frames.coords.sx);

		_refreshCanvas(canvas, ctx, gameConfig);

	}, 26);

	_refreshCanvas(canvas, ctx, gameConfig);	
	
}


function __sprite_moveAndRefresh(positive){	//direction: positive==true for right, positive==false for left

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

	_refreshCanvas(canvas, ctx, gameConfig);
	
}















