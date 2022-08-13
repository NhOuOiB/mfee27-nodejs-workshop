let arr = [1, 5, 8, 21, 54, 3];
function reduce() {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  console.log(total);
}
reduce();

let reduceTotal = arr.reduce((a, b) => {
  return a + b;
});
console.log(reduceTotal);
