import type {
  TokensSettings,
  VariablesData,
} from '@/shared/types/interfaces.types'

export interface FooterProps {
  tokensSettings: TokensSettings | null
  tokenData: VariablesData | null
}
