/*Count the number of divisors of a positive integer n.

Random tests go up to n = 500000, but fixed tests go higher.

Examples (input --> output)
4 --> 3 // we have 3 divisors - 1, 2 and 4
5 --> 2 // we have 2 divisors - 1 and 5
12 --> 6 // we have 6 divisors - 1, 2, 3, 4, 6 and 12
30 --> 8 // we have 8 divisors - 1, 2, 3, 5, 6, 10, 15 and 30
Note you should only return a number, the count of divisors. The numbers between parentheses are shown only for you to see which numbers are counted in each case. */

function getDivisorsCnt(n){
    // todo
    let acumulador = 0
    for(i=1; i<=n;i++){
        if(n % i ==0){
            acumulador=acumulador+1
        }
    }
    return acumulador
}
console.log()

/*Complete the function that takes two integers (a, b, where a < b) and return an array of all integers between the input parameters, including them.

For example:

a = 1
b = 4
--> [1, 2, 3, 4] */
function between(a, b) {
  // your code here
  let nestor = []
  for(i=a;i<=b;i++){
    nestor.push(i)
  }
  return nestor
}



function testEven(n) {
    //Your awesome code here!
  if (n%2==0){
    return true
  } else {
    return false
  }
}

console.log(testEven(5))