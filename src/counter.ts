import { a, fn } from './runtyped'
import { int } from './types'

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0

  const setCounter = fn((count = a(int)) => {
    counter = int(count)
    element.innerHTML = `count is ${counter}`
  })

  // const setCounter = fn(([count] = A(int) as [number]) => {
  //   counter = count
  //   element.innerHTML = `count is ${counter}`
  // })

  // const setCounter = fn(() => {
  //   const [count] = A([int, 100]) as [number]
  //   counter = count
  //   element.innerHTML = `count is ${counter}`
  // })

  

  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
