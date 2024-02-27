let a = [5, 7, 9, 6, 4, 3]
let b = 7
const index = a.findIndex(itm => itm === b)
console.log(index);
// up
a[index - 1] = a[index];
a[index] = a[index - 1]

console.log(a);