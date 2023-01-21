# runtype.d
## Runtime assertions for JS
0.0.1

### Assert value assignments with `const`, `let`, `var`
```js
try {
    const age = 0
    // Assert `age` is integer 
    const ageCp = int(age)
    // `ageCp` === `age`
    const heightMeters = 1.78
    // This will throw a `TypeError`
    const heightMetersCp = int(heightMeters)
    // `heightMetersCp` never gets assigned
} catch (e /* `TypeError` */) {
    // height in meters is not an integer!
}
```

### Assert function signature
```js
// Define a function with `fn`,
// inject asserted arguments one by one using `a`
const add = fn((opA = a(num), opB = a(num)) => {
    // opA and opB are numeric in here
    return opA + opB
})

console.log(add(1, 1))
// => 2
console.log(add('1', 1))
// `TypeError` thrown, function body didn't run
```