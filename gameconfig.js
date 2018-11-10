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
					dxOffset: 60,	//offset lors du deplacements de ce sprite
					dy: -95, 
					dyOffset: 16,	//offset lors du saut de ce sprite
					dW: 719, 
					dH: 600
				}
			}
		}
	]
}

