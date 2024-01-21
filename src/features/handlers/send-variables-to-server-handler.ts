import { Events } from '@/shared/events'
import { postToUI } from '@/shared/events/postEvents'
import { ServerSettings } from '@/shared/types/interfaces.types'

export const sendVariablesToServerHandler: MessageEventHandler<
  ServerSettings & { body: Record<string, any> }
> = ({ data: { url, headers: customHeaders, body } }) => {
  const headers = Object.assign(
    {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    customHeaders,
  )

  fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
    .then((response) => {
      console.log(response.body)
      postToUI({ event: Events.SendVariablesToServerResponse, data: {} })
      figma.notify('Variables sended')
    })
    .catch((err) => {
      console.log(err)
      postToUI({ event: Events.SendVariablesToServerResponse, data: {} })
      figma.notify(err.message, { error: true })
    })
}
