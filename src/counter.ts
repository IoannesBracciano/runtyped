import { arg, fun } from './fun'
import { id, int, uint } from './types'

export function setupCounter(element: HTMLButtonElement) {
  let counter = int(-2)

  const setCounter = fun((count = arg(int)) => {
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
