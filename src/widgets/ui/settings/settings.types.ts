import type {
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

export interface SettingsProps {
  data: VariablesData
  updateSettings: (settings: TokensSettings) => void
}
