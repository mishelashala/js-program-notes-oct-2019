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
1 + 1 // 2
2 * 2 // 4
2 / 1 // 2
3 % 2 // 1

'Hello' + ' ' + 'world' // 'Hello World'

// coercion
1 + 2 // 3
'1' + 2 // '12'
1 + '2' // '12'

// Augmented types vs Built In types
Number('12') // Number 12
String(12) + String(12) // '1212'
Boolean(true) // Boolean true
Symbol('sym') // Symbol('sym')
Object() // Object {}
Array() // Array []
null // null
undefined // undefined

var num = 10.123456;
Number(num).toFixed(2) // 10.12

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
1 == '1' // true
1 === '1' // false
'1' === '1' // false
{ firstName: 'John' } === { firstName: 'John' } // false

// undeclared vs undefined
var john = 'asdfasdf'
var num; // undefined

// asdfasdf.toFixed(2) // ReferenceError

// falsy & truthy values
Boolean('') // false
Boolean(null) // false
Boolean(undefined) // false
Boolean(false) // false
Boolean(0) // false

Boolean(-1) // true
Boolean(1) // true
Boolean({}) // true
Boolean([]) // true
Boolean(true) // true
Boolean(Symbol('asdf')) // true

// NaN
// Not a Number
typeof NaN // 'number'

1 / 'asdfasdf' // NaN
1 / [1,2,3] // NaN

// array operations
var list = [1,2,3]
list[0] // 1
list[1] // 2
list[2] // 3

var str = '123' // ['1', '2', '3']
str[0] // '1'
str[1] // '2'
str[2] // '3'
