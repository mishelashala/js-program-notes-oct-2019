# SCOPE

JavaScript tiene _lexical scope_, es decir: el _scope_ se crea cada vez que se ejecuta una funcion. A
diferencia de otros lenguajes como C/C++, PHP, Java, donde el _scope_ es estatico (de bloque).

```js
// Example: 1.1 Function Scope
function sayHi() {
  var message = "Hello";
  console.log(message);
}

sayHi(); // > 'Hello'
sayHi(); // > 'Hello'
```

En el ejemplo 1.1 declaramos una funcion llamada `sayHi`, dentro del cuerpo de la funcion declaramos e inicializamos
la variable `message` con el valor `"Hello"` para posteriormente mostrarla en consola.

Despues ejecutamos `sayHi` dos veces. Cada ejecucion de `sayHi` crea una variable completamente independiente de la otra,
dicha variable vive en su propio _scope_ (completamente independiente uno de la otro).

Debido a que el _scope_ esta atado a la ejeucion de una funcion toda variable debe estar disponible en todo momento del
ciclo de vida de la fucnion. Para asegurar esto, javascript tiene un mecanismo llamado _hoisting_.

```js
// Example 1.2: Hoisting
function sayHi() {
  console.log(message);
  var message = "hi";
}

sayHi(); // > undefined
```

En lenguajes con _static scope_ el codigo anterior produciria un error: estamos intentando hacer referencia
a una variable que aun no ha sido declarada (ni inicializada); en javascript no es el caso.

Como ya habiamos dicho: toda variable debe estar disponible durante todo el tiempo de vida de esta funcion.
Para garantizar esto el compilador de javascript andaliza todo el codigo (antes de ejecutarlo) y si encuentra
alguna declaracion (tanto de variables como de funciones) mueve tal declaracion al principio del cuerpo de
la funcion en la que fue declarada.

```js
// Example 1.3: Hoisting in action
// compiled-like version
function sayHi() {
  var message;
  console.log(message);
  message = "hi";
}

sayHi(); // > undefined
```

El ejemplo 1.3 muestra una representacion (aproximada) del codigo que el compilador produciria despues de
analizar el codigo y mover las declaraciones hasta el principio de nuestra funcion.

Este comportamiento (hoisting) genera un efecto comunmente llamado _temporary death zone_ (_TDZ_).
La _TDZ_ ocurre cuando nosotros intentamos hacer referencia a una variable que existe en el _scope_
actual, pero aun no ha sido inicializada.

En el ejemplo 1.3 y 1.2 nosotros referenciamos primero message y despues lo inicializamos. Todas las
variables en javascript (al ser declaradas, pero inicializadas) son asignadas al valor _undefined_.

```js
// Example 1.4
function sayHi(goodBye) {
  if (goodBye) {
    var message = "Good Bye";
  } else {
    var mesage = "Hello There";
  }

  console.log(message);
}
```

En el ejemplo 1.4 anterior uno pensaria que la variable `message` dentro del cuerpo del _if statement_
es diferente del que esta en el cuerpo del _else statement_. Pero debido a que ambas variables tienen
el mismo identificador (nombre) javascript las trata como la misma variable.

```js
// Example 1.5
function sayHi(goodBye) {
  var message;

  if (goodBye) {
    message = "Good Bye";
  } else {
    mesage = "Hello There";
  }

  console.log(message);
}
```

El ejemplo 1.5 es una aproximacion al codigo que el compilador produciria despues de mover las declaraciones
hasta la primera linea del cuerpo de la funcion `sayHi`. Si el compilador encuentra variables (con la
palabra reservada _var_) con el mismo nombre, entonces las trata como la misma variable.

### ES6

`ES6` introduce dos tipos nuevos de variables: `let` y `const`; y ademas introduce _static scope_
(scope de bloque).

```js
// Ejemplo 1.6 - let and const
{
  let username = "johndoe";
  const otherUsername = "jennyDoe";
}

{
  let username = "johndoe";
  const otherUsername = "jennyDoe";
}
```

En el caso del ejemplo 1.6 el compilador al encontrar un bloque de codigo (llaves - `{}`) genera
un nuevo scope. Este scope existe desde que comienza la llave de abertura (_{_) y termina cuando
encuentra la llave de cierre (_}_). Debido a esto, javascript trata el primer bloque como un
_scope_ completamente diferente (e independiente) del segundo.

Esto quiere decir que las variables definidas (e inicializadas) dentro del primer bloque tambien
son completamente diferentes (e indpendientes) de las variables declaradas en el segundo bloque.

Otra caracteristica de _static scope_ es que no utiliza _hoisting_. Solo podemos hacer referencia
a variables que ya han sido declaradas previamente.

```js
// Ejemplo 1.7
{
  // this is gonna break (ReferenceError)
  console.log(data);
  const data = 10;
}
```

El ejemplo 1.7 producira un _ReferenceError_ debido a que nosotros estamos haciendo referencia
a una variable que ha sido declarada despues.

Aunado a esto, las variables definidas con las palabras reservadas `let` y `const` tienen que
tener un identificador unico. Esto quiere decir que no podemos tener dos variables
(en el mismo _scope_) con el mismo identificador (nombre).

```js
// Ejemplo 1.8
// Duplicated - Error
let repeated = 10;
let repeated = 20;

// Duplicated - Error
const a = 10;
const a = 20;
```

El ejemplo 1.8 producira errores en tiempo de ejecucion debido a que tenemos dos variables
definidas con la palabra _let_ que tienen el mismo identificador. Lo mismo sucede con las
variables declaradas con _const_.

Otra caracteristica que traen las variables _let_ y _const_ es la _reassignability_.
Las variables definidas con _let_ pueden ser reasignadas, pero las variables definidas
con _const_ no.

```js
// Ejemplo 1.9
let reassignableData = 10;
reassignableData = 20;

const notReassignable = 10;
// Error
notReassignable = 20;
```

En el ejemplo 1.9 la ultima linea producira un error en tiempo de ejecucion. Como ya hemos
mencionado, `notReassignable` al ser una variable declarad con _const_ no puede ser reasignada.

Debido a que la palabra reservada es _const_ y no puede ser reasignada puede llegar a creerse
que `notReassignable` es una _constante_. Este no es el caso.

```js
// Ejemplo 1.10
const john = { firstName: "John" };
john.firstName = "Jenny";
console.log(john); // > '{ firstName: 'Jenny' }'
```

En el ejemplo 1.10 declaramos e inicializamos la variable _john_ con un objeto literal
con una propiedad llamada _firstName_ que hace referencia al valor `'John'`, en la siguiente
linea reasignamos el valor de la propiedad _firstName_ en el objeto _john_ a `'Jenny'`.

Si esta variable fuera realmente constante esto no seria posible. Cuando hablamos de
_const_ en javascript nos referimos a que la asignacion es constante. Una vez asignado,
esa asignacion no puede cambiar.

Lo mismo aplica a los _arrays_:

```js
// Ejemplo 1.11
const list = [1, 2, 3];
list.push(4);
console.log(list); // > [1,2,3,4]
```

En el ejmplo 1.11 declaramos con la palabra reservada _const_ la variable _list_ y la
inicializamos con una lista de tres elementos (1,2,3). En la siguiente linea empujamos
un nuevo elemento a la list para despues imprimir el valor que almacena _list_ en consola.

Como vemos, _list_ es mutable (no constante en el sentido tradicional de la palabra).
