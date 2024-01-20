import type { ReactNode } from 'react'
import type { Events } from '@/shared/events'

export interface EventHandlersContext {
  addHandler: (
    event: Events,
    handler: MessageEventHandler,
  ) => { off: () => void }
  removeHandler: (event: Events, handler: MessageEventHandler) => void
}

export interface EventHandlersProvidersProps {
  children: ReactNode
}
