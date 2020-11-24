import { atom, observe } from 'elementos'

export const createInterval = (
  initialCallback: () => void,
  interval: number
) => {
  const interval$ = atom(interval)
  let callback = initialCallback

  const dispose = observe(interval$, (ms) => {
    const id = setInterval(() => {
      callback()
    }, ms)
    return () => {
      clearInterval(id)
    }
  })

  return {
    setInterval: interval$.actions.set,
    setCallback: (nextCallback: () => void) => {
      callback = nextCallback
    },
    dispose
  }
}
