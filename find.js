let arr = [
  { user: 'john', phone: 0900000000, gender: 'male' },
  { user: 'may', phone: 0900000002, gender: 'female' },
  { user: 'johnson', phone: 0900000001, gender: 'male' },
];
// console.log(arr[1].gender)
function find() {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === 'male') {
      return arr[i];
    }
  }
}
console.log(find());

console.log(
  arr.find((profile) => {
    return profile.gender === 'male';
  })
);
