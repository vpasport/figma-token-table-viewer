export interface VariablesData {
  collections: { name: string; id: string }[]
  modes: Record<string, { name: string; id: string }[] | undefined>
  variables: Record<string, { name: string; id: string }[]>
}
