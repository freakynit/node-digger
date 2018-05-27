# node-digger
Digs nested objects out using string or/and array notation

## Installation:
### Node:
```javascript
var digger = require('node-digger');
```

### Browser:
See [Using in browser section](#using-in-browser)


## Usage examples:

1. [Extract nested object](#extract-nested-object)
2. [Extract nested object using array input](#extract-nested-object-using-array-input)
3. [Using constructor to pass some of the inputs](#using-constructor-to-pass-some-of-the-inputs)
4. [Using one-shot mode (less code)](#using-one-shot-mode-less-code)
5. [Error handling](#error-handling)

### Extract nested object
``` javascript
var data = {a: {b: {c: {d: 10}}}};

console.log(new digger()
    .object(data)
    .level('a.b')
    .or(100)
    .dig());

// => { c: { d: 10 } }
```

### Extract nested object using array input
``` javascript
var data = {a: {b: {c: {d: 10}}}};

console.log(new digger()
    .object(data)
    .level(['a', 'b'])
    .or(100)
    .dig());

// => { c: { d: 10 } }
```

### Using constructor to pass some of the inputs
``` javascript
var data = {a: {b: {c: {d: 10}}}};

console.log(new digger(data, 'a.b')
    .or(100)
    .dig());

// => { c: { d: 10 } }
```

``` javascript
var data = {a: {b: {c: {d: 10}}}};

console.log(new digger(data, 'a.b.c.d.e', 100)
    .dig());

// => 100   // default value
```
> Note: constructor parameter sequence is: `data, level, orValue, errorValue`

> All constructor parameters can also be specified using chained methods

### Using one-shot mode (less code)
``` javascript
var data = {a: {b: {c: {d: 10}}}};

console.log(digger.dig(data, 'a.b.c.d', 100));

// => 10
```

``` javascript
var data = {a: {b: {c: {d: 10}}}};

digger.dig(data, null, 100, "some error value")

// => "some error value"
```

### Error handling
``` javascript
// provide default value on error

var data = {a: {b: {c: {d: 10}}}};

digger.dig(data, null, 100, "some error value")

// => "some error value"
```

``` javascript
// invoke callback on error

var data = {a: {b: {c: {d: 10}}}};

digger.dig(data, null, 100, function(err, data, level, defaultValue, errorValue){
    console.log(err, data, level, defaultValue, errorValue);
})

// => [Error statck trace], <data>, null, 100, [object Function]
```

``` javascript
// using method chaining

var data = {a: {b: {c: {d: 10}}}};

new digger()
    .object(data)
    .level(null)
    .or(100)
    .onError(function(err, data, level, defaultValue, errorValue){
        console.log(err, data, level, defaultValue, errorValue);
    });

// => [Error statck trace], <data>, null, 100, [object Function]
```
> Note: Error value is used when either of `data` or `level` is null/undefined

> Exception is thrown if error value is not specified and error condition is met


### Using in browser
1. Use service like [rawgit](https://rawgit.com/) with file [node-digger js file](lib/node-digger.js)
2. Use any of available CDN providers
3. Use your own hosting

### See [test](test/test.js) for all API methods
