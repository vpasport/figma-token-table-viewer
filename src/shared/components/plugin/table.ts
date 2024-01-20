export const createTable = () => {
  const table = figma.createFrame()
  table.layoutMode = 'HORIZONTAL'
  table.layoutWrap = 'NO_WRAP'
  table.name = 'tokens table'
  table.layoutSizingHorizontal = 'HUG'
  table.layoutSizingVertical = 'HUG'

  return table
}
