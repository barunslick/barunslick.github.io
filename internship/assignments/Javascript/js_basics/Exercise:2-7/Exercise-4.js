var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]
function searchByName(obj, req_name){
    for (var each_fruit in obj){
        if (obj[each_fruit].name === req_name){
            return (obj[each_fruit]);
        }
    }
}
function searchByKey(obj, key_search,req_name){
    for (var each_fruit in obj){
        if (obj[each_fruit][key_search] === req_name){
            return (obj[each_fruit]);
        }
    }
}
console.log('Search by name: ',searchByName(fruits,'Apple'))
console.log('Search by key value pair: ',searchByKey(fruits, 'color' ,'Yellow'))