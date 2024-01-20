export const createTableColumn = () => {
  const row = figma.createFrame()
  row.layoutMode = 'VERTICAL'
  row.layoutWrap = 'NO_WRAP'
  row.layoutSizingHorizontal = 'HUG'
  row.layoutSizingVertical = 'HUG'

  return row
}
