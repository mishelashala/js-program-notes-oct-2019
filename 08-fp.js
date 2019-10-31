// generate values thru functions
// functions first class citizens - functions are values
// no side effects - pure functions

var one = function () {
  return 1
}

one()

/**
 * Pure functions
 * - without side effects
 * - deterministic
 * - immutable
 * - without side behaviors
 */

var data = 10

// has a side behavior
function impureLogData() {
  console.log(data)
}

// impureLogData()

data = 20

// impureLogData()

// side effects
var data = 10

function incrementData() {
  data += 1
  console.log(data)
}

//incrementData()
//incrementData()

/**
 * Produce output values only based on the
 * arguments and the body of the function
 */
function incData(data) {
  return data + 1;
}

incData(10)
incData(10)

/**
 * Immutable approach
 * - modify somethig -> create a copy -> apply changes
 */
function updateFirstName(firstName, obj) {
  return {
    ...obj,
    firstName
  }
}

var john = { firstName: 'John' }

const updatedJohn = updateFirstName('Jenny', john)
john // { firstName: 'John' }
updatedJohn // { firstName: 'Jenny' }

function Adder(num) {
    this.num = num
}

Adder.prototype.inc = function () {
  this.num += 1
}

//const add = (x) => x + 1

//const adder = new Adder(1)

//adder.inc()
//adder.inc()
//adder

/**
 * Substitution Model
 */
function inc(x) {
  return x + 1
}

console.log(
1 + 1,
1 + 1 +1
)

/**
 * Referential Transparency
 * - pure funciton -> can be replaced by the value it produces
 */
function inc(x) {
  return x + 1
}
var two = 2

/**
 * Composition
 * - program made of small chunks
 * - bigger objects based on smaller objects
 * - aggregator pattern
 */

var serviceAggregator = {
  userService: {},
  accountService: {}
}

/**
 * Functions based on the composition of other functions
 */

function inc(x) {
  return x + 1
}

function mult(a, b) {
  return a * b
}

// (2 * (1 + 1))

var four = mult(2, inc(1))

four

// (g º f)(x)
function compose2(g, f, x) {
  return g(f(x))
}

// 3
compose2(inc, inc, 1)

/**
 * generic compose
 */
function compose(x, ...fns) {
  return fns.reduceRight(function (y, fn) {
    return fn(y)
  }, x)
}

function twice(x) {
  return x + x
}

compose(1, inc, inc, twice)

/**
 * Partial Application + Currying
 */
function adder(a, b) {
  function partiallyAppliedAdder(a) {
    return function (b) {
      return a + b
    }
  }

  if (a === undefined) {
    return adder
  }

  if (a !== undefined && b === undefined) {
    return partiallyAppliedAdder(a);
  }

  return a + b
}

console.log(
adder(2)(1)
)

/**
 * Currying -
 */
const curryfiedAdder = (a) => (b) => a + b

const addThree = curryfiedAdder(3)

addThree(1)
addThree(2)

var trueCompose = (...fns) => x => {
  return fns.reduceRight((y, fn) => fn(y), x)
}

/**
 * operation :: Number -> Number
 * Hinley Milner Syntax
 */
var operation = trueCompose(
  inc,
  addThree,
  adder(4)
)

operation(3)

/**
 * Tacit Programming - Point Free Stype Programming
 * functions created based on the composition of other
 * functions, and with an implicit calling point
 */
var john = {
  address: {
    extNumber: 10,
    streetName: 'St. Timothy'
  }
}

var prop = key => obj => obj[key]

// extNumber :: User -> String
var extNumber = trueCompose(
  prop('extNumber'),
  prop('address')
)

// streetName :: User -> String
var streetName = trueCompose(
  prop('streetName'),
  prop('address')
)

console.log(
extNumber(john),
streetName(john)
)

/**
 * OOP: data + methods
 * FP: data !+ functions
 */

