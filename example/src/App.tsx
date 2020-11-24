import React from 'react'
import { Button, Heading, Flex, ChakraProvider } from '@chakra-ui/react'
import { atom } from 'elementos'
import { useConstructor, useObservable } from 'elementos-react'
import { createInterval } from './interval'

const createCounter$ = (defaultVal: number) => {
  return atom(defaultVal, {
    actions: (set) => ({
      increment: () => set((prev) => prev + 1)
    })
  })
}

export default function App() {
  // Create interval/counter in a constructor
  const self = useConstructor(({ beforeUnmount }) => {
    const counter$ = createCounter$(0)
    const interval = createInterval(() => {
      counter$.actions.increment()
    }, 1000)

    // Must be sure to dispose observers before unmount
    beforeUnmount(interval.dispose)

    return {
      counter$,
      interval
    }
  })

  const count = useObservable(self.counter$)

  return (
    <ChakraProvider>
      <Flex h='100vh' direction='column' align='center' justify='center'>
        <Heading>Count: {count}</Heading>
        <Button
          onClick={() => {
            self.interval.setInterval((prev) => prev - 100 || 100)
          }}
        >
          Make Quicker
        </Button>
      </Flex>
    </ChakraProvider>
  )
}
