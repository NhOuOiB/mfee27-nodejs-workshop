let arr = [1, 5, 671, 123, 57, 23];
let arr1 = [999,998,997,996]
function concat(n) {
    let arrLength = arr.length;

    // console.log(arrLength);
    for(let i = 0;i < n.length;i++){
        arr[arrLength] = n[i]
        arrLength = arr.length;
    }
        console.log(arr)
}


concat([1,26,33,67]);
// newArr=arr.concat(1,26,33,67);
// console.log(newArr);