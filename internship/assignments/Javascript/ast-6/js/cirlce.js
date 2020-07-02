class Circle {

	constructor(ctx,x, y,radius, strand ,col ,row) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.ctx = ctx;
		this.strand = strand;
		this.col =col;
		this.row = row;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.getColor();
		this.ctx.fill(); 
	}

	getColor(){
		if(this.col < 6){
			if(this.row < 6){
				return '#f69740';
			}else{
				return '#7d98ff';
			}
		}else{
			if(this.row < 6){
				return '#8dcb00';
			}else{
				return '#fcd100';
			}
		}
	}
}