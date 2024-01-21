import { createMarker } from '@/shared/components/plugin/marker'
import { createTable } from '@/shared/components/plugin/table'
import {
  addStroke,
  createDivider,
  createNewBadge,
  createTableCell,
  createTableHeader,
} from '@/shared/components/plugin/table-cell'
import { createTableColumn } from '@/shared/components/plugin/table-column'
import { TokenMark } from '@/shared/constants/token-marks'
import { TokensSettings } from '@/shared/types/interfaces.types'

export const drawTableHandler: MessageEventHandler<
  TokensSettings | null
> = async ({ data }) => {
  if (data === null || data.selectedCollection === null) {
    figma.notify('Проверьте актуальность данных')
    return
  }

  const collections = figma.variables.getLocalVariableCollections()

  if (!collections.map((el) => el.id).includes(data.selectedCollection)) {
    figma.notify('Проверьте актуальность данных')
    return
  }

  const collection = collections.find((el) => el.id === data.selectedCollection)

  if (!collection) {
    figma.notify('Проверьте актуальность данных')
    return
  }

  const modes = figma.variables
    .getVariableCollectionById(data.selectedCollection)
    ?.modes.filter((el) => data.selectedModes.includes(el.modeId))

  if (modes) {
    const tableData: {
      name: string
      description: string
      mark: TokenMark | null
      values: { [mode: string]: string }
    }[] = []

    let isMark = false

    collection.variableIds.forEach((variableId) => {
      const variable = figma.variables.getVariableById(variableId)

      if (variable && !data.hiddenVariables.includes(variable.id)) {
        const values: { [mode: string]: string } = {}

        if (variable.valuesByMode) {
          modes.forEach((mode) => {
            values[mode.name] = variable.valuesByMode[mode.modeId]?.toString()
          })
        }

        if (data.markAs[variable.id]) {
          isMark = true
        }

        tableData.push({
          name: variable.name,
          description: variable.description,
          values: values,
          mark: data.markAs[variable.id] ?? null,
        })
      }
    })

    let section: SectionNode

    if (
      figma.currentPage.selection.length === 1 &&
      figma.currentPage.selection[0].type === 'SECTION'
    ) {
      section = figma.currentPage.selection[0]
      section.children.forEach((el) => el.remove())
    } else {
      section = figma.createSection()
    }

    section.name = 'Tokens table'

    const table = createTable()
    section.appendChild(table)

    figma.currentPage.appendChild(section)

    const tableDataArray = [
      ['Token names', ...modes.map((mode) => mode.name)],
      ...tableData.map((data) => [
        data.name,
        ...modes.map((mode) => data.values[mode.name]),
      ]),
    ]

    const columns: ReturnType<typeof createTableColumn>[] = []

    for (const title of tableDataArray[0]) {
      const column = createTableColumn()
      const header = await createTableHeader(title)

      column.appendChild(header)

      table.appendChild(column)
      columns.push(column)
    }

    for (let row = 1; row < tableDataArray.length; row++) {
      for (let col = 0; col < tableDataArray[0].length; col++) {
        const { cell } = await createTableCell(
          tableDataArray[row][col],
          col === 0 ? isMark : false,
        )

        columns[col].appendChild(cell)
      }
    }

    columns.forEach((column, colIdx) => {
      ;(column.children as FrameNode[]).forEach(async (row, rowIdx) => {
        addStroke(row)

        if (colIdx !== 0) {
          const [divider, line] = createDivider()

          divider.resize(1, row.height)

          row.appendChild(divider)

          line.layoutSizingHorizontal = 'FIXED'
          line.layoutSizingVertical = 'FILL'

          divider.layoutPositioning = 'ABSOLUTE'
          divider.x = 0
        }

        if (
          colIdx === 0 &&
          rowIdx !== 0 &&
          tableData[rowIdx - 1].mark !== null
        ) {
          const { newBadge } = await createNewBadge(
            tableData[rowIdx - 1].mark as TokenMark,
          )
          row.appendChild(newBadge)

          newBadge.fills = [
            {
              blendMode: 'NORMAL',
              boundVariables: {},
              color: { r: 0.5921568870544434, g: 0.27843138575553894, b: 1 },
              opacity: 1,
              type: 'SOLID',
              visible: true,
            },
          ]

          newBadge.layoutPositioning = 'ABSOLUTE'
          newBadge.x = row.width - newBadge.width - 20
          newBadge.y = row.height / 2 - newBadge.height / 2
        }
      })
    })

    section.resizeWithoutConstraints(table.width + 400, table.height + 200)

    table.x = 300
    table.y = 100

    tableData.forEach(async (data, rowIdx) => {
      if (data.description) {
        const { cell, text, wrapper, line, lineWrapper } = await createMarker(
          data.description,
        )

        section.appendChild(wrapper)
        lineWrapper.appendChild(line)
        lineWrapper.layoutSizingVertical = 'FILL'
        line.layoutSizingHorizontal = 'FILL'
        line.layoutSizingVertical = 'FILL'
        text.layoutSizingHorizontal = 'FILL'

        wrapper.fills = []
        lineWrapper.fills = []

        cell.fills = [
          {
            blendMode: 'NORMAL',
            boundVariables: {},
            color: { r: 0.5921568870544434, g: 0.27843138575553894, b: 1 },
            opacity: 1,
            type: 'SOLID',
            visible: true,
          },
        ]

        wrapper.x = table.x - wrapper.width + 14
        wrapper.y =
          columns[0].children[0]?.height +
          100 +
          rowIdx * columns[0].children[1]?.height +
          (columns[0].children[1]?.height / 2 - wrapper.height / 2)
      }
    })

    figma.currentPage.selection = [section]
  }
}
