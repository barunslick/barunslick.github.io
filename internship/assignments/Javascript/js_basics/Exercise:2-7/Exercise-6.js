var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    return array.slice().sort(function(a,b){
        if (a[key].toUpperCase() < b[key].toUpperCase()) {
            return -1;
        }else if(a[key].toUpperCase() > b[key].toUpperCase()){
            return 1;
        }
        else{
            return 0;
        }
    });
}
console.log('barun')
var sorted = sortBy(arr, 'name');
console.log(sorted);