# runtype.d
## Runtime assertions by assignment for JS
![](https://github.com/IoannesBracciano/runtyped/actions/workflows/nodejs-ci.yml/badge.svg)


```js
import { fn } from 'runtyped'
import { num, str } from 'runtyped/types'

// Define a function with `fn`,
// assert arguments by assignment
const add = fn((opA = num(), opB = num()) => {
    // opA and opB are numeric in here
    return opA + opB
})

console.log(add(1, 1))
// => 2
console.log(add('1', 1))
// `TypeError` thrown, function body didn't run

// Pass default values
const hello = fn((who = str('world')) => 'Hello ' + who + '!')

console.log(hello())
// => "Hello world!"
console.log(hello('James'))
// => "Hello James!"
```
