import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import { App } from '@/app/ui/app'

import './main.scss'
import { EventHandlersProvider } from '@/shared/contexts/event-handlers/event-handlers'

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
