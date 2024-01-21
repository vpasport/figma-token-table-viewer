import type { Dispatch, SetStateAction } from 'react'
import type {
  ServerSettings,
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

export interface SettingsProps {
  data: VariablesData
  updateSettings: (settings: TokensSettings) => void
  serverSettings: ServerSettings
  updateServerSettings: Dispatch<SetStateAction<ServerSettings>>
}
