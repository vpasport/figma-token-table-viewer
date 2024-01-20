import { Events } from '@/shared/events'
import { postToUI } from '@/shared/events/postEvents'
import type { VariablesData } from '@/shared/types/interfaces.types'

export const loadVariablesHandler: MessageEventHandler = () => {
  const collections = figma.variables.getLocalVariableCollections()

  const modes = collections.reduce(
    (acc, curr) => {
      acc[curr.id] = figma.variables
        .getVariableCollectionById(curr.id)
        ?.modes.map((mode) => ({ name: mode.name, id: mode.modeId }))

      return acc
    },
    {} as VariablesData['modes'],
  )

  const variables = collections.reduce(
    (acc, curr) => {
      acc[curr.id] = curr.variableIds
        .map((variable) => {
          const variableData = figma.variables.getVariableById(variable)

          if (variableData) {
            return {
              name: variableData?.name,
              id: variable,
            }
          }

          return null
        })
        .filter((el) => el !== null) as VariablesData['variables'][string]

      return acc
    },
    {} as VariablesData['variables'],
  )

  const data: VariablesData = {
    collections: collections.map((collection) => ({
      name: collection.name,
      id: collection.id,
    })),
    modes,
    variables,
  }

  postToUI({
    event: Events.LoadVariablesResponse,
    data,
  })
}
