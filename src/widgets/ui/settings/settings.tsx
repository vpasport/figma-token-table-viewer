import type { FC } from 'react'
import type { SettingsProps } from './settings.types'

import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'

import { postToPlugin } from '@/shared/events/postEvents'
import { Events } from '@/shared/events'

export const Settings: FC<SettingsProps> = ({ data }) => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    data.collections[0]?.id ?? null,
  )
  const [selectedModes, setSelectedModes] = useState<string[]>(
    selectedCollection
      ? data.modes[selectedCollection]?.map((el) => el.id) ?? []
      : [],
  )
  const [hiddenVariables, setHiddenVariables] = useState<string[]>([])
  const [maskAsNewVariables, setMarkAsNewVariables] = useState<string[]>([])

  useEffect(() => {
    let newSelectedCollection = selectedCollection

    if (
      !(
        selectedCollection &&
        data.collections.map((el) => el.id).includes(selectedCollection)
      )
    ) {
      newSelectedCollection = data.collections[0]?.id ?? null
      setSelectedCollection(newSelectedCollection)
    }

    setSelectedModes((prev) => {
      if (newSelectedCollection && data.modes[newSelectedCollection]) {
        const ids = data.modes[newSelectedCollection]?.map((el) => el.id) ?? []

        return prev.filter((el) => ids.includes(el))
      }
      return []
    })

    const filterVariables = (prev: string[]) => {
      if (newSelectedCollection && data.variables[newSelectedCollection]) {
        const ids = data.variables[newSelectedCollection].map((el) => el.id)

        return prev.filter((el) => ids.includes(el))
      }
      return []
    }

    setHiddenVariables(filterVariables)
    setMarkAsNewVariables(filterVariables)
  }, [data])

  return (
    <Accordion>
      <AccordionItem
        borderColor="var(--figma-color-border)"
        bg="var(--figma-color-bg-brand-tertiary)"
      >
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="var(--figma-color-text-secondary-hover)"
            >
              Collections
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4} bg="var(--figma-color-bg)">
          <RadioGroup
            defaultValue={selectedCollection ?? undefined}
            onChange={setSelectedCollection}
            color="var(--figma-color-text-secondary-hover)"
            fontSize="sm"
          >
            <Stack>
              {data?.collections.map((el) => (
                <Radio value={el.id} key={el.id}>
                  {el.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem
        borderColor="var(--figma-color-border)"
        bg="var(--figma-color-bg-brand-tertiary)"
      >
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="var(--figma-color-text-secondary-hover)"
            >
              Modes
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4} bg="var(--figma-color-bg)">
          <Stack>
            {selectedCollection
              ? data.modes[selectedCollection]?.map((mode) => (
                  <Checkbox
                    key={mode.id}
                    color="var(--figma-color-text-secondary-hover)"
                    fontSize="sm"
                    isChecked={selectedModes.includes(mode.id)}
                    onChange={() => {
                      setSelectedModes((prev) => {
                        if (prev.includes(mode.id)) {
                          return prev.filter((el) => el !== mode.id)
                        }

                        return [...prev, mode.id]
                      })
                    }}
                  >
                    {mode.name}
                  </Checkbox>
                ))
              : null}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem
        borderColor="var(--figma-color-border)"
        bg="var(--figma-color-bg-brand-tertiary)"
      >
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="var(--figma-color-text-secondary-hover)"
            >
              Variables
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4} bg="var(--figma-color-bg)">
          <RadioGroup
            defaultValue={selectedCollection ?? undefined}
            onChange={setSelectedCollection}
          >
            <Stack>
              {selectedCollection
                ? data.variables[selectedCollection]?.map((variable) => (
                    <Flex
                      justifyContent="space-between"
                      gap="2"
                      key={variable.id}
                    >
                      <Text
                        color="var(--figma-color-text-secondary-hover)"
                        fontSize="sm"
                      >
                        {variable.name}
                      </Text>
                      <Flex gap="2">
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="blue"
                          isActive={hiddenVariables.includes(variable.id)}
                          onClick={() => {
                            setHiddenVariables((prev) => {
                              if (prev.includes(variable.id)) {
                                return prev.filter((el) => el !== variable.id)
                              }

                              return [...prev, variable.id]
                            })
                          }}
                        >
                          Hide
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="blue"
                          isActive={maskAsNewVariables.includes(variable.id)}
                          onClick={() => {
                            setMarkAsNewVariables((prev) => {
                              if (prev.includes(variable.id)) {
                                return prev.filter((el) => el !== variable.id)
                              }

                              return [...prev, variable.id]
                            })
                          }}
                        >
                          Mask as new
                        </Button>
                      </Flex>
                    </Flex>
                  ))
                : null}
            </Stack>
          </RadioGroup>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem
        borderColor="var(--figma-color-border)"
        bg="var(--figma-color-bg-brand-tertiary)"
      >
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="var(--figma-color-text-secondary-hover)"
            >
              Actions
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4} bg="var(--figma-color-bg)">
          <Flex gap={4}>
            <Button
              onClick={() => {
                postToPlugin({
                  event: Events.DrawTable,
                  data: {
                    selectedCollection,
                    selectedModes,
                    hiddenVariables,
                    maskAsNewVariables,
                  },
                })
              }}
              size="sm"
              colorScheme="blue"
            >
              Generate table
            </Button>
            <Button
              onClick={() => {
                postToPlugin({ event: Events.LoadVariables, data: {} })
              }}
              size="sm"
              colorScheme="blue"
            >
              Reload data
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
