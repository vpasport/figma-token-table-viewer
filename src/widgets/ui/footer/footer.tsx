import type { FC } from 'react'
import type { FooterProps } from './footer.types'
import type {
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

import { Button, Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { postToPlugin } from '@/shared/events/postEvents'
import { Events } from '@/shared/events'
import ReloadIcon from '@/shared/icons/bootstrap-icons/arrow-counterclockwise.svg'
import DownloadIcon from '@/shared/icons/bootstrap-icons/download.svg'

import styles from './footer.module.scss'

export const Footer: FC<FooterProps> = ({ tokensSettings, tokenData }) => {
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
        <Tooltip label="download data">
          <IconButton
            aria-label="reload data"
            onClick={onDownload}
            icon={<DownloadIcon color="var(--figma-color-icon-tertiary)" />}
            size="sm"
            colorScheme="gray"
            variant="unstyled"
          />
        </Tooltip>
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
