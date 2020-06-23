var num = window.prompt('Enter a number');
my_div = document.getElementById('array_loop')
for( var i = num; i> 0; i--){
    p = document.createElement('p');
    p.innerHTML = '*'.repeat(i);
    my_div.appendChild(p);
}