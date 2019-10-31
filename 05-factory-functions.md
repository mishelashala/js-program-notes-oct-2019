# Factory Functions

JavaScript al ser multi paradigma nos permitte hacer la misma cosa de diferentes formas.
Una de esas es la creación de objetos.

Una _factory function_ es toda aquella función que regresa objetos.

```js
// Ejemplo 1.1
function person() {
  return {
    firstName: "no-name",
  };
}

var john = person(); // { firstName: 'no-name' }
```

En el ejemplo 1.1 declaramos una función llamada `person`que siempre que sea ejecutada regresará
un objeto con la propiedad `firstName` asignada a `'no-name'`. Luego al final del _script_ asignamos
el resultado de la ejecución de la functión `person` a la variable `john`.

## Reusable Factory Functions

La función del ejemplo anterior es una _factory function_ especifica (siempre regresará el mismo objeto),
si nosotros quisieramos variar el valor de la propiedad `firstName` del objeto que regresa la función
`person` tendríamos que crear una \_factory function un poco más generica.

```js
// Ejemplo 1.2
function person(firstName) {
  return {
    firstName,
  };
}
var john = person("John");
var jenny = person("Jenny");
```

En el ejemplo 1.2 la función `person` tiene un parametro formal `firstName` definida, y el valor
que se le pase como argumento será el valor de la propiedad `firstName` del objeto que la función
segrese.

Esto nos permite poder crear "personas" especificas con una función _genérica_.

## Access Modifiers

En lenguajes como C++/Java/PHP las propiedades de los objetos tienen modificadores de acceso (public, private, protected):
en javascript no es el caso. Todas las propiedades por defecto son publicas.

```js
// Ejemplo 1.3
var john = {
  firstName: "John",
};

john.firstName; // 'John'
john.firstName = "Jenny"; // 'John'
john.firstName; // 'Jenny'
```

En el ejemplo 1.3 tenemos el objeto john con la propiedad `firstName`. Nada nos impide acceder a la propiedad y modificarla.

### \_prop convention

Debido a esta limitante parte de la comunidad de JavaScript creo una convencion: prefijar las propiedades "privadas" (que no
deberian accederse/modificarse) con un guion bajo (\_).

```js
// Ejemplo 1.4
var john = {
  _secret: "1234",
};

john._secret; // '1234'
john._secret = "hehe";
john._secret; // 'hehe'
```

En el ejemplo 1.4 vemos como utilizamos la convencion de guion bajo para indicar que la propiedad `_secret` del objeto
`john` de cierta forma es _privada_ y deberiamos evitar acceder a ella o modificarla. Pero, como ya hemos dicho: nada
nos impide hacerlo.

### Object.defineProperty

Toda propiedad de javascript tiene metapropiedades (propiedades de propiedades). En este caso nos vamos a enfocar solo
en dos: value and enumerable.

```js
// Ejemplo 1.5
var john = {};

Object.defineProperty(john, "firstName", {
  enumerable: true,
  value: "John",
});

console.log(john); // { firstName: 'Value' }
```

En el ejemplo 1.5 declaramos `john` como un objeto vacio y despues llamamos a la propiedad `defineProperty` del objeto
global `Object`. Como primer argumento le pasamos el objeto al cual queremos _settear_ una propiedad, como segundo
argumento pasamos el nombre de dicha propiedad y como tercer argumento un objeto con las _meta propiedades_ de dicha
propiedad.

En este caso la propiedad `firstName` va a tener el valor `"John"` y va a ser enumerable.
Una propiedad _enumerable_ es toda aquella propiedad que se puede visualizar al inspeccionar el objeto en el que
está contenida. Todas las propiedades por defecto son _enumerables_

```js
// Ejemplo 1.6
var john = {};

Object.defineProperty(john, "firstName", {
  enumerable: false,
  value: "John",
});

console.log(john); // {}
```

En el ejemplo 1.6 definimos la propiedad `firstName` como _no enumerable_, y al inspeccionar el
el objeto john no sale listado `firstName` como una propiedad.

Esté _approach_ podría dar la sensación de _data privacy_: la capacidad de tener propiedades
"privadas". Si nosotros inspeccionamos las propiedades propias del objeto o directamente intentamos
acceder utilizando el operador punto vemos que la propiedad está ahí y podemos modificarla:

```js
// Ejemplo 1.7
var john = {};

Object.defineProperty(john, "firstName", {
  enumerable: false,
  value: "John",
});

Object.getOwnPropertyNames(john); // ['firstName']
john.firstName; // 'John'
john.firstName = "Jenny";
john.firstName; // 'Jenny'
```

## Closures to the rescue

Los "tres pilares" de la programación orientada a objetos son (en realidad no) _data privacy_,
_encapsulation_ y _polymorphism_.

_Data privacy_ hace referencia a la capacidad de un objeto de mantener un estado interno privado
que nadie puede acceder desde el mundo exterior (fuera del objeto).

_Encapsulation_ hace referencia a la idea de definir una _interfaz_ (api) para las clases y todas
sus instancias. El proposito de está _interfaz_ no revelar detalles de implementación.

_Polymorphism_ hace referencia a la capacidad de un objeto de tomar diferentes formas (ser muchas
cosas simultaneamente).

Como ya hemos dicho anteriormente: los objetos en javascript no tienen propiedades privadas, por lo
que de cierta forma rompemos el primer "pilar" de POO.

Sin embargo podemos tener _data privacy_ a utilizando closures.

```js
// Ejemplo 1.8
function person(name) {
  return {
    name,
  };
}

var john = person("John");
john.name; // 'John'
```

En el ejemplo 1.8 tenemos la función `person` que recibe un `string` y regresa un objeto vacio. Si intentamos
obtener la propiedad `firstName` obtenemos `john`.

Debido a que el objeto hace referencia al argumento `name` dentro de la función `person` podemos mantener
una referencia al _scope_ creado por `person` a través del objeto.

```js
// Ejemplo 1.9
function person(name) {
  function getFirstName() {
    return name;
  }

  return {
    getFirstName,
  };
}

var john = person("John");
john.getFirstName(); // 'John'
john; // { getFirstName: [Function] }
```

En el ejemplo 1.9 la función `person` regresa un objeto con la propiedad `getFirstName` que hace referencia
a la función `getFirstName` declarada dentro de la función `person`. Debido a que `firstName` fue declarada
en `person` está tiene tiene acceso al _scope_ y lista de parametros de `person`, por ende tiene la función
`getFirstName` tiene acceso al parametro `name`.

Cuando nosotros llamamos a `getFirstName` sobre el objeto `john` a traves del operator punto obtenemos el
valor que `"John"`.

Si nosotros inspeccionamos el objeto `john` vemos que tiene `getFirstName` como única propiedad. Además
vemos qué al inspeccionarnos no nos dice nada sobre la función `getFirstName`: no nos dice la lista de
parametros que recibe, ni la implementación. En otras palabras: está función encapsula todos los detalles
de la misma.
