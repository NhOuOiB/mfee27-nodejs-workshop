let arr = [
  { user: 'john', phone: 0900000000, gender: 'male' },
  { user: 'may', phone: 0900000002, gender: 'female' },
  { user: 'johnson', phone: 0900000001, gender: 'male' },
];

// console.log(arr[1])

function filter() {
  let newArr = [];
  for (let i = 0; i < arr.length; i++)
    if (arr[i].gender === 'male') {
      newArr.push(arr[i]);
    }
  console.log(newArr);
  return newArr;
}
filter();
