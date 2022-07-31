let array = [1, 9, 16, 64];
function map() {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        // newArr.push(Math.sqrt(array[i]));
        newArr[i] = Math.sqrt(array[i]);
    }
    console.log(newArr);
}
map();
newArray = array.map(Math.sqrt);
console.log(newArray);
