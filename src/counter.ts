import { a, fn } from './runtyped'
import { int } from './types'

export function setupCounter(element: HTMLButtonElement) {
  let counter = int(-2)

  const setCounter = fn((count = a(int)) => {
    counter = int(count)
    element.innerHTML = `count is ${counter}`
  })

  // const setCounter = (count: number) => {
  //   counter = int(count)
  //   element.innerHTML = `count is ${counter}`
  // }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(-2)
}
