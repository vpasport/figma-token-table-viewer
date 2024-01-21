declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

interface PluginMessage<
  DataType extends Record<string, any> | undefined | null =
    | Record<string, any>
    | undefined
    | null,
> {
  event: string
  data: DataType
}

declare type MessageEventHandler<
  DataType extends Record<string, any> | undefined | null = Record<string, any>,
> = (message: PluginMessage<DataType>) => void
