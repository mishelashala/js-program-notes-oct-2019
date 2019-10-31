function countTo(num) {
  if (num === 0) {
    return
  }

  console.log(num)
  countTo(num - 1)
}

//countTo(10)

/**
 * for loop
 * while loops - do while loops
 */

// linked list - lista enlazada - list ligada - list
function pair(head, tail) {
  return [head, tail]
}

  pair(1, pair(2, pair(3, null)))

function head(list) {
  return list[0]
}

function tail(list) {
  return list[1]
}

//var list = pair(1, pair(2, pair(3, null)))

//console.log(
//  head(list)
//  tail(list)
//)

/**
 * Imperative programming
 * - how to do things
 *
 * Declarative programming
 * - what to do things
 */

var arr = [1,2,3,4]

// imperative
for(var i = 0; i <= arr.length; i++) {
  // console.log(arr[i])
}

// declarative
// arr.forEach(x => console.log(x))

/**
 * how traverse the list declarativaly
 */
function traverse(list) {
  if (list === null) {
    return null;
  }

  console.log(head(list))
  return traverse(tail(list))
}

////traverse(list)

function forEach(fn, list) {
  if (list === null) {
    return null
  }

  fn(head(list))
  return forEach(fn, tail(list))
}

//forEach(console.log, list)

/**
 * how to construct a list
 */
function list(...elements) {
  return elements.reduceRight((l, element) => {
    return pair(element, l)
  }, null)
}

list(1, 2, 3) // [1, [2, [3, null]]]

/**
 * Append
 */
function append(a, b) {
  if (a === null) {
    return b
  }

  return pair(head(a), append(tail(a), b));
}

append(list(1,2,3), list(4,5,6))

/**
 * Data Structures
 */
class Node {
  constructor(val) {
    this.next = null;
    this.val = val
  }
}

class List {
  constructor() {
    head = null
  }

  add(node) {
    if (head === null) {
      this.head = node
    } else {
      var current = head
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
  }
}

/**
 * Abstractions
 */

// ======================================
/**
 * tacit programming - point style programming
 */

/**
 * Continuatium Passing Style - CPS
 * - no return statements
 * - no execution halts
 * - error first
 */

function inc(x, fn) {
  if (x % 2 !== 0) {
    fn(new Error('No odd numbers'))
  }

  fn(null, x + 1)
}
/*
inc(2, function (err, two) {
  // early return
  if (err !== null) {
    return console.log('Something went wrong')
  }

  console.log(two)
  inc(3, function (err, three) {
    if (err !== null) {
      return console.log('Something went wrong')
    }

    console.log(two, three)
  })
})
*/

/**
 * Deferrable object
 * - defer
 *
 * Promise
 * - then
 * - wrapper
 * - unit of async work - something that produces a value async
 */

// eagerly - once create gets executed
var p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(1)
    // reject(new Error('Something went wrong'))
  }, 2000)
})

// Stages:
// - Pending
// - Resolved
// - Reject
// - Settled (resolved / rejected)
/*p
  .then(function onSuccess(x) {
    return Promise.reject(new Error('Other error'))
    // return Promise.resolve(x + 1)
  })
  .then(function (x) {
    console.log(x)
  })
  .catch(function (err) {
    console.log(err.message)
  })
*/

const fs = require('fs')

function promisifiedReadFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

promisifiedReadFile('01-basics.js')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })

/**
 * Async + Await
 * Syntactic Sugar
 */

(async function execute() {
try {
  // sequential
  const data = await promisifiedReadFile('01-basics.js')
  const other = await otherPromise();

  await Promise.all([
    
  ])
} catch(err) {
  console.log(err)
}
}())

