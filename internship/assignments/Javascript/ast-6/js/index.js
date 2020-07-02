const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

let maxCircleSize = 10;
let rows = 12, columns = 12;
let angle = 0, frame = 0 ,speed = 0.04;
let repeat = 2;
function render(){
    ctx.clearRect(0,0,500,500);
    frame++;
    angle = frame * speed;
    for(let k = 0; k < repeat; k++){
        let repeatOffset = angle + map(k, 0, repeat, 0, Math.PI);
        for(let j = 0; j < columns; j++){
            let colOffset = map(j, 0, columns, 0 , Math.PI);
            let x = 100 + j* 30;
            for(let i =0; i < rows; i++){
                let y = 100 + i * 20 + Math.sin(repeatOffset + colOffset) * 50;         
                let sizeDiffernce = (Math.cos(repeatOffset - i / rows + colOffset) + 1) * 0.5;
                let radius = sizeDiffernce * maxCircleSize;
                let circle = new Circle(ctx,x,y,radius,k,j,i);
                circle.draw();
            }
        }
    }
    requestAnimationFrame(render);
}

function map (n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  };

requestAnimationFrame(render)