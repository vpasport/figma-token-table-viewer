import { Events } from '@/shared/events'
import { drawTableHandler } from './draw-table-handler'
import { loadVariablesHandler } from './load-variables-handler'

export const handlerMatcher: Record<string, MessageEventHandler> = {
  [Events.DrawTable]: drawTableHandler,
  [Events.LoadVariables]: loadVariablesHandler,
}
