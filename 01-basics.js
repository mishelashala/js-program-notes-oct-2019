/**
 * Built in types
 */

// null
var nullVar = null

// undefined
var undefinedVar = null

// boolean
var boolVar = true // false

// number
var a = 10.0

// string
var name = 'John Doe'
var other = "Jenny Doe"
var otherOther = `Hehehe`

// object
var john = {
  firstName: 'John',
  lastName: 'Doe'
}

john.lastName // 'Doe'
john['firstName'] // 'John'

var key = 'firstName'

john[key] // 'John'
john['first' + 'Name'] // 'John'

// symbol - es6
var sym = Symbol('sym') // Symbol('sym')
var sym2 = Symbol('sym') // Symbol('sym')

// typeof
var firstName = 'John'
typeof firstName === 'string'

// functions

// function declaration
function sayGoodBye() {
  console.log('Goodbye world')
}

function sayHi() {
  // callable
  console.log('Hello world')
  sayGoodBye()
}


// function expression
// first-class citizens
// functions are values
var hello = function helloFun() {
  console.log('hi')
}

function log(msg) {
  console.log(msg)
}

function logMessage(logFn, msg) {
  logFn(msg)
}

logMessage(log, 'Give em hell')

// basic operations (+, *, /, %)
/*
console.log(1 + 1)
console.log(2 * 2)
console.log(2 / 1)
console.log(3 % 2) // 1

console.log('Hello' + ' ' + 'world') */

// coercion
//console.log(1 + 2) // 3
//console.log('1' + 2) // '12'
//console.log(1 + '2') // '12'

// Augmented types vs Built In types
// console.log(Number('12'))
// console.log(String(12) + String(12))
// Boolean()
// Symbol('sym')
// null
// undefined
// Object()
// Array()
var num = 10.123456;
Number(num).toFixed(2)

// Boxing & Unboxing
// built in type
var num2 = 10.1010101

// augmente type's method
num2.toFixed(2) // Number(num2).toFixed(2)

// arrays are objects
var list = [1,2,3]
typeof list // 'object'
Array.isArray(list)

// double equal vs triple equal
// console.log(1 == '1')
// console.log(1 === '1')
// console.log('1' === '1')
// console.log({ firstName: 'John' } === { firstName: 'John' })

// undeclared vs undefined
var john = 'asdfasdf'
var num; // undefined

// console.log(asdfasdf.toFixed(2))

// falsy & truthy values
'' // false
null // false
undefined // false
false // false
0 // false

-1 // true
1 // true
{} // true
[] // true
true // true
Symbol('asdf') // true

// !! vs Boolean
Boolean('') // false
Boolean([]) // true

// NaN
// Not a Number
//console.log(typeof NaN)

// console.log(1 / 'asdfasdf')
// console.log(1 / [1,2,3])

// array operations
var list = [1,2,3]
console.log(list[0])
console.log(list[1])
console.log(list[2])

var str = '123' // ['1', '2', '3']
console.log(str[0])
console.log(str[1])
console.log(str[2])

