export const createTableColumn = (option: {
  collection?: string
  mode?: string
}) => {
  const column = figma.createFrame()
  column.layoutMode = 'VERTICAL'
  column.layoutWrap = 'NO_WRAP'
  column.layoutSizingHorizontal = 'HUG'
  column.layoutSizingVertical = 'HUG'

  if (option.collection && option.mode) {
    column.setExplicitVariableModeForCollection(option.collection, option.mode)
  }

  return column
}
