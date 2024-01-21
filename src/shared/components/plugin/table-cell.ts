import { TokenMark } from '@/shared/constants/token-marks'

export const createDivider = (): [FrameNode, LineNode] => {
  const cell = figma.createFrame()
  cell.layoutMode = 'HORIZONTAL'
  cell.layoutWrap = 'NO_WRAP'
  cell.name = 'divider'
  cell.layoutSizingVertical = 'HUG'
  cell.verticalPadding = 12

  const line = figma.createLine()
  line.rotation = -90
  line.strokes = [
    {
      type: 'SOLID',
      color: { r: 0, g: 0, b: 0 },
      opacity: 0.08,
      blendMode: 'NORMAL',
      visible: true,
      boundVariables: {},
    },
  ]
  line.strokeWeight = 1
  line.strokeCap = 'ROUND'

  cell.appendChild(line)

  return [cell, line]
}

export const createNewBadge = async (mark: TokenMark) => {
  const newBadge = figma.createFrame()
  newBadge.layoutMode = 'HORIZONTAL'
  newBadge.layoutWrap = 'NO_WRAP'
  newBadge.layoutSizingHorizontal = 'HUG'
  newBadge.layoutSizingVertical = 'HUG'
  newBadge.horizontalPadding = 6
  newBadge.cornerRadius = 6
  newBadge.verticalPadding = 4
  newBadge.name = 'new'

  const newText = figma.createText()
  await figma.loadFontAsync(newText.fontName as FontName)
  newText.characters = mark
  newText.fontSize = 12
  newText.textAutoResize = 'WIDTH_AND_HEIGHT'
  newText.name = 'badge text'
  newText.fills = [
    {
      blendMode: 'NORMAL',
      boundVariables: {},
      color: { r: 1, g: 1, b: 1 },
      opacity: 1,
      type: 'SOLID',
      visible: true,
    },
  ]

  newBadge.appendChild(newText)

  return {
    newBadge,
  }
}

export const createTableCell = async (
  characters: string,
  withMark: boolean,
) => {
  const cell = figma.createFrame()
  cell.layoutMode = 'HORIZONTAL'
  cell.layoutWrap = 'NO_WRAP'
  cell.layoutSizingHorizontal = 'HUG'
  cell.layoutSizingVertical = 'HUG'
  cell.minWidth = 260
  cell.name = 'cell'
  cell.paddingRight = withMark ? 120 : 0

  const content = figma.createFrame()
  content.layoutMode = 'HORIZONTAL'
  content.layoutWrap = 'NO_WRAP'
  content.layoutSizingHorizontal = 'HUG'
  content.layoutSizingVertical = 'HUG'
  content.horizontalPadding = 16
  content.verticalPadding = 14
  content.name = 'content'

  const text = figma.createText()
  await figma.loadFontAsync(text.fontName as FontName)
  text.characters = characters
  text.fontSize = 14
  text.textAutoResize = 'WIDTH_AND_HEIGHT'
  text.name = 'text'

  content.appendChild(text)
  cell.appendChild(content)

  return { cell, content }
}

export const createTableHeader = async (characters: string) => {
  const cell = figma.createFrame()
  cell.layoutMode = 'HORIZONTAL'
  cell.layoutWrap = 'NO_WRAP'
  cell.layoutSizingHorizontal = 'HUG'
  cell.layoutSizingVertical = 'HUG'
  cell.minWidth = 200
  cell.name = 'header'

  const content = figma.createFrame()
  content.layoutMode = 'HORIZONTAL'
  content.layoutWrap = 'NO_WRAP'
  content.layoutSizingHorizontal = 'HUG'
  content.layoutSizingVertical = 'HUG'
  content.horizontalPadding = 16
  content.verticalPadding = 16
  content.name = 'content'

  const text = figma.createText()
  await figma.loadFontAsync(text.fontName as FontName)
  text.characters = characters
  text.fontSize = 14
  text.textAutoResize = 'WIDTH_AND_HEIGHT'
  text.name = 'text'

  content.appendChild(text)
  cell.appendChild(content)

  return cell
}

export const addStroke = (cell: FrameNode) => {
  cell.layoutSizingHorizontal = 'FILL'
  cell.strokes = [
    {
      type: 'SOLID',
      color: { r: 0, g: 0, b: 0 },
      opacity: 0.08,
      blendMode: 'NORMAL',
      visible: true,
      boundVariables: {},
    },
  ]
  cell.strokeBottomWeight = 1
  cell.strokeLeftWeight = 0
  cell.strokeRightWeight = 0
  cell.strokeTopWeight = 0
}
