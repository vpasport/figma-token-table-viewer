export const createTableRow = () => {
  const row = figma.createFrame()
  row.layoutMode = 'HORIZONTAL'
  row.layoutWrap = 'NO_WRAP'
  row.layoutSizingHorizontal = 'HUG'
  row.layoutSizingVertical = 'HUG'

  return row
}
