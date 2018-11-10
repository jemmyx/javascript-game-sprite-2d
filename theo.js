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

let MainGame = new Game();
let spriteA = new Sprite();

console.log(spriteA);

spriteA.test();

MainGame.init();



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
		map = [];
	}else if( this.testSimpleKey(65) || this.testSimpleKey(37) ){

		spriteA.sprite_moveAndRefresh(false);

	}else  if( this.testSimpleKey(68) || this.testSimpleKey(39) ){

		spriteA.sprite_moveAndRefresh(true);
		
	}else  if( this.testSimpleKey(32)){
		
		if(e.type=='keydown'){
			spriteA.sprite_jumpAndRefresh();
		}
		
	}else  if( this.testSimpleKey(83) || this.testSimpleKey(40) ){
		
		if(e.type=='keydown'){
			spriteA.sprite_punchDownTimerUpAndRefresh();
		}
		
		
	}else  if( this.testSimpleKey(87) || this.testSimpleKey(38) ){

		if(e.type=='keydown'){
			spriteA.sprite_punchUpTimerUpAndRefresh();
		}

	}else  if( this.testSimpleKey(76) ){

		if(e.type=='keydown'){
			spriteA.sprite_FallbackAndRefresh();
		}

	}
	
}


function testSimpleKey(key){
	return map[key]!=undefined && map[key]===true;
}


function testDoubleKeys(key1, key2){
	return ( map[key1]!=undefined && map[key2]!=undefined ) && ( map[key1]===true && map[key2]===true );
}