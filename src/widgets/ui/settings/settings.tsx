import type { FC } from 'react'
import type { SettingsProps } from './settings.types'
import type { TokensSettings } from '@/shared/types/interfaces.types'

import { useState, useEffect } from 'react'
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'

import { TokenMark } from '@/shared/constants/token-marks'
import { AccordionItem } from '@/shared/components/ui/accordion-item/accordion-item'
import EyeIcon from '@/shared/icons/bootstrap-icons/eye.svg'
import EyeSlashIcon from '@/shared/icons/bootstrap-icons/eye-slash.svg'

export const Settings: FC<SettingsProps> = ({ data, updateSettings }) => {
  const [selectedCollection, setSelectedCollection] = useState<
    TokensSettings['selectedCollection']
  >(data.collections[0]?.id ?? null)
  const [selectedModes, setSelectedModes] = useState<
    TokensSettings['selectedModes']
  >(
    selectedCollection
      ? data.modes[selectedCollection]?.map((el) => el.id) ?? []
      : [],
  )
  const [hiddenVariables, setHiddenVariables] = useState<
    TokensSettings['hiddenVariables']
  >([])
  const [markAs, setMarkAs] = useState<TokensSettings['markAs']>({})

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

    setHiddenVariables((prev) => {
      if (newSelectedCollection && data.variables[newSelectedCollection]) {
        const ids = data.variables[newSelectedCollection].map((el) => el.id)

        return prev.filter((el) => ids.includes(el))
      }
      return []
    })

    setMarkAs((prev) => {
      if (newSelectedCollection && data.variables[newSelectedCollection]) {
        const ids = data.variables[newSelectedCollection].map((el) => el.id)

        return Object.fromEntries(
          Object.entries(prev).filter(([id]) => ids.includes(id)),
        )
      }

      return {}
    })
  }, [data])

  useEffect(() => {
    updateSettings({
      selectedCollection,
      selectedModes,
      hiddenVariables,
      markAs,
    })
  }, [selectedCollection, selectedModes, hiddenVariables, markAs])

  console.log(Object.entries(TokenMark))

  return (
    <Accordion>
      <AccordionItem title="Collections">
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
      </AccordionItem>
      <AccordionItem title="Modes">
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
      </AccordionItem>
      <AccordionItem title="Variables">
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
                      <Tooltip
                        label={
                          hiddenVariables.includes(variable.id)
                            ? 'show variable'
                            : 'hide variable'
                        }
                      >
                        <IconButton
                          aria-label="hide variable"
                          size="xs"
                          variant="unstyled"
                          icon={
                            hiddenVariables.includes(variable.id) ? (
                              <EyeSlashIcon color="var(--figma-color-icon-tertiary)" />
                            ) : (
                              <EyeIcon color="var(--figma-color-icon-tertiary)" />
                            )
                          }
                          onClick={() => {
                            setHiddenVariables((prev) => {
                              if (prev.includes(variable.id)) {
                                return prev.filter((el) => el !== variable.id)
                              }

                              return [...prev, variable.id]
                            })
                          }}
                        />
                      </Tooltip>
                      <Menu>
                        <MenuButton
                          as={Button}
                          size="xs"
                          variant="ghost"
                          colorScheme={!!markAs[variable.id] ? 'blue' : 'gray'}
                          isActive={!!markAs[variable.id]}
                          color="gray.200"
                        >
                          Mark as{' '}
                          {markAs[variable.id] ? markAs[variable.id] : null}
                        </MenuButton>
                        <MenuList
                          display="flex"
                          flexDirection="column"
                          w="100px"
                          minW="none"
                        >
                          {Object.entries(TokenMark).map(([_, value]) => (
                            <Button
                              justifyContent="flex-start"
                              size="xs"
                              variant="ghost"
                              colorScheme="blue"
                              onClick={() => {
                                setMarkAs((prev) => ({
                                  ...prev,
                                  [variable.id]: value,
                                }))
                              }}
                            >
                              {value}
                            </Button>
                          ))}
                          <Button
                            justifyContent="flex-start"
                            size="xs"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => {
                              setMarkAs((prev) => {
                                const tmp = { ...prev }
                                delete tmp[variable.id]

                                return tmp
                              })
                            }}
                          >
                            NONE
                          </Button>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Flex>
                ))
              : null}
          </Stack>
        </RadioGroup>
      </AccordionItem>
    </Accordion>
  )
}
