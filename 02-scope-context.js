// === SCOPE ===
// Lexical Scope (JavaScript) - function
// Static Scope (C, PHP, C++, Java) - block scope

/**
 * Function Scope
 */
function sayHi() {
  var message = 'Hello'
  console.log(message)
}

sayHi() // > 'Hello'
sayHi() // > 'Hello'

function sayHi() {
  console.log(message)
  var message = 'hi'
}

sayHi() // > undefined

// Hoisting
// compiled-like version
function sayHi() {
  // only with var variables - functions
  var message;
  function innerFn() {}
  // temporary death zone - declared, but not initialized
  console.log(message)
  message = 'hi'
}

sayHi() // > undefined

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

// Duplicated - Error
// let repeated = 10
// let repeated = 20

// Duplicated - Error
// const a = 10
// const a = 20

{
  // this is gonna break (ReferenceError)
  // console.log(data)
  const data = 10
}

// reassign variables
let reassignableData = 10
reassignableData = 20

const john = { firstName: 'John' }
// it's gonna break - cannot reassign
// john = { firstName: 'Jenny' }
john.firstName = 'Jenny'

const list = [1, 2, 3]
list.push(4) // [1,2,3,4]

// === CONTEXT ===

// this keyword
// Object
// Runtime created
// Depends on call site (how it is called)

/**
 * Global _this_
 */
// console.log(this) - nodejs: process
// console.log(this) - browser: window
firstName = 'John Doe' // window.firstName = 'John Doe'

function getFirstName() {
  return this.firstName;
}

getFirstName() // 'John Doe'

/**
 * Call
 */
function getFirstName() {
  return this.firstName;
}

var jenny = {
  firstName: 'Jenny Doe'
}

// call point
getFirstName.call(jenny) // 'Jenny Doe'

/**
 * _this_ inside objects
 */
firstName = 'Chuck'

var john = {
  firstName: 'John Doe',
  getFirstName: function () {
    return this.firstName
  }
}

var getChucksFirstName = john.getFirstName

john.getFirstName() // 'John Doe'
// Object properties' are references
getChucksFirstName() // 'Chuck'

/**
 * Bind
 */
var john = {
  firstName: 'John'
}

var jenny = {
  firstName: 'Jenny'
}

function getFirstName() {
  return this.firstName
}

var getJohnFirstName = getFirstName.bind(john)
var getJennyFirstName = getFirstName.bind(jenny)

getJohnFirstName() // 'John'
getJennyFirstName() // 'Jenny'

/**
 * new operator
 */
function Person(firstName) {
  this.firstName = firstName;
}

var john = new Person('John') // { firstName: 'John' }
