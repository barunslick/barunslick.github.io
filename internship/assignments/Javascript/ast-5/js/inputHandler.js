export default class InputHandler{
    constructor (game){
		this.game = game
		this.createEventListener(this.game);
	}

	createEventListener(game) {
		document.addEventListener( 'click', _ => {
			this.handler();
        })
        document.addEventListener('keypress', e =>{
            if (e.key == ' ') this.handler();  
        })
    }
    
    handler(){
        if (this.game.gameStatus == 0){
            this.game.gameStatus = 1;
        }else if (this.game.gameStatus == 1){
            this.game.bird.y -= 100;
        }else{
            this.game.score = 0;
            this.game.gameStatus = 1;
        }
    }


}