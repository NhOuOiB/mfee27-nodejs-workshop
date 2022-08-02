// 還沒寫完
let arr = [1, 5, 671, 123, 57, 23];
let arr1 = [999,998,997,996]
function push(n) {
    let arrLength = arr.length;

    // console.log(arrLength);
    for(let i = 0;i < n.length;i++){
        arr[arrLength] = n
        arrLength = arr.length;
    }
        console.log(arr)
}

// console.log(push([3,5]))
push(3,5)

