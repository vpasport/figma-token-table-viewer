import type { FC } from 'react'
import type { VariablesData } from '@/shared/types/interfaces.types'

import { useEffect, useState } from 'react'
import { Spinner } from '@chakra-ui/react'

import { Events } from '@/shared/events'
import { postToPlugin } from '@/shared/events/postEvents'
import { useEventHandlers } from '@/shared/contexts/event-handlers/event-handlers'
import { Settings } from '@/widgets/ui/settings/settings'

import styles from './app.module.scss'

export const App: FC = () => {
  const { addHandler } = useEventHandlers()

  const [variablesData, setVariablesData] = useState<VariablesData | null>(null)

  useEffect(() => {
    const loadDataResponseHandler = addHandler(
      Events.LoadVariablesResponse,
      (data) => {
        setVariablesData(data.data as VariablesData)
      },
    )

    postToPlugin({ event: Events.LoadVariables, data: {} })

    return () => {
      loadDataResponseHandler.off()
    }
  }, [])

  return (
    <div className={styles.app}>
      {variablesData ? <Settings data={variablesData} /> : <Spinner />}
    </div>
  )
}
