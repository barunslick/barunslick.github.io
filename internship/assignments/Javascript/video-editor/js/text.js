class Text{
    
    constructor(){
        this.topPosition = 0;
        this.leftPosition = 0;
        this.addDiv();
        this.mousePos1 = 0;
        this.mousePos2 = 0;
        this.mousePos3 = 0;
        this.mousePos4 = 0;
    }

    addDiv(){
        let containerDiv = document.querySelector('.video-all .all-video-holder');
        this.textDiv = document.createElement('div');
        this.textDiv.classList.add('text-div');
        this.textDiv.style.top = '0px';
        this.textArea = document.createElement('textarea');
        this.textArea.classList.add('inside-text-area');
        this.textArea.innerText = 'Hello this is text'
        this.textDiv.appendChild(this.textArea);
        containerDiv.appendChild(this.textDiv);
        this.makeDraggable(this.textDiv)
    }
}

Text.prototype.makeDraggable = function(toMoveDiv){
    toMoveDiv.onmousedown = function(e){
        e = e || window.event;
        console.log(this)
        this.mousePos3 = e.clientX;
        this.mousePos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        document.onmousemove = this.elementDrag;
    };
}

Text.prototype.dragMouseDown = function(e){
    e = e || window.event;
    console.log(this)
    this.mousePos3 = e.clientX;
    this.mousePos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    document.onmousemove = this.elementDrag;
    
}

Text.prototype.elementDrag = function(){
    console.log(this)
    console.log('yeet')
    e = e || window.event;
    this.mousePos1 = this.mousePos3 - e.clientX;
    this.mousePos2 = this.mousePos4 - e.clientY;
    this.mousePos3 = e.clientX;
    this.mousePos4 = e.clientY;
    this.textDiv.style.top = (this.textDiv.offsetTop - pos2) + "px";
    this.textDiv.style.left = (this.textDiv.offsetLeft - pos1) + "px";
}

Text.prototype.closeDragElement = function(){
    console.log('cjheck')
    document.onmouseup = null;
    document.onmousemove = null;
}