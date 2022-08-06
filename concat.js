let arr = [1, 5, 671, 123, 57, 23];
let arr1 = [25, 3, 56, 23, 4];
function concat(n) {
    let newArr = arr;
    for (i = 0; i < n.length; i++) {
        newArr[arr.length] = n[i];
    }
    return newArr;
}
console.log(concat([1,6,72,23]));
console.log(concat(arr1));
