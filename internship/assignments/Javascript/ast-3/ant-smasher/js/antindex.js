my_ant = new Ant(600,20,3);
my_ant.draw();

function animate(){

    my_ant.updatePosition();
    my_ant.draw();
    window.requestAnimationFrame(animate);
}

animate();