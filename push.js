let arr=[1,6,3,2,57];
push = (...num) => {
  for (let i=0; i<num.length;i++){
    arr[arr.length]=num[i];
  }
  console.log(arr);
}
push(1,8,45,56)
