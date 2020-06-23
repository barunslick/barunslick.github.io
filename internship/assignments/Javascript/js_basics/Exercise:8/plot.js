( function (){

var points = [
    {x: 10, y: 20},
    {x: 40, y: 40},
    {x: 160, y: 80},
    {x: 50, y: 90},
    {x: 120, y: 140},
    {x: 80, y: 50},
    {x: 170, y: 120},
    {x: 40, y: 40},
    {x: 160, y: 260},
];

var max_dimension = function(obj){
    var max_x = 0;
    var max_y = 0;
    Object.keys(obj).forEach(function (key){
        max_x = obj[key].x > max_x ? obj[key].x : max_x;
        max_y = obj[key].y > max_x ? obj[key].y : max_y;
    })
    return [max_x,max_y];
    
}(points);

var div_height = max_dimension[0] + 80;
var div_width = max_dimension[1] + 80;
var my_div = document.createElement('div');
my_div.style.height = div_height + 'px';
my_div.style.width = div_width + 'px';
my_div.style.border = '2px solid grey';
my_div.style.position = 'relative';
my_div.style.minWidth = 200 + 'px';
my_div.style.minHeight = 200 + 'px';
var point_height = 20;
var point_width = 20;

function createPoins(top_px, left_px){
    var point_div = document.createElement('div');
    point_div.classList.add = "point";
    point_div.style.position = 'absolute';
    point_div.style.width = point_height + 'px';
    point_div.style.height = point_width + 'px';
    point_div.style.borderRadius = 10 + 'px';
    point_div.style.backgroundColor = 'skyblue';
    point_div.style.top= 20+'px';
    point_div.style.top = top_px +'px';
    point_div.style.left = left_px +'px';
    return point_div;
}
document.body.appendChild(my_div);
for (var obj_keys in points){
    my_div.appendChild(createPoins(points[obj_keys].x, points[obj_keys].y))
}

}());