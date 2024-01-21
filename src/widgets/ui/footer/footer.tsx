import type { FC } from 'react'
import type { FooterProps } from './footer.types'
import type {
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
} from '@chakra-ui/react'

import { postToPlugin } from '@/shared/events/postEvents'
import { Events } from '@/shared/events'
import ReloadIcon from '@/shared/icons/bootstrap-icons/arrow-counterclockwise.svg'
import DownloadIcon from '@/shared/icons/bootstrap-icons/download.svg'
import { useEventHandlers } from '@/shared/contexts/event-handlers/event-handlers'

import styles from './footer.module.scss'

export const Footer: FC<FooterProps> = ({
  tokensSettings,
  tokenData,
  serverSettings,
}) => {
  const { addHandler } = useEventHandlers()

  const [isSendingToServer, setSendingToServer] = useState<boolean>(false)

  const prepareData = (
    tokenData: VariablesData,
    tokensSettings: TokensSettings,
  ): Record<string, Record<string, string>> => {
    const selectedCollection = tokenData.collections.find(
      (el) => el.id === tokensSettings.selectedCollection,
    )?.id

    if (selectedCollection) {
      const modes = tokenData.modes[selectedCollection]?.filter((el) =>
        tokensSettings.selectedModes.includes(el.id),
      )

      const variables = tokenData.variables[selectedCollection].filter(
        (el) => !tokensSettings.hiddenVariables.includes(el.id),
      )

      return (
        modes?.reduce(
          (acc, curr) => {
            acc[curr.name] = Object.fromEntries(
              variables.map((el) => [el.name, el.values[curr.id]]),
            )

            return acc
          },
          {} as Record<string, Record<string, string>>,
        ) ?? ({} as Record<string, Record<string, string>>)
      )
    }

    throw new Error('Collection not found')
  }

  const onDownload = () => {
    try {
      if (tokenData && tokensSettings) {
        const data = prepareData(tokenData, tokensSettings)
        const dataStr =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(data, null, 2))
        var downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute('href', dataStr)
        downloadAnchorNode.setAttribute('download', 'test.json')
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
      }
    } catch (err) {
      postToPlugin({
        event: Events.Notify,
        data: { message: err.message, options: { error: true } },
      })
    }
  }

  const onSendToServer = () => {
    try {
      if (tokenData && tokensSettings) {
        const data = prepareData(tokenData, tokensSettings)
        setSendingToServer(true)
        postToPlugin({
          event: Events.SendVariablesToServer,
          data: {
            ...serverSettings,
            body: data,
          },
        })
      }
    } catch (err) {
      setSendingToServer(false)
      postToPlugin({
        event: Events.Notify,
        data: { message: err.message, options: { error: true } },
      })
    }
  }

  useEffect(() => {
    const sendToServerResponseHandler = addHandler(
      Events.SendVariablesToServerResponse,
      (data) => {
        setSendingToServer(false)
      },
    )

    return () => {
      sendToServerResponseHandler.off()
    }
  }, [])

  return (
    <Flex
      p="4"
      gap="2"
      className={styles.footer}
      justifyContent="space-between"
    >
      <Button
        onClick={() => {
          postToPlugin({
            event: Events.DrawTable,
            data: tokensSettings,
          })
        }}
        size="sm"
        colorScheme="blue"
      >
        Generate table
      </Button>
      <Flex>
        <Menu>
          <Tooltip label="download data">
            <MenuButton
              as={IconButton}
              aria-label="reload data"
              icon={<DownloadIcon color="var(--figma-color-icon-tertiary)" />}
              size="sm"
              colorScheme="gray"
              variant="unstyled"
            />
          </Tooltip>
          <MenuList display="flex" flexDirection="column" minW="none">
            <Button
              justifyContent="flex-start"
              size="xs"
              variant="ghost"
              colorScheme="blue"
              onClick={onDownload}
            >
              Save json file
            </Button>
            <Button
              justifyContent="flex-start"
              size="xs"
              variant="ghost"
              colorScheme="blue"
              onClick={onSendToServer}
              isDisabled={isSendingToServer}
            >
              Send to server
            </Button>
          </MenuList>
        </Menu>
        <Tooltip label="reload data">
          <IconButton
            aria-label="reload data"
            onClick={() => {
              postToPlugin({ event: Events.LoadVariables, data: {} })
            }}
            icon={<ReloadIcon color="var(--figma-color-icon-tertiary)" />}
            size="sm"
            colorScheme="gray"
            variant="unstyled"
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
