function sum(n) {
    let total = 0;
    for (i = 1; i <= n; i++) {
        total += i;
    }
    console.log(total);
}
sum(3);
sum(5);
sum(10);

function sum1(n) {
    return ((n + 1) * n) / 2;
}
sum1(3);
sum1(5);
sum1(10);
function sum3(n) {
  if (n === 1) {
    return n;
  }else
  return sum3(n - 1) + n;
}

console.log(sum3(3));
sum3(5);
sum3(10);
