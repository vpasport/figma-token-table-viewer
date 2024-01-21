import { Events } from '@/shared/events'
import { drawTableHandler } from './draw-table-handler'
import { loadVariablesHandler } from './load-variables-handler'
import { notifyHandler } from './notify-handler'
import { sendVariablesToServerHandler } from './send-variables-to-server-handler'

export const handlerMatcher: Partial<Record<string, MessageEventHandler<any>>> =
  {
    [Events.DrawTable]: drawTableHandler,
    [Events.LoadVariables]: loadVariablesHandler,
    [Events.Notify]: notifyHandler,
    [Events.SendVariablesToServer]: sendVariablesToServerHandler,
  }
