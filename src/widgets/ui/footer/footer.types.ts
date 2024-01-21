import type {
  ServerSettings,
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

export interface FooterProps {
  tokensSettings: TokensSettings | null
  tokenData: VariablesData | null
  serverSettings: ServerSettings
}
