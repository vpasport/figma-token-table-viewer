import type { FC } from 'react'
import type { AccordionItemProps } from './accordion-item.types'

import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  AccordionItem as ChakraAccordionItem,
} from '@chakra-ui/react'

export const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
  return (
    <ChakraAccordionItem
      borderColor="var(--figma-color-border)"
      bg="var(--figma-color-bg-secondary)"
      borderBottom="none"
    >
      <h2>
        <AccordionButton>
          <Box
            as="span"
            flex="1"
            textAlign="left"
            color="var(--figma-color-text-secondary-hover)"
          >
            {title}
          </Box>
          <AccordionIcon color="var(--figma-color-icon-tertiary)" />
        </AccordionButton>
      </h2>
      <AccordionPanel p={4} bg="var(--figma-color-bg)">
        {children}
      </AccordionPanel>
    </ChakraAccordionItem>
  )
}
