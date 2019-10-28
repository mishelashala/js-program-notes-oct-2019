/**
 * Closures
 */

// Lexical Scope
var data = 10

function logData() {
  console.log(data)
}

//logData();

/**
 * Inner functions
 */
var data1 = 10

function logData() {
  var innerData = 10
  function logInnerData() {
    console.log(innerData, data1)
  }

  logInnerData()
}

// logData()

/**
 * Shadowing
 */
var data2 = 10

function logData() {
  var data2 = 20
  console.log(data2)
}

var data3 = 10

function logData(data3) {
  var data3 = 20
  console.log(data3)
}

// logData(data2)

/**
 * References & Scope Chain
 */

/**
 * OOP with factory functions
 */
// javascript
class Person {
  constructor(firstName) {
    this.firstName = firstName;
  }
}

// Java/C++/C#/PHP
/*class Person {
  private firstName;

  constructor(firstName) {
    this.firstName = firstName;
  }
}*/

var john = new Person('John') // { firstName: 'John' }

/**
 * Every property is public (no access modifiers)
 */
var j = {
  firstName: 'John'
}

j.firstName // 'John'
j.firstName = 'Jenny' // 'John'
j.firstName // 'Jenny'

/**
 * _privateProp convention
 */
var j1 = {
  _firstName: 'John'
}

j1._firstName // 'John'
j1._firstName = 'Jenny' // 'John'
j1._firstName // 'Jenny'

/**
 * Meta properties
 */
var jenny = {}

Object.defineProperty(jenny, 'firstName', {
  enumerable: true,
  value: 'Jenny'
})

// console.log(jenny) // {}

jenny.firstName // 'Jenny'
jenny.firstName = 'wut'
jenny.firstName // 'wut'

Object.getOwnPropertyNames(jenny) // ['firstName']

/**
 * Data Privacy + Encapsulation
 */
// factory function
function person(first) {
  var firstName = first

  function getFirstName() {
    return firstName
  }

  function setFirstName(newFirstName) {
    firstName = newFirstName
  }

  // PUBLIC API
  return {
    getFirstName,
    setFirstName
  }
}

//var jenny1 = person('Jenny')
//jenny1.setFirstName('John')
//console.log(
//jenny1.getFirstName()
//)

/**
 * IIFE
 * Immidiatly-Invoked Function Expression
 * Modules
 */
var john5 = (function iife(fn) {
  var firstName = fn

  function getFirstName() {
    return firstName
  }

  return {
    getFirstName
  }
}('John'))

console.log(john5)

/**
 * No more this!!!! :D
 */

/**
 * Excercise
 */
// define a factory function called Vehicle that
// accepts a type as argument and returns
// object with the following interface:
// {
//   getVelocity: [Function],
//   accelerate: [Function],
//   deaccelerate: [Function]
// }
// and that behaves in the following way
var car = vehicle('car')
car.getVelocity() // 0
car.accelerate()
car.getVelocity() // 10
car.deaccelerate()
car.getVelocity() // 0

// define a module called shoppingCard
// that exposes the following api
// { addProduct: [Function],
//   removeProduct: [Function],
//   getProductList; [Function] }
// and behaves in the following way
var shoppingCard = (function () {
  // your api goes here
  return {
    // TODO: add functions here
  }
}())

shoppingCard.addProduction({ name: 'Shirt', price: 30 })
shoppingCard.addProduction({ name: 'Razor Blades', price: 3 })
shoppingCard.getProductList() // [{name:'Shirt',price:30}, {name: 'Razor Blades',price:3}]
shoppingCard.removeProduct('Shirt')
shoppingCard.getProductList() // [{name: 'Razor Blades',price:3}]

// define a module called paymentProcessor that
// accepts a shopping cart as argument and exposes
// the follosing api
// { calculateTotal: [Function] }
// and behaves in the following way


shoppingCard.addProduction({ name: 'Shirt', price: 30 })
shoppingCard.addProduction({ name: 'Razor Blades', price: 3 })

var paymentProcessor = (function (shoppingCard) {
  // your api goes here
  return {
    // TODO: add functions
  }
}()) // pass your existing module here

paymentProcessor.calculateTotal() // 33

