
Hijacks `do`/`while` statements with bitwise left shift (`<<`) to implement the `for`/`yield` syntax we all know and love :heart: from [scala](https://docs.scala-lang.org/tutorials/FAQ/yield.html).

If you mind not being able to use `do`/`while` statements with only bitwise left shift statements, then stay away.

However, if you like feeling alive and the taste of the kool-aid they're handing out in fp land, then look no further!

You can turn:
```js
getFoo("/api/foo").chain(foo => {
  return getBar("/api/bar").chain(bar => {
    return getBaz("/api/baz").map(baz => {
      return foo + bar + baz
    });
  })
});
```

into:
```awesome-sauce
do {
  foo << getFoo("/api/foo")
  bar << getBar("/api/bar")
  baz << getBaz("/api/baz")
} while(
  foo + bar + baz
)
```

Limitations:
  1. do body must only contain `<<` expressions
  2. `while` test must only contain a single expression
  3. Coworkers will loathe you when you try to explain monads to them.
