var numbers = [5, 2, 3, 4];

function transform(collection, tranFunc) {
    var new_arr = [];
    for (var single_item_key in collection){
        new_arr.push(tranFunc(collection[single_item_key]));
    }
    return new_arr;
};

var output = transform(numbers, function(num) {
    return num * 2;
});

console.log(output);
