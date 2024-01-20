import { handlerMatcher } from '@/features/handlers/handler-matcher'

figma.showUI(__html__, { themeColors: true, width: 500, height: 700 })

figma.ui.onmessage = (msg) => {
  if (handlerMatcher[msg.event]) {
    handlerMatcher[msg.event](msg)
  }
}
