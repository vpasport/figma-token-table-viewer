declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

interface PluginMessage {
  event: string
  data: Record<string, any>
}

declare type MessageEventHandler = (message: PluginMessage) => void
