# Inheritance

## Prototype Chain

Todo objeto en _javascript_ tiene un prototipo. Esté es una referencia a un objeto cualquiera.
Todo objeto por defecto tiene su prototipo apuntando a un objeto vacio. El objeto
global `Object` también tiene un prototipo, pero esté apunta a `undefined`.

### getPrototypeOf

La forma en la que obtenemos el prototipo de un objeto es atraves de `Object.getPrototypeOf`

```js
// Ejemplo 1.1
var john = {};
Object.getPrototypeOf(john); // {}
```

En el ejemplo 1.1 declaramos la variable `john` y le asignamos un objeto vacío, en la siguiente
linea intentamos obtener el prototipo de la variable `john` utilizando `Object.getPrototypeOf`.
Como ya hemos dicho: el prototipo de `john` es un objeto vacío.

### setPrototypeOf

De la misma forma en la que podemos obtener el prototipo de un objeto podemos establecer el prototipo
de un objeto a traves de `Object.setPrototypeOf`

```js
// Ejemplo 1.2
var john = {
  name: "John",
};

var otherJohn = {
  age: 21,
};

Object.setPrototypeOf(otherJohn, john);
Object.getPrototypeOf(otherJohn); // { name: 'John' }
```

En el ejemplo 1.1 declaramos la variable `john` y le asignamos un objeto literal con la propiedad
`name` y el valor `"John"`. Después declaramos la variable `otherJohn` y le asignamos un objeto con
la propiedad `age` con el valor `21`.

Luego llamamos `Object.getPrototypeOf` pasando `otherJohn` como primer argumento y `john` como segundo
argumento. `Object.setPrototypeOf` hará que el prototipo de `otherJohn` apunte a `john`.

Si nosotros inspeccionamos en la siguiente linea el prototipo de `otherJohn` podemos efectivamente
corroborar esté comportamiento.

### Own propverties vs Inherited properties

```js
// Ejemplo 1.3
var john = {
  name: "John",
};

var otherJohn = {
  age: 21,
};

Object.setPrototypeOf(otherJohn, john);
otherJohn; // { age: 21 }
otherJohn.name; // 'John'
otherJohn.age; // 21
```

En el ejemplo 1.3 hicimos casi exactamente que en el ejemplo anterior.
Después de establecer el prototipo de `otherJohn` el valor de `john` intentamos inspeccionar `otherJohn`
vemos que solo tiene la propiedad `age` con el valor `21`. Pero si luego intentamos acceder a la propiedad
`name` en el objeto `otherJohn` obtenemos el valor `"John"`.

Esto se debe a que en _javascript_ hacemos una diferencia entre las propiedades _propias_ del objeto (_own
properties_) y las propiedades heredadas (_inherited properties_).

La forma en la que el engine intenta resolver el valor de `otherJohn.name` es buscar la propiedad primero
dentro de las propiedades propias del objeto (_own properties_), si no la encuentra la busca en el prototipo.
Si no las encuentra dentro del prototipo (el objeto `john`) intenta buscar en el prototipo del prototipo
(el prototipo de `john`) y así en lo sucesivo. Si el _engine_ llega al final de la cadena y no encuentra
la propiedad regresa `undefined`.

```js
// Ejemplo 1.4
var john = {
  name: "John",
};

var otherJohn = {
  age: 21,
};

Object.setPrototypeOf(otherJohn, john);
otherJohn.age = 22; // { age: 21 }
otherJohn.age; // 22
john.age; // 21
```

En el ejemplo 1.4 después de establecer el prototipo de `otherJohn` el valor de `john` asignamos
el valor de `age` en `otherJohn` a `22`. Si nosotros inspeccionamos el valor de `age` en `john` vemos
que no ha cambiado.

Cuando nosotros modificamos `age` en `otherJohn` en lugar de modificar el prototipo se generá una propiedad
propia dentro de `otherJohn`.

A diferencia de lenguajes como Java o PHP en _javascript_ no heredamos de una clase a otra. Debido a que no
tenemos un sistema de tipos estatico ni un sistema de tipos "fuerte" no nos importa el "linaje" de los objetos
(quien es el padre). Y debido a esto el modelo de herencia en _javascript_ es mucha más flexible.

## Mixins (concatenative inheritance)

_Mixins_ son una forma de compartir comportamiento y propiedades entre objetos. La idea es sencilla:
tomas dos (o más objetos) y los mezclas (_mix_) para generar un nuevo objeto.

A esté mecanismo también se le conoce como herencia concatenativa, debido a qué concatenas
propiedades de un objeto a otro.

```js
// Ejemplo 1.5
var csStudent = {
  assignment: "CS 101",
  year: "freshment",
};

var john = {
  age: 18,
  firstName: "John",
};

var johnCsStudent = Object.assign({}, csStudent, john);
```

En el ejemplo 1.5 definimos la variable `csStudent` y le asignamos un objeto con las propiedades
`assignment` y `year` con los valores `"CS 101"` y `"freshment"` respectivamente.

Después declaramos e inicializamos la variable `john` a un objeto con las propiedades `age` y `firstName`
con los valores `18` y `"John"` respectivamente.

En la última linea creamos una variable llamada `johnCsStudent` y le asignamos el resultado de la ejecución
de `Object.assign` con un objeto vacío, la variable `csStudent` y la variable `john` como argumentos.

`Object.assign` toma como argumentos una serie de objetos. Al primer objeto le asigna todas las propiedades
del segundo objeto, después le asigna todas las propiedades del tercer objeto y así en lo sucesivo hasta
terminar con todos los argumentos.

Hay que notar que si tenemos propiedades repetidas en los objetos pasados como argumentos siempre
tiene precedencia el que esté más a la derecha de la lista de argumentos.

```js
// Ejemplo 1.6
var car = {
  vehicleType: "car",
};
var plane = {
  vehicleType: "plane",
};

var planeCar = Object.assign({}, car, plane);
planeCar; // { vehicleType: 'plane' }
```

En el ejemplo 1.6 tenemos dos objetos con la misma propiedad: `vehicleType`. Y al pasar ambos
objetos a `Object.assign` el valor que aparece en el objeto resultante apunta a `plane`.

`ES6` trae un operador nuevo: _spread operator_, el cual nos permite copiar propiedades de un objeto
a otro con una sintaxis un poco menos verbosa.

```js
// Ejemplo 1.7
var car = {
  vehicleType: "car",
};
var plane = {
  vehicleType: "plane",
};

var planeCar = { ...car, ...plane };
planeCar; // { vehicleType: 'plane' }
```

El ejemplo 1.7 es equivalente al ejemplo 1.6: concatenamos las propiedades de car (en el objeto literal vacio
que los encierra), después concatenamos las propiedades de plane. La misma regla sobre propiedades duplicadas
aplica.

## Functional Mixins

_functional mixins_ son _mixins_ creados a traves del uso de funciones. En lugar de manualmente copiar
copiar cada funcion y propiedad manualmente creamos una funcion que nos permita agilizar el proceso.

```js
// Ejemplo 1.8
function student(assignment, year, target = {}) {
  return {
    ...target,
    assignment,
    year,
  };
}

function person(name, target = {}) {
  return {
    ...target,
    name,
  };
}

var john = person("John");
var johnCsStudent = student("CS 101", "freshmen", john);
```

En el ejemplo 1.8 en lugar de tener un objeto especifico llamado `csStudent` tenemos ahora una _factory function_
llamada `student` que nos permite crear estudiantes. Esta funcion toma como argumentos `assignment`, `year` y el
objeto `target` al cual le vamos a concatenar las propiedades `assignment` y `year`.

Despues tenemos una _factory function_ llamada `person` que recibe como argumento `name` y `target` (el objeto
al cual vamos a concatenar la propiedad `name`).

Luego creamos el objeto `john` y le asignamos el resultado de la ejecucion de la funcion `person` con `"John"`
como primer argumento. El segundo argumento (`target`) de la funcion `person` es opcional y tiene un valor opcional
(un objeto vacio), asi que si nosotros no le pasamos un objeto la funcion `person` usara un objeto vacio por
defecto.

En la siguiente linea declaramos la variable `johnCsStuden` como resultado de la ejecucion de la funcion
`student` con `"CS 101"`, `"freshmen"` y el objeto `john` como argumentos.

La funcion `student` nos regresara un objeto con todas las propiedades del objeto `john` mas las propiedades
`assignment` y `year`.

_Functional mixins_ al estar basads en _factory functions_ nos permite tener _encapsulation_ y _data privacy_.

```js
// Ejemplo 1.9
function student(assignment, year, target = {}) {
  var getAssignment = () => assignment;
  var getYear = () => year;

  return {
    ...target,
    getAssignment,
    getYear,
  };
}

function person(name, target = {}) {
  var name = () => name;

  return {
    ...target,
    getName,
  };
}

var john = person("John");
var johnCsStudent = student("CS 101", "freshmen", john);
johnCsStudent; // { getAssignment: [Function], getYear: [Function], getName: [Function] }
johnCsStudent.getYear(); // 'freshmen'
```

En el ejemplo 1.9 modificamos las funciones `student` y `person` para que en lugar de regresar los valores
directamente nos regresen una serie de _getters_.

La ventaja que tienen _functional mixins_ sobre otras formas de polimorfismo es la capacidad de soportar
herencia y composicion al mismo tiempo. Lo mejor de ambos mundos en un solo lugar.

## Functions as constructor

_Javascript_ nos permite emular clases como en Java, para eso utilizamos funciones como constructores:

```js
// Ejemplo 1.10
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
};

var john = new Person("John");
john.getFirstName(); // 'John'
```

En el ejemplo 1.10 declaramos una funcion llamada `Person` que define un parametro formal llamado `name`.
Dentro del cuerpo de la funcion asignamos la propiedad al contexto interno de la funcion (a traves de la
palabra reservada `this`).

Despues agregamos la funcion `getName` al prototipo de `Person`. Luego invocamos la funcion `Person`
precedida del operador `new` y con `'John'` como argumento.

Cuando nosotros ejecutamos una funcion precedida de la palabra reservada `new` ocurren varias cosas: La primera;
se crea un nuevo objeto vacio y se asigna al contexto de la funcion (la palabra reservada `this`), si nostros
no regresamos nada de forma explicita desde la funcion (utlizando la palabra reservada `return`) entonces la
funcion regresa el objeto asignado a `this`. Segundo: se crea un objeto a partir del prototype de dicha funcion
y se establece este objeto como el protito del objeto almacenado en `this`.

```js
// Ejemplo 1.11
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function() {
  return this.name;
};

function Student(name, assignment) {
  Person.call(this, name);
  this.assignment = assignment;
}
Student.prototype.getAssignment = function() {
  return this.assignment;
};

var john = new Student("John", "CS 101");
john.getFirstName(); // 'John'
john.getAssignment(); // 'CS 101'
```

En el ejemplo 1.11 tenemos casi el mismo codigo que en el ejemplo 1.10 pero agregamos ahora una funcion
llamada `Student` que tiene `name` y `assignment` como parametros formales. Dentro del cuerpo de la funcion
ejecutamos `Person` a traves de `call` y le pasamos el contexto de `Student` como primer argumento y `name`
como segundo argumento. De esta forma en lugar de generar un contexto nuevo dentro de `Person` obligamos
a la funcion que utilice el contexto de `Student`.
