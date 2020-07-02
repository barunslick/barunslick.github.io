export default class InputHandler{
    constructor (game){
		this.game = game
		this.createEventListener(this.game);
	};

	createEventListener(game) {
		document.addEventListener( 'click', _ => {
			this.handler();
        });
        document.addEventListener('keyup', e =>{
            if (e.key == ' ') this.handler();  
        });
    };
    
    handler(){
        if (this.game.gameStatus == 0){
            this.game.gameStatus = 1;
        }else if (this.game.gameStatus == 1){
            if (this.game.bird.y >= 0) this.game.bird.moveUp();;
            
        }else{
            this.game.score = 0;
            this.game.gameStatus = 1;
        };
    };
};