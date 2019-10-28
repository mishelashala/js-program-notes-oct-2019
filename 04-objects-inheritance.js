/**
 * Object creation
 */

// literal object
var literalObject = {}
// Object.create
Object.create(null) // {}
// new Object
new Object() // {}
// new FunctionName()
function Person() {}
var john = new Person() // {}

/**
 * Objects are dynamic bags of key-value pairs
 */
var john = {}

john.firstName = 'John'

// ...
delete john.firstName
john // {}

/**
 * Objects can have behavior
 */
var john = {
  firstName: 'John',
  getFirstName: function () {
    return this.firstName
  }
}

john.getFirstName() // 'John'

/**
 * Objects already come up with torta bajo el brazo
 */
// Object
john.toString()

/**
 * In JS everything is an object
 * (if it's not a built in type)
 */

// functions

// arrays

/**
 * Everything inherits from the global object Object
 */

/**
 * Multi paradign - multiple types of inheritance
 */

// prototypes (delegational inheritance)

// own properties
var male = {
  gender: 'male'
}

var john = {
  firstName: 'John'
}

Object.getOwnPropertyNames(john)
Object.setPrototypeOf(john, male)

john.gender
Object.getOwnPropertyNames(john),
Object.getPrototypeOf(john)

// own properties vs inherited properties
john.gender // own properties -> male -> Object -> undefined

// using Object.setPrototypeOf make the object dog
// from the object animal.
// Make sure it complies with the following api:
var animal = {
  wakeUp: function () {
    // log 'woof woof' into to the screen
  }
}

var dog = {
  bark: function () {
    // log 'woof woof' in to the screen
  }
}

dog.wakeUp()
dog.barf()

// mixins (concatenative inheritance)
var male = {
  gender: 'sex'
}

var csStudent = {
  year: 1
}

var johh = {
  year: csStudent.year,
  gender: male.gender
}

var john = Object.assign({}, male, csStudent)

// spread operator
var john = {
  ...male,
  ...csStudent,
}

// functional mixins (closures + mixins)
const person = (firstName) => (target = {}) => {
  function getFirstName() {
    return firstName
  }
  return {
    ...target,
    getFirstName
  }
}

const student = (year, course) => (target = {}) => {
  function getYear() {
    return year
  }

  function getCourse() {
    return course
  }

  return {
    ...target,
    getYear,
    getCourse
  }
}

// function composition
var john = student(1, 'algorithms', person('john'))

const compose = (...fns) => x => fns.reduceRight((y, fn) => fn(y), x)

// duck typing
var makePersonStudent = compose(
  student(1, 'algorithms'),
  person('john')
)

makePersonStudent({ data: 'hehe' }) // { getYear: [Function], getCourse [Function], getFirstName: [Function] }

/**
 * Functions as constructors
 */
function Vehicle(type) {
  this.type = type
}

Vehicle.prototype.getType = function () {
  return this.type
}

function Car(model) {
  Vehicle.apply(this, ['Car']) // super()
  this.model = model
}

Car.prototype.getModel = function () {
  return this.model
}

var tsuru = new Car('tsuru')

// it's possible to have multiple inheritance in JS,
// but it`'s too comple.
// Recomendation: Avoid multiple inheritance
class Vehicle1 {
  constructor(type) {
    this.type = type
  }

  getType() {
    return this.type
  }
}

class Car1 extends Vehicle1 {
  constructor(model) {
    super('Cary')
    this.model = model
  }

  getModel() {
    return this.model
  }
}

interface IPerson {
  firstName: string;
}

const person = (firstName: string): IPerson => ({
  firstName
})

