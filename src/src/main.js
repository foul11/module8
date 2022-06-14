import {Game} from './Game'

$(async function(){
	const game = new Game(window.innerWidth, window.innerHeight);
	
	//game.menu();
	//game.testCube();
	await game.init();
	await game.fight();
	
	game.camera3D.position.x = -0.22462295586776124;
	game.camera3D.position.y = 5.660326853898408;
	game.camera3D.position.z = 1.5273546772490758;
	
	game.controls3D.target.x = -0.22407199798894525;
	game.controls3D.target.y = 1.7583383246378157;
	game.controls3D.target.z = -0.09364331530518409;
	
	game.camera3D.updateProjectionMatrix();
	game.controls3D.update();
	
	$('.page').append(game.domElement);
	$(window).on('resize', (e) => {
		game.updateSize(window.innerWidth, window.innerHeight);
	});
	
	window.game = game;
});