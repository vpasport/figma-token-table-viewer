export const createMarker = async (title: string) => {
  const wrapper = figma.createFrame()
  wrapper.layoutMode = 'HORIZONTAL'
  wrapper.layoutWrap = 'NO_WRAP'
  wrapper.name = 'marker'
  wrapper.layoutSizingVertical = 'HUG'
  wrapper.layoutSizingHorizontal = 'HUG'

  const cell = figma.createFrame()
  cell.layoutMode = 'HORIZONTAL'
  cell.layoutWrap = 'NO_WRAP'
  cell.name = 'description'
  cell.layoutSizingVertical = 'HUG'
  cell.layoutSizingHorizontal = 'HUG'
  cell.verticalPadding = 0
  cell.horizontalPadding = 6
  cell.cornerRadius = 6
  cell.maxWidth = 250

  wrapper.appendChild(cell)

  const text = figma.createText()
  await figma.loadFontAsync(text.fontName as FontName)
  text.characters = title
  text.fontSize = 12
  text.textAutoResize = 'WIDTH_AND_HEIGHT'
  text.name = 'text'
  cell.appendChild(text)

  text.fills = [
    {
      blendMode: 'NORMAL',
      boundVariables: {},
      color: { r: 1, g: 1, b: 1 },
      opacity: 1,
      type: 'SOLID',
      visible: true,
    },
  ]

  const lineWrapper = figma.createFrame()
  lineWrapper.layoutMode = 'HORIZONTAL'
  lineWrapper.layoutWrap = 'NO_WRAP'
  lineWrapper.name = 'line wrapper'
  lineWrapper.layoutSizingVertical = 'HUG'
  lineWrapper.layoutSizingHorizontal = 'HUG'

  wrapper.appendChild(lineWrapper)

  const line = figma.createLine()
  line.strokes = [
    {
      type: 'SOLID',
      color: { r: 0.5921568870544434, g: 0.27843138575553894, b: 1 },
      opacity: 1,
      blendMode: 'NORMAL',
      visible: true,
      boundVariables: {},
    },
  ]
  line.strokeWeight = 1
  line.strokeCap = 'SQUARE'

  return {
    text,
    cell,
    wrapper,
    line,
    lineWrapper,
  }
}
