// === SCOPE ===
// Lexical Scope (JavaScript) - function
// Static Scope (C, PHP, C++, Java) - block scope

/**
 * Function Scope
 */
function sayHi() {
  var message = 'Hello'
  //console.log(message)
}

sayHi()
sayHi()

{
  var message = 'asfadsfs'
}

// if {
//} else {
//}

function sayHi() {
  //console.log(message)
  var message = 'hi'
  function innerFn() {}
}

// Hoisting
// compiled-like version
function sayHi() {
  // only with var variables - functions
  var message;
  function innerFn() {}
  //console.log(message)
  message = 'hi'
}

// temporary death zone

// es6 - block scope

{
  let username = 'johndoe'
  const otherUsername = 'jennyDoe'
}

{
  // different scopes - different variables
  let username = 'johndoe'
  const otherUsername = 'jennyDoe'
}

var data = 10
var data = 20

// compiled-like version
var data;
data = 10
data = 20

// let repeated = 10
// let repeated = 20

// const a = 10
// const a = 20

{
  // this is gonna break (ReferenceError)
  // console.log(data)
  // const data = 10
}

// reassign variables
let reassignableData = 10
reassignableData = 20

const john = { firstName: 'John' }
// its gonna break - cannot reassign
// john = { firstName: 'Jenny' }
john.firstName = 'Jenny'

const list = [1, 2, 3]
list.push(4) // [1,2,3,4]

/**
 * Hoisting (variables and functions)
 */

/**
 * Temporary Death Zone
 */

/**
 * Block Scope
 */

/**
 * let & const
 */


// === CONTEXT ===

// this keyword
// Object
// Runtime created
// Depends on call site (how it is called)

/**
 * Global _this_
 */
//console.log(this) // nodejs: process
// browser: window
firstName = 'John Doe'

function getFirstName() {
  return this.firstName;
}

//console.log(
  getFirstName()
//)

/**
 * Call
 */
function getFirstName() {
  return this.firstName;
}

var john2 = {
  firstName: 'John Doe'
}

// call point
getFirstName.call(john2)

/**
 * _this_ inside objects
 */
firstName = 'Chuck'

var john1 = {
  firstName: 'John Doe',
  getFirstName: function () {
    return this.firstName
  }
}

var getChucksFirstName = john1.getFirstName

console.log(
  john1.getFirstName(),
  getChucksFirstName(),
)

/**
 * Object properties' are references
 */

/**
 * Bind
 */
var john4 = {
  firstName: 'John'
}

var jenny = {
  firstName: 'Jenny'
}

function getFirstName() {
  return this.firstName
}

var getJohnFirstName = getFirstName.bind(john4)
var getJennyFirstName = getFirstName.bind(jenny)

console.log(
  getJohnFirstName(),
  getJennyFirstName()
)

/**
 * new operator
 */
function Person(firstName) {
  this.firstName = firstName;
}

var j = new Person('John')

/**
 * Avoid using this
 */


