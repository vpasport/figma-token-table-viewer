import type { FC } from 'react'
import type {
  EventHandlersContext,
  EventHandlersProvidersProps,
} from './event-handlers.types'
import type { Events } from '@/shared/events'

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from 'react'

const eventHandlersContextDefaultValue: EventHandlersContext = {
  addHandler: () => ({ off: () => {} }),
  removeHandler: () => {},
}

const EventHandlersContext = createContext(eventHandlersContextDefaultValue)

export const EventHandlersProvider: FC<EventHandlersProvidersProps> = ({
  children,
}) => {
  const handlers = useRef<Partial<Record<Events, MessageEventHandler[]>>>({})

  const addHandler = useCallback<EventHandlersContext['addHandler']>(
    (event, handler) => {
      if (!handlers.current[event]) {
        handlers.current[event] = []
      }

      handlers.current[event]?.push(handler)

      return {
        off: () => {
          handlers.current[event]?.filter((el) => el !== handler)
        },
      }
    },
    [],
  )

  const removeHandler = useCallback<EventHandlersContext['removeHandler']>(
    (event, handler) => {
      handlers.current[event]?.filter((el) => el !== handler)
    },
    [],
  )

  useEffect(() => {
    window.onmessage = (e) => {
      try {
        const message = e.data.pluginMessage as PluginMessage

        if (handlers.current[message.event as Events]) {
          handlers.current[message.event as Events]?.forEach((handler) =>
            handler(message),
          )
        }
      } catch (err) {
        console.error(err)
      }
    }
  }, [])

  return (
    <EventHandlersContext.Provider
      value={{
        addHandler,
        removeHandler,
      }}
    >
      {children}
    </EventHandlersContext.Provider>
  )
}

export const useEventHandlers = () => useContext(EventHandlersContext)
