( function (){

var points = [
    [
        {x: 10, y: 20},
        {x: 40, y: 40},
        {x: 160, y: 80},
        {x: 50, y: 90},
        {x: 120, y: 140},
        {x: 80, y: 50},
        {x: 170, y: 120},
        {x: 40, y: 40},
        {x: 160, y: 260}
    ],
    [
        {x: 50, y: 70},
        {x: 70, y: 90},
        {x: 360, y: 80},
        {x: 250, y: 298},
        {x: 120, y: 240},
        {x: 80, y: 50},
        {x: 110, y: 120},
        {x: 240, y: 40},
        {x: 60, y: 260}
    ],
    [
        {x: 100, y: 20},
        {x: 40, y: 140},
        {x: 160, y: 80},
        {x: 250, y: 90},
        {x: 160, y: 140},
        {x: 40, y: 150},
        {x: 170, y: 120},
        {x: 40, y: 40},
        {x: 110, y: 60},
        {x: 170, y: 120},
        {x: 240, y: 40},
        {x: 160, y: 60}
    ],
    [
        {x: 100, y: 200},
        {x: 140, y: 140},
        {x: 160, y: 180},
        {x: 50, y: 90},
        {x: 60, y: 40},
        {x: 140, y: 50},
        {x: 70, y: 120},
        {x: 140, y: 140},
        {x: 10, y: 60},
        {x: 110, y: 120},
        {x: 240, y: 40},
        {x: 60, y: 60}
    ],
    [
        {x: 100, y: 20},
        {x: 40, y: 140},
        {x: 60, y: 180},
        {x: 250, y: 90},
        {x: 160, y: 10},
        {x: 40, y: 150},
        {x: 10, y: 120},
        {x: 140, y: 140},
        {x: 110, y: 60},
        {x: 170, y: 120},
        {x: 240, y: 140},
        {x: 60, y: 260}
    ]

];

p = document.createElement('p');
p.innerHTML = 'Each div changes dynamically to fit its content. Press the point to toggle between original color and skyblue';
document.body.appendChild(p);
function OuterDiv(points){
    this.dimension = this.findMaxDimension(points);
    this.div_height = this.dimension[0] + 80;
    this.div_width = this.dimension[1] + 80;
    this.element = document.createElement('div');
    this.element.style.height = this.div_height + 'px';
    this.element.style.width = this.div_width + 'px';
    this.element.style.border = '2px solid grey';
    this.element.style.display = 'inline-block';
    this.element.style.position = 'relative';
    this.element.style.margin = 80 + 'px';
    document.body.appendChild(this.element);

}
OuterDiv.prototype.findMaxDimension = (point_collection) => {
    let max_x = 0;
    let max_y = 0;
    for(let point of point_collection){
        max_x = point.x > max_x ? point.x : max_x;
        max_y = point.y > max_y ? point.y : max_y;
    }
    return [max_x,max_y];
}

function Point(point,size=16,color='skyblue',outerContainer){
    this.size = size;
    this.color = color;
    this.originalColor = color;
    this.point_element = document.createElement('div');
    this.point_element.style.position = 'absolute';
    this.point_element.style.width = this.size + 'px';
    this.point_element.style.height = this.size + 'px';
    this.point_element.style.borderRadius = this.size /2 + 'px';
    this.point_element.style.backgroundColor = this.color;
    this.point_element.style.top = (outerContainer.div_height - point.x - this.size/2) +'px';
    this.point_element.style.left = (point.y - size/2) +'px';    
    outerContainer.element.appendChild(this.point_element);


    this.point_element.addEventListener('click', function (){
        this.setColor();
    }.bind(this));
    
    
}

Point.prototype.setColor = function(){
    if (this.color == this.originalColor){
        this.color = 'skyblue';   
    }else{
        this.color = this.originalColor;
    }
    this.point_element.style.backgroundColor = this.color;
}


for (var point_array of points){
    var my_div = new OuterDiv(point_array);
    for(var point of point_array ){
        var my_point = new Point(point,16,'green',my_div);
    }
}

}());
