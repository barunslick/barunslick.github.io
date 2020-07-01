export default class InputHandler {

	constructor (game){
		this.game = game
		this.createEventListener(this.game);
	}

	createEventListener(game) {
		document.addEventListener( 'keydown', e => {
			if (e.keyCode == 65){ //go left
				game.userCar.goLeft();
			}
			else if(e.keyCode == 68){ //go right
				game.userCar.goRight();
			}
			else if (e.keyCode == 32){
				game.userCar.shoot();
			}
		})
	}

}