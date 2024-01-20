export const postToPlugin = (data: PluginMessage) => {
  parent.postMessage({ pluginMessage: data }, '*')
}

export const postToUI = (data: PluginMessage) => {
  figma.ui.postMessage(data)
}
