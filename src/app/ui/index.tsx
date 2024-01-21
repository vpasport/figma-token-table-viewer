import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import { App } from '@/app/ui/app'
import { EventHandlersProvider } from '@/shared/contexts/event-handlers/event-handlers'

import './main.scss'

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('token-table-viewer') as HTMLElement

  const root = createRoot(container)

  root.render(
    <ChakraProvider>
      <EventHandlersProvider>
        <App key="app" />
      </EventHandlersProvider>
    </ChakraProvider>,
  )
})
