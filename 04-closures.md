# Closures

Como ya habíamos mencionado anteriormente: javascript tiene _lexial scope_, esto significa que las
funciones pueden acceder al _scope_ en las que dichas funciones fueron declaradas.

```js
// Ejemplo 1.1
var data = 10;

function logData() {
  console.log(data); // 10
}
```

En el ejemplo 1.1 tenemos la variable `data` declarada e inicializada con el valor `10` en el _scope_
global, luego tenemos la declaración de la función `logData`. En el cuerpo de dicha función
hacemos referencia a la variable `data` y la pasamos como argumento a `console.log` para imprimirla
en consola.

Como `logData` fue definida en el _scope_ global está tiene acceso todas las declaración (de variables
y funciones) de dicho scope.

Si nosotros ejecutamos el ejemplo 1.1 veremos que se imprime en consola el valor `10`.

## Scope Chain

El mecanismo que utiliza para _resolver_ los valores de las referencias se llama _scope chain_ (cadena
de scopes en español).

```js
// Ejemplo 1.1
var data = 10;
function logData() {
  console.log(data);
}
logData();
```

En el ejemplo 1.1 cuando nosotros hacemos referencia a `name` dentro de la función `logData` el _runtime_
primero intentará buscar declaraciones dentro del cuerpo (_scope_) de `logData`, de no ninguna declaración
del nombre `data` procederá a buscar dentro de la lista de parametros formales de `logData`.
En este caso `logData` no tiene ningún parametro formal definido, por la tanto el _runtime_ intentará
buscar en el _scope_ en el que `logData` fue definida (el _scope_ global). En el _scope_ global
sí tenemos definida e inicializada una variable llamada `data` con el valor `10`. por ende
el runtime pasará a la función `logData` el valor `10`.

### Inner functions

```js
// Ejemplo 1.2
var data = 10;
function logData() {
  var innerData = 20;

  function logInnerData() {
    console.log(innerData, data); // > 10, 20
  }

  logInnerData();
}

logData();
```

El ejemplo 1.2 es una variación del ejemplo 1.1, pero ahora tenemos declarada e inicializada
la variable `innerData` con el valor `20` y además tenemos la declaración de una función llamada
`logInnerData`. Dentro del cuerpo de `logInnerData` pasamos las referencia `innerData` y `data`
a la función `console.log`. Al final de la función `logData` ejecutamos `logInnerData` y finalmente
al final del _script_ ejecutamos `logData`.

Como ya dijimos: dentro del cuerpo de `logInnerData` hacemos referencia a `innerData`, para resolver
el valor de ese nombre (_variable_) el _runtime_ primero revisa en el _scope_ de `logInnerData`, al
no encontrar ahí ninguna declaración el _runtime_ procede a buscar dentro de la lista de parametros
formales de `logInnerData`. En este caso `logInnerData` no tiene definida ninguna lista de parametros
formales, por lo que el _runtime_ procede a buscar en el scope en el que `logInnerData` fue declarada:
en esté caso el _scope_ de `logData`. Dentro del _scope_ de `logData` sí hay una declaración y asignación
de `innerData` con el valor de `20`, por lo que el _runtime_ pasa como primer argumento el valor `20`
a la función `console.log`.

Para la resolución del nombre `data` el _runtime_ sigue exactamente los mismos pasos, pero al llegar
al _scope_ de `logData` no encuentra ninguna declaración con el identificador `name`, por lo que procede
a buscar dentro de la lista formal de parametros de `logData`. Al no encontrar la declaración procede
a buscar dentro del scope en la que `logData` fue definida. Y como ya vimos anteriormente: `data` está
declarada e inicializada en el _scope_ global con el valor `10`. Por ende el runtime le pasa el valor
`10` como segundo argumento a `console.log`.

## Shadowing

Como ya hemos visto: javascript crea una cadena de _scopes_ a la que podemos acceder a traves de
_closures_. Los _closures_ son los puentes entre dichos _scopes_. Estos _closures_ se crean durante
tiempo de ejecución al ejecutar una función.

Debido a que cada _scope_ es independiente uno del otro podemos usar el mismo identificador multiples
veces en diferentes scopes.

```js
// Ejemplo 1.3
var data = 10;

function logData() {
  var data = 20;
  console.log(data); // > 20
}

logData();
```

En el ejemplo 1.3 tenemos el mismo identificador `name` dos veces, pero debido a que están declaradas
en diferentes scopes son consideradas como dos variables diferentes.

Cuando el _runtime_ intenta resolver el valor de `data` dentro la función `logData` primero busca dentro
del _scope_ de `logData` y al encontrar la declaración oculta todas las demás referencias a variables
con el mismo identificador.

A este proceso se le conoce como shadowing.

### More Shadowing

El proceso _shadowing_ también aplica a parametros formales.

```js
// Ejemplo 1.4
var data = 10;

// Shadowing parameters
function logData(data) {
  var data = 20;
  console.log(data);
}

logData(30); // 20
```

En el ejemplo 1.4 tenemos una variable global llamada `name` y una functión llamda `logData`. `logData` tiene un parametro formal llamado `data` y una variable local llamada `name`.

Cuando el _runtime_ intenta hacer la resolución del identificador `data` busca primero dentro del _scope_
de `logData` y al encontrar la declaración ahí oculta la referencia a el parametro formal `data` y la
variable global `data`.

## Ejercicios

1. Escribir una función llamada `add` que acepte como primer argumento un numero, regrese una función
   que acepte como argumento otro numero y la ejecucón de la segunda función regrese la suma de ambos numeros:

```js
add(1)(3); // 4
```

2. Escribir una función llamada `mult` que acepte como primer argumento un numero, regrese una función
   que acepte como argumento otro numero y la ejecucón de la segunda función regrese la multiplicación de ambos numeros:

```js
add(2)(3); // 6
```

3. Reutilizar la función `add` para crear una funcíon llamada `add2` que siempre sumará `2` al recibir un numero
   como argumento:

```js
add2(3); // 5
```

3. Reutilizar la función `mult` para crear una funcíon llamada `multBy2` que siempre multiplicará por `2` al recibir un numero
   como argumento:

```js
multBy2(3); // 6
```
