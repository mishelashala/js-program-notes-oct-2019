# Context

En javascript cuando nos referimos a _context_ nos referimos a un objeto al que tenemos acceso
a traves de la palabra reservada `this`. Este objeto es creado en tiempo de ejecucion (_runtime_)
y es dinamico: puede variar durante la ejecucion del programa/script.

## Global this

Cada vez que nosotros ejecutamos un script o programa se crea un objeto globa `this`, dependiendo
del entorno (navegador, nodejs, etc) el valor que el `this` global almacena puede variar.

En el caso de que corramos nuestro script en un navegador el objeto global `this` es igual
al objeto global `window`. En el caso de _node.js_ el objeto global `this` es igual al objeto
`process`.

Debido a que es un objeto podemos tener acceso a todas sus propiedades.

```js
// Ejemplo 1.1
firstName = "John Doe";

function getFirstName() {
  return this.firstName;
}

getFirstName(); // 'John Doe'
```

En el ejemplo 1.1 nosotros asignamos el valor `'John Doe'` a la variable _firstName_. El _runtime_ al ver
la asignacion intentara acceder al _scope_ actual, si no encuentra la declaracion seguira buscando a traves
del _scope chain_, si no encuentra ninguna declaracion con el identificador _firstName_ entonces le
asignara la propiedad _firstName_ al contexto global (`this` global).

Dentro del cuerpo de la funcion `getFirstName` intentamos regresar desde la funcion el valor que almacena
`this.firstName`. Y como ya vimos, este valor es `'John Doe'`.

## Calling Point

Un _calling point_ es el punto en el programa en el que una funcion es ejecutada. Dentro del
cuerpo de las funciones tambien tenemos acceso al objeto `this`.

El calling point afecta de forma directa el valor de `this`. En otras palabras: el valor al que
hace referencia `this` cambia dependiendo de como nosotros ejecutemos una funcion.

## call

Todas las funciones tienen una propiedad llamada _call_, la cual tambien es una funcion. _call_ nos
permite cambiar el valor de `this` y ejecutar la funcion con este nuevo valor.

```js
// Ejemplo 1.2
function getFirstName() {
  return this.firstName;
}

var jenny = {
  firstName: "Jenny Doe",
};

// call point
getFirstName.call(jenny); // 'Jenny Doe'
```

En el ejemplo 1.2 nosotros tenemos exactamente la misma funcion que en el ejemplo 1.1, despues declaramos
e inicializamos la variable `jenny` que hace referencia a un objeto literal con la propiedad _firstName_
igual a `'John Doe'`. Luego ejecutamos la funcion `getFirstName` utilizando la propiedad `call`, como
podemos observar le pasamos el objeto `jenny` como argumento.

Dentro del cuerpo de la funcion `getFirstName` la palabra reservada `this` ya no hara referencia al objeto
global `window` o `process`, ahora `this` hara referencia al valor que alamcena la variable `jenny`.

### bind

No solo podemos cambiar el valor de `this` de forma dinamica al ejecutar funciones, tambien podemos
generar funciones que tengan un valor para `this` fijo. Esto lo podemos conseguir a traves de la
propiedad `bind`.

```js
// Ejemplo 1.3
var john = {
  firstName: "John",
};

var jenny = {
  firstName: "Jenny",
};

function getFirstName() {
  return this.firstName;
}

var getJohnFirstName = getFirstName.bind(john);
var getJennyFirstName = getFirstName.bind(jenny);

getJohnFirstName(); // 'John'
getJennyFirstName(); // 'Jenny'
```

En el ejemplo 1.3 declaramos dos variables (`john` y `jenny`). Ambos son objetos literales con la propiedad
`firstName` asignadas a `john` y `jenny` de forma correspondiente. Despues tenemos la misma funcion `getFirstName`
del ejemplo 1.1 y 1.2, luego declaramos una varible llamada `getJohnFirstName` que hace referencia al valor
regresado por `getFirstName.bind(john)`. En la siguiente linea tenemos otra variable llamada `getJennyFirstName`
que hace referencia al valor regresado por `getFirstName.bind(jenny)`. En las ultimas dos lineas ejecutamos
`getJohnFIrstName` y `getJennyFirstName`; y obtenemos los valores `John` y `Jenny` en consola.

`getFirstName.bind` es una funcion que acepta un objeto como argumento y regresa otra funcion con el contexto (`this`)
dentro de esa funcion atado al objeto que nosotros pasamos como argumento. Es decir: dentro del cuerpo de
`getJohnFirstName` el contexto (`this`) es igual al objeto `john`. Lo mismo aplica para `getJennyFirstName`.

## this dentro de objetos

Como ya hemos visto los objetos pueden tener propiedades, y estas propiedades pueden apuntar (hacer referencia)
a funciones.

```js
// Ejemplo 1.4
var john = {
  firstName: "John Doe",
  getFirstName: function() {
    return this.firstName;
  },
};

// Calling point
john.getFirstName(); // > 'John Doe'
```

En el ejemplo 1.4 declaramos e inicializamos la variable `john` con un objeto literal con dos propiedades:
la primera `firstName`: que hace referencia a `'John Doe'`; y la segunda: que hace referencia a la funcion
`getFirstName` que ya hemos visto en ejemplos anteriores. Despues invocamos `john.getFirstName` sin argumentos
y esto regresa el valor `John Doe`.

En lenguajes basados en clases como _PHP_ y _Java_ la palabra reservada `this` siempre implica pertenencia.
Es decir, que `this` dentro de la funcion `firstName` de cierta forma le pertenece al objeto asignado `john`;
este no es el caso en javascript.

En javascript las propiedades son referencias. Esto quiere decir que la function `getFirstName` no le pertenece
al objeto asignado a la variable `john`.

Veamos un ejemplo:

```js
// Ejemplo 1.5
firstName = "Chuck";

var john = {
  firstName: "John Doe",
  getFirstName: function() {
    return this.firstName;
  },
};

var getChucksFirstName = john.getFirstName;

john.getFirstName(); // 'John Doe'
getChucksFirstName(); // 'Chuck'
```

En elempo 1.5 tenemos la propiedad `firstName`, que como ya hemos mencionado antes, se asigna al objeto global
`this`. Despues tenemos el mismo codigo del ejemplo 1.6 y justo despues tenemos la variable `getChucksFirstName`
que se asignada al valor que `john.getFirstName` hace referencia. Luego ejecutamos `john.getFirstName` y obtenemos
el mismo valor que en el ejemplo anterior: `'John Doe'`. Y finalmente ejecutamos `getChucksFirstName`; este nos
regresa `"Chuck"`.

Cuando nosotros usamos la notacion `obj.method` (en este caso `john.getFirstName`) el contexto (`this`) se vuelve
el objeto sobre el que estamos operando, en este caso `this` hace referencia al objeto `john`. Pero esto no implica
que `getFirstName` le pertenezca a `john`, ni que el contexto (`this`) siempre vaya a ser el objeto `john`.

Como vemos en el ejemplo 1.5 al ejecutar la funcion `getChuskFirstName` no estamos utilizando la forma `obj.prop`,
debido a esto el contexto (`this`) se vuelve el objeto global `window` o `process`.

## apply

`apply` tambien es una propiedad que todas las funciones en javascript poseen. Esta funcion funciona de manera
similar a _call_: nosotros podemos ejecutar una funcion y pasarle un nuevo contexto de forma dinamica, pero
ademas podemos pasar argumentos a la funciones.

```js
// Ejemplo 1.6
function getFullName(lastName) {
  return `${this.firstName} ${lastName}`;
}

var john = {
  firstName: "John",
};

getFullName.apply(john, ["Doe"]);
```

En el ejemplo 1.6 definimos la funcion `getFullName`, la cual tiene un parametro formal llamado `lastName`. Dentro
del cuerpo de la funcion regresa la interpolacion de `this.firstName` y `lastName`. Luego declaramos e inicializamos
la variable `john` con un objeto literal que tiene `firstName` igual a `'John'`. Posteriormente ejecutamos `getFullName`
utilizando `apply`: a `apply` le pasamos como primer argumento la variable `john` y como segundo argumento un `array`;
este `array` representa la lista de argumentos que se le va a pasar a `getFullName`. Finalmente
`getFullName.apply(this, ['Doe'])` nos regresa `'John Doe'.

## new operator

Toda funcion puede ser llamada precedida del operador `new`. Cuando nosotros utilizamos `new` el _runtime_ genera un
nuevo objeto `this` dentro del cuerpo de la funcion y le asigna un objeto literal vacio. Dentro del cuerpo de la funcion
nosotros podemos asignarle propiedades y al final de la ejecucion de la funcion si nosotros no regresamos nada de forma
explicita el _runtime_ regresara el nuevo objeto `this` creado.

```js
// Ejemplo 1.7
function Person(firstName) {
  this.firstName = firstName;
}

var john = new Person("John"); // { firstName: 'John' }
```

En el ejemplo 1.7 declaramos la funcion `Person` con el parametro formal `firstName`, dentro del cuerpo de la funcion
nosotros asignamos a `this` la propiedad `firstName` con el valor que el argumento `firstName` almacene. Despues
declaramos en inicializamos la variable `john` con el valor que `new Person('John')` regrese.

Si inspeccionamos la variable `john` podemos ver que almacena el objeto literal `{ firstName:'John' }`.

```js
// Ejemplo 1.8
function Person(firstName) {
  this.firstName = firstName;
  return "Nope";
}

var john = new Person("John"); // 'Nope'
```

En el ejemplo 1.8 nosotros regresamos la cadena `'Nope'` de forma **explicita** desde el cuerpo de la funcion
`Person`, debido a esto el _runtime_ ya no regresa el objeto `this` en su lugar.

## Ejercicios

1. Cual es el resultado del siguiente codigo?

```js
nickname = "mkleo";

const obj = {
  nickname: "mew2king",
  printNickName: function() {
    console.log(this.nickname);
  },
};

const printNickName = obj.printNickName;
printNickName();
```

2. Cual es el resultado del siguiente codigo?

```js
nickname = "mkleo";

const obj = {
  nickname: "mew2king",
  printNickName: function() {
    console.log(this.nickname);
  },
};

obj.printNickName();
```

3. Cual es el resultado del siguiente codigo?

```js
nickname = "mkleo";

const obj = {
  nickname: "mew2king",
  printNickName: function() {
    console.log(this.nickname);
  },
};

const bochi = {
  nickname: "bochi",
  printNickName: obj.printNickName,
};

bochi.printNickName();
```

4. Usando `call` haz que al ejecutar `talk` se escriba en consola: `woof`

```js
var dog = {
  sound: "woof",
};

function talk() {
  console.log(this.sound);
}
```

5. Usando `bind` crea una funcion llamada `woof` a partir de la funcion `talk` y el objeto `dog`
   que al ser ejecutada siempre imprima en consola: `woof`

```js
var dog = {
  sound: "woof",
};

function talk() {
  console.log(this.sound);
}

var woof = ...
woof() // > 'woof'
```

6. Usando `apply` ejecuta la funcion `talk` de forma que tome el sonido a partir del objeto `dog` y
   ademas pasale `dog` como argumento.

```js
var dog = {
  sound: "woof",
};

function talk(name) {
  console.log(`${name}: ${this.sound}`);
}
```
