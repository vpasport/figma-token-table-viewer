import { TokenMark } from '../constants/token-marks'

export interface VariablesData {
  collections: { name: string; id: string }[]
  modes: Record<string, { name: string; id: string }[] | undefined>
  variables: Record<
    string,
    {
      name: string
      id: string
      values: Record<string, string>
    }[]
  >
}

export interface TokensSettings {
  selectedCollection: string | null
  selectedModes: string[]
  hiddenVariables: string[]
  markAs: Record<string, TokenMark>
}
