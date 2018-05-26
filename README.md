# node-digger
Digs nested objects out using string or/and array notation

# Usage examples:
> Sample data is: 
``` javascript 1.6
var data = {a: {b: {c: {d: 10}}}}
```

[1] Extract nested object:
``` javascript
console.log(new digger()
    .object(data)
    .level('a.b')
    .or(100)
    .dig());

// => { c: { d: 10 } }
```

[2] Extract nested object, using array input:
``` javascript
console.log(new digger()
    .object(data)
    .level(['a', 'b'])
    .or(100)
    .dig());

// => { c: { d: 10 } }
```

[3] Using constructor to pass some of the inputs:
``` javascript
console.log(new digger(data, 'a.b')
    .or(100)
    .dig());

// => { c: { d: 10 } }
```

``` javascript
console.log(new digger(data, 'a.b.c.d.e', 100)
    .dig());

// => 100   // default value
```
> Note: constructor parameter sequence is: `data, level, orValue, errorValue`

> All constructor parameters can also be specified using chained methods

[4] Using one-shot mode (less code):
``` javascript
console.log(digger.dig(data, 'a.b.c.d', 100));

// => 10
```

``` javascript
digger.dig(data, null, 100, "some error value")

// => "some error value"
```

[5] Error handling:
``` javascript
// provide default value on error

digger.dig(data, null, 100, "some error value")

// => "some error value"
```

``` javascript
// invoke callback on error

digger.dig(data, null, 100, function(err, data, level, defaultValue, errorValue){
    console.log(err, data, level, defaultValue, errorValue);
})

// => [Error statck trace], <data>, null, 100, [object Function]
```

``` javascript
// using method chaining

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

### For usage in browser, just include [node-digger file](lib/node-digger.js).
> You can use service like [rawgit](https://rawgit.com/) for same

### See [test](test/test.js) for all API methods
