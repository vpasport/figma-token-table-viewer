export const notifyHandler: MessageEventHandler<{
  message: string
  options?: NotificationOptions
}> = ({ data: { message, options } }) => {
  figma.notify(message, options)
}
