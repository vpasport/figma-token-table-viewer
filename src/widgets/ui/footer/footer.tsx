import type { FC } from 'react'
import type { FooterProps } from './footer.types'

import { Button, Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { postToPlugin } from '@/shared/events/postEvents'
import { Events } from '@/shared/events'
import ReloadIcon from '@/shared/icons/bootstrap-icons/arrow-counterclockwise.svg'

import styles from './footer.module.scss'

export const Footer: FC<FooterProps> = ({ tokensSettings }) => {
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
