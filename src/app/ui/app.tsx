import type { FC } from 'react'
import type {
  ServerSettings,
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

import { useEffect, useState } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

import { Events } from '@/shared/events'
import { postToPlugin } from '@/shared/events/postEvents'
import { useEventHandlers } from '@/shared/contexts/event-handlers/event-handlers'
import { Settings } from '@/widgets/ui/settings/settings'

import styles from './app.module.scss'
import { Footer } from '@/widgets/ui/footer/footer'

export const App: FC = () => {
  const { addHandler } = useEventHandlers()

  const [variablesData, setVariablesData] = useState<VariablesData | null>(null)
  const [tokensSettings, setTokensSettings] = useState<TokensSettings | null>(
    null,
  )
  const [serverSettings, setServerSettings] = useState<ServerSettings>({
    url: 'http://localhost:3001/test',
    headers: {},
  })

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
      <div className={styles['app-content']}>
        {variablesData ? (
          <Settings
            data={variablesData}
            updateSettings={setTokensSettings}
            serverSettings={serverSettings}
            updateServerSettings={setServerSettings}
          />
        ) : (
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Spinner color="var(--figma-color-icon-tertiary)" />
          </Flex>
        )}
      </div>
      <Footer
        tokensSettings={tokensSettings}
        tokenData={variablesData}
        serverSettings={serverSettings}
      />
    </div>
  )
}
