/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/features/handlers/draw-table-handler.ts":
/*!*****************************************************!*\
  !*** ./src/features/handlers/draw-table-handler.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawTableHandler: () => (/* binding */ drawTableHandler)
/* harmony export */ });
/* harmony import */ var _shared_components_plugin_marker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/shared/components/plugin/marker */ "./src/shared/components/plugin/marker.ts");
/* harmony import */ var _shared_components_plugin_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/shared/components/plugin/table */ "./src/shared/components/plugin/table.ts");
/* harmony import */ var _shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/shared/components/plugin/table-cell */ "./src/shared/components/plugin/table-cell.ts");
/* harmony import */ var _shared_components_plugin_table_column__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/shared/components/plugin/table-column */ "./src/shared/components/plugin/table-column.ts");




const drawTableHandler = async _ref => {
  var _figma$variables$getV;
  let {
    data
  } = _ref;
  if (data === null || data.selectedCollection === null) {
    figma.notify('Проверьте актуальность данных');
    return;
  }
  const collections = figma.variables.getLocalVariableCollections();
  if (!collections.map(el => el.id).includes(data.selectedCollection)) {
    figma.notify('Проверьте актуальность данных');
    return;
  }
  const collection = collections.find(el => el.id === data.selectedCollection);
  if (!collection) {
    figma.notify('Проверьте актуальность данных');
    return;
  }
  const modes = (_figma$variables$getV = figma.variables.getVariableCollectionById(data.selectedCollection)) === null || _figma$variables$getV === void 0 ? void 0 : _figma$variables$getV.modes.filter(el => data.selectedModes.includes(el.modeId));
  if (modes) {
    const tableData = [];
    let isMark = false;
    collection.variableIds.forEach(variableId => {
      const variable = figma.variables.getVariableById(variableId);
      if (variable && !data.hiddenVariables.includes(variable.id)) {
        var _data$markAs$variable;
        const values = {};
        if (variable.valuesByMode) {
          modes.forEach(mode => {
            var _variable$valuesByMod;
            values[mode.name] = (_variable$valuesByMod = variable.valuesByMode[mode.modeId]) === null || _variable$valuesByMod === void 0 ? void 0 : _variable$valuesByMod.toString();
          });
        }
        if (data.markAs[variable.id]) {
          isMark = true;
        }
        tableData.push({
          name: variable.name,
          description: variable.description,
          values: values,
          mark: (_data$markAs$variable = data.markAs[variable.id]) !== null && _data$markAs$variable !== void 0 ? _data$markAs$variable : null
        });
      }
    });
    const section = figma.createSection();
    section.name = 'Tokens table';
    const table = (0,_shared_components_plugin_table__WEBPACK_IMPORTED_MODULE_1__.createTable)();
    section.appendChild(table);
    figma.currentPage.appendChild(section);
    const tableDataArray = [['Token names', ...modes.map(mode => mode.name)], ...tableData.map(data => [data.name, ...modes.map(mode => data.values[mode.name])])];
    const columns = [];
    for (const title of tableDataArray[0]) {
      const column = (0,_shared_components_plugin_table_column__WEBPACK_IMPORTED_MODULE_3__.createTableColumn)();
      const header = await (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.createTableHeader)(title);
      column.appendChild(header);
      table.appendChild(column);
      columns.push(column);
    }
    for (let row = 1; row < tableDataArray.length; row++) {
      for (let col = 0; col < tableDataArray[0].length; col++) {
        const {
          cell
        } = await (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.createTableCell)(tableDataArray[row][col], col === 0 ? isMark : false);
        columns[col].appendChild(cell);
      }
    }
    columns.forEach((column, colIdx) => {
      ;
      column.children.forEach(async (row, rowIdx) => {
        (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.addStroke)(row);
        if (colIdx !== 0) {
          const [divider, line] = (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.createDivider)();
          divider.resize(1, row.height);
          row.appendChild(divider);
          line.layoutSizingHorizontal = 'FIXED';
          line.layoutSizingVertical = 'FILL';
          divider.layoutPositioning = 'ABSOLUTE';
          divider.x = 0;
        }
        if (colIdx === 0 && rowIdx !== 0 && tableData[rowIdx - 1].mark !== null) {
          const {
            newBadge
          } = await (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.createNewBadge)(tableData[rowIdx - 1].mark);
          row.appendChild(newBadge);
          newBadge.fills = [{
            blendMode: 'NORMAL',
            boundVariables: {},
            color: {
              r: 0.5921568870544434,
              g: 0.27843138575553894,
              b: 1
            },
            opacity: 1,
            type: 'SOLID',
            visible: true
          }];
          newBadge.layoutPositioning = 'ABSOLUTE';
          newBadge.x = row.width - newBadge.width - 20;
          newBadge.y = row.height / 2 - newBadge.height / 2;
        }
      });
    });
    section.resizeWithoutConstraints(table.width + 400, table.height + 200);
    table.x = 300;
    table.y = 100;
    tableData.forEach(async (data, rowIdx) => {
      if (data.description) {
        var _columns$0$children$, _columns$0$children$2, _columns$0$children$3;
        const {
          cell,
          text,
          wrapper,
          line,
          lineWrapper
        } = await (0,_shared_components_plugin_marker__WEBPACK_IMPORTED_MODULE_0__.createMarker)(data.description);
        section.appendChild(wrapper);
        lineWrapper.appendChild(line);
        lineWrapper.layoutSizingVertical = 'FILL';
        line.layoutSizingHorizontal = 'FILL';
        line.layoutSizingVertical = 'FILL';
        text.layoutSizingHorizontal = 'FILL';
        wrapper.fills = [];
        lineWrapper.fills = [];
        cell.fills = [{
          blendMode: 'NORMAL',
          boundVariables: {},
          color: {
            r: 0.5921568870544434,
            g: 0.27843138575553894,
            b: 1
          },
          opacity: 1,
          type: 'SOLID',
          visible: true
        }];
        wrapper.x = table.x - wrapper.width + 14;
        wrapper.y = ((_columns$0$children$ = columns[0].children[0]) === null || _columns$0$children$ === void 0 ? void 0 : _columns$0$children$.height) + 100 + rowIdx * ((_columns$0$children$2 = columns[0].children[1]) === null || _columns$0$children$2 === void 0 ? void 0 : _columns$0$children$2.height) + (((_columns$0$children$3 = columns[0].children[1]) === null || _columns$0$children$3 === void 0 ? void 0 : _columns$0$children$3.height) / 2 - wrapper.height / 2);
      }
    });
    figma.currentPage.selection = [section];
  }
};

/***/ }),

/***/ "./src/features/handlers/handler-matcher.ts":
/*!**************************************************!*\
  !*** ./src/features/handlers/handler-matcher.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handlerMatcher: () => (/* binding */ handlerMatcher)
/* harmony export */ });
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/shared/events */ "./src/shared/events/index.ts");
/* harmony import */ var _draw_table_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw-table-handler */ "./src/features/handlers/draw-table-handler.ts");
/* harmony import */ var _load_variables_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./load-variables-handler */ "./src/features/handlers/load-variables-handler.ts");



const handlerMatcher = {
  [_shared_events__WEBPACK_IMPORTED_MODULE_0__.Events.DrawTable]: _draw_table_handler__WEBPACK_IMPORTED_MODULE_1__.drawTableHandler,
  [_shared_events__WEBPACK_IMPORTED_MODULE_0__.Events.LoadVariables]: _load_variables_handler__WEBPACK_IMPORTED_MODULE_2__.loadVariablesHandler
};

/***/ }),

/***/ "./src/features/handlers/load-variables-handler.ts":
/*!*********************************************************!*\
  !*** ./src/features/handlers/load-variables-handler.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadVariablesHandler: () => (/* binding */ loadVariablesHandler)
/* harmony export */ });
/* harmony import */ var _shared_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/shared/events */ "./src/shared/events/index.ts");
/* harmony import */ var _shared_events_postEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/shared/events/postEvents */ "./src/shared/events/postEvents.ts");


const loadVariablesHandler = () => {
  const collections = figma.variables.getLocalVariableCollections();
  const modes = collections.reduce((acc, curr) => {
    var _figma$variables$getV;
    acc[curr.id] = (_figma$variables$getV = figma.variables.getVariableCollectionById(curr.id)) === null || _figma$variables$getV === void 0 ? void 0 : _figma$variables$getV.modes.map(mode => ({
      name: mode.name,
      id: mode.modeId
    }));
    return acc;
  }, {});
  const variables = collections.reduce((acc, curr) => {
    acc[curr.id] = curr.variableIds.map(variable => {
      const variableData = figma.variables.getVariableById(variable);
      if (variableData) {
        return {
          name: variableData === null || variableData === void 0 ? void 0 : variableData.name,
          id: variable
        };
      }
      return null;
    }).filter(el => el !== null);
    return acc;
  }, {});
  const data = {
    collections: collections.map(collection => ({
      name: collection.name,
      id: collection.id
    })),
    modes,
    variables
  };
  (0,_shared_events_postEvents__WEBPACK_IMPORTED_MODULE_1__.postToUI)({
    event: _shared_events__WEBPACK_IMPORTED_MODULE_0__.Events.LoadVariablesResponse,
    data
  });
};

/***/ }),

/***/ "./src/shared/components/plugin/marker.ts":
/*!************************************************!*\
  !*** ./src/shared/components/plugin/marker.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMarker: () => (/* binding */ createMarker)
/* harmony export */ });
const createMarker = async title => {
  const wrapper = figma.createFrame();
  wrapper.layoutMode = 'HORIZONTAL';
  wrapper.layoutWrap = 'NO_WRAP';
  wrapper.name = 'marker';
  wrapper.layoutSizingVertical = 'HUG';
  wrapper.layoutSizingHorizontal = 'HUG';
  const cell = figma.createFrame();
  cell.layoutMode = 'HORIZONTAL';
  cell.layoutWrap = 'NO_WRAP';
  cell.name = 'description';
  cell.layoutSizingVertical = 'HUG';
  cell.layoutSizingHorizontal = 'HUG';
  cell.verticalPadding = 0;
  cell.horizontalPadding = 6;
  cell.cornerRadius = 6;
  cell.maxWidth = 250;
  wrapper.appendChild(cell);
  const text = figma.createText();
  await figma.loadFontAsync(text.fontName);
  text.characters = title;
  text.fontSize = 12;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.name = 'text';
  cell.appendChild(text);
  text.fills = [{
    blendMode: 'NORMAL',
    boundVariables: {},
    color: {
      r: 1,
      g: 1,
      b: 1
    },
    opacity: 1,
    type: 'SOLID',
    visible: true
  }];
  const lineWrapper = figma.createFrame();
  lineWrapper.layoutMode = 'HORIZONTAL';
  lineWrapper.layoutWrap = 'NO_WRAP';
  lineWrapper.name = 'line wrapper';
  lineWrapper.layoutSizingVertical = 'HUG';
  lineWrapper.layoutSizingHorizontal = 'HUG';
  wrapper.appendChild(lineWrapper);
  const line = figma.createLine();
  line.strokes = [{
    type: 'SOLID',
    color: {
      r: 0.5921568870544434,
      g: 0.27843138575553894,
      b: 1
    },
    opacity: 1,
    blendMode: 'NORMAL',
    visible: true,
    boundVariables: {}
  }];
  line.strokeWeight = 1;
  line.strokeCap = 'SQUARE';
  return {
    text,
    cell,
    wrapper,
    line,
    lineWrapper
  };
};

/***/ }),

/***/ "./src/shared/components/plugin/table-cell.ts":
/*!****************************************************!*\
  !*** ./src/shared/components/plugin/table-cell.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addStroke: () => (/* binding */ addStroke),
/* harmony export */   createDivider: () => (/* binding */ createDivider),
/* harmony export */   createNewBadge: () => (/* binding */ createNewBadge),
/* harmony export */   createTableCell: () => (/* binding */ createTableCell),
/* harmony export */   createTableHeader: () => (/* binding */ createTableHeader)
/* harmony export */ });
const createDivider = () => {
  const cell = figma.createFrame();
  cell.layoutMode = 'HORIZONTAL';
  cell.layoutWrap = 'NO_WRAP';
  cell.name = 'divider';
  cell.layoutSizingVertical = 'HUG';
  cell.verticalPadding = 12;
  const line = figma.createLine();
  line.rotation = -90;
  line.strokes = [{
    type: 'SOLID',
    color: {
      r: 0,
      g: 0,
      b: 0
    },
    opacity: 0.08,
    blendMode: 'NORMAL',
    visible: true,
    boundVariables: {}
  }];
  line.strokeWeight = 1;
  line.strokeCap = 'ROUND';
  cell.appendChild(line);
  return [cell, line];
};
const createNewBadge = async mark => {
  const newBadge = figma.createFrame();
  newBadge.layoutMode = 'HORIZONTAL';
  newBadge.layoutWrap = 'NO_WRAP';
  newBadge.layoutSizingHorizontal = 'HUG';
  newBadge.layoutSizingVertical = 'HUG';
  newBadge.horizontalPadding = 6;
  newBadge.cornerRadius = 6;
  newBadge.verticalPadding = 4;
  newBadge.name = 'new';
  const newText = figma.createText();
  await figma.loadFontAsync(newText.fontName);
  newText.characters = mark;
  newText.fontSize = 12;
  newText.textAutoResize = 'WIDTH_AND_HEIGHT';
  newText.name = 'badge text';
  newText.fills = [{
    blendMode: 'NORMAL',
    boundVariables: {},
    color: {
      r: 1,
      g: 1,
      b: 1
    },
    opacity: 1,
    type: 'SOLID',
    visible: true
  }];
  newBadge.appendChild(newText);
  return {
    newBadge
  };
};
const createTableCell = async (characters, withMark) => {
  const cell = figma.createFrame();
  cell.layoutMode = 'HORIZONTAL';
  cell.layoutWrap = 'NO_WRAP';
  cell.layoutSizingHorizontal = 'HUG';
  cell.layoutSizingVertical = 'HUG';
  cell.minWidth = 260;
  cell.name = 'cell';
  cell.paddingRight = withMark ? 120 : 0;
  const content = figma.createFrame();
  content.layoutMode = 'HORIZONTAL';
  content.layoutWrap = 'NO_WRAP';
  content.layoutSizingHorizontal = 'HUG';
  content.layoutSizingVertical = 'HUG';
  content.horizontalPadding = 16;
  content.verticalPadding = 14;
  content.name = 'content';
  const text = figma.createText();
  await figma.loadFontAsync(text.fontName);
  text.characters = characters;
  text.fontSize = 14;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.name = 'text';
  content.appendChild(text);
  cell.appendChild(content);
  return {
    cell,
    content
  };
};
const createTableHeader = async characters => {
  const cell = figma.createFrame();
  cell.layoutMode = 'HORIZONTAL';
  cell.layoutWrap = 'NO_WRAP';
  cell.layoutSizingHorizontal = 'HUG';
  cell.layoutSizingVertical = 'HUG';
  cell.minWidth = 200;
  cell.name = 'header';
  const content = figma.createFrame();
  content.layoutMode = 'HORIZONTAL';
  content.layoutWrap = 'NO_WRAP';
  content.layoutSizingHorizontal = 'HUG';
  content.layoutSizingVertical = 'HUG';
  content.horizontalPadding = 16;
  content.verticalPadding = 16;
  content.name = 'content';
  const text = figma.createText();
  await figma.loadFontAsync(text.fontName);
  text.characters = characters;
  text.fontSize = 14;
  text.textAutoResize = 'WIDTH_AND_HEIGHT';
  text.name = 'text';
  content.appendChild(text);
  cell.appendChild(content);
  return cell;
};
const addStroke = cell => {
  cell.layoutSizingHorizontal = 'FILL';
  cell.strokes = [{
    type: 'SOLID',
    color: {
      r: 0,
      g: 0,
      b: 0
    },
    opacity: 0.08,
    blendMode: 'NORMAL',
    visible: true,
    boundVariables: {}
  }];
  cell.strokeBottomWeight = 1;
  cell.strokeLeftWeight = 0;
  cell.strokeRightWeight = 0;
  cell.strokeTopWeight = 0;
};

/***/ }),

/***/ "./src/shared/components/plugin/table-column.ts":
/*!******************************************************!*\
  !*** ./src/shared/components/plugin/table-column.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTableColumn: () => (/* binding */ createTableColumn)
/* harmony export */ });
const createTableColumn = () => {
  const row = figma.createFrame();
  row.layoutMode = 'VERTICAL';
  row.layoutWrap = 'NO_WRAP';
  row.layoutSizingHorizontal = 'HUG';
  row.layoutSizingVertical = 'HUG';
  return row;
};

/***/ }),

/***/ "./src/shared/components/plugin/table.ts":
/*!***********************************************!*\
  !*** ./src/shared/components/plugin/table.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTable: () => (/* binding */ createTable)
/* harmony export */ });
const createTable = () => {
  const table = figma.createFrame();
  table.layoutMode = 'HORIZONTAL';
  table.layoutWrap = 'NO_WRAP';
  table.name = 'tokens table';
  table.layoutSizingHorizontal = 'HUG';
  table.layoutSizingVertical = 'HUG';
  return table;
};

/***/ }),

/***/ "./src/shared/events/index.ts":
/*!************************************!*\
  !*** ./src/shared/events/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: () => (/* reexport safe */ _names__WEBPACK_IMPORTED_MODULE_0__.Events)
/* harmony export */ });
/* harmony import */ var _names__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./names */ "./src/shared/events/names.ts");


/***/ }),

/***/ "./src/shared/events/names.ts":
/*!************************************!*\
  !*** ./src/shared/events/names.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: () => (/* binding */ Events)
/* harmony export */ });
let Events = /*#__PURE__*/function (Events) {
  Events["DrawTable"] = "draw-table";
  Events["LoadVariables"] = "load-variables";
  Events["LoadVariablesResponse"] = "load-variables-response";
  return Events;
}({});

/***/ }),

/***/ "./src/shared/events/postEvents.ts":
/*!*****************************************!*\
  !*** ./src/shared/events/postEvents.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postToPlugin: () => (/* binding */ postToPlugin),
/* harmony export */   postToUI: () => (/* binding */ postToUI)
/* harmony export */ });
const postToPlugin = data => {
  parent.postMessage({
    pluginMessage: data
  }, '*');
};
const postToUI = data => {
  figma.ui.postMessage(data);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/app/plugin/controller.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _features_handlers_handler_matcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/features/handlers/handler-matcher */ "./src/features/handlers/handler-matcher.ts");

figma.showUI(__html__, {
  themeColors: true,
  width: 500,
  height: 700
});
figma.ui.onmessage = msg => {
  if (_features_handlers_handler_matcher__WEBPACK_IMPORTED_MODULE_0__.handlerMatcher[msg.event]) {
    _features_handlers_handler_matcher__WEBPACK_IMPORTED_MODULE_0__.handlerMatcher[msg.event](msg);
  }
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05vRTtBQUVwRUUsS0FBSyxDQUFDNkgsTUFBTSxDQUFDQyxRQUFRLEVBQUU7RUFBRUMsV0FBVyxFQUFFLElBQUk7RUFBRXhELEtBQUssRUFBRSxHQUFHO0VBQUVoQixNQUFNLEVBQUU7QUFBSSxDQUFDLENBQUM7QUFFdEV2RCxLQUFLLENBQUM0SCxFQUFFLENBQUNJLFNBQVMsR0FBSUMsR0FBRyxJQUFLO0VBQzVCLElBQUk5Qyw4RUFBYyxDQUFDOEMsR0FBRyxDQUFDdEMsS0FBSyxDQUFDLEVBQUU7SUFDN0JSLDhFQUFjLENBQUM4QyxHQUFHLENBQUN0QyxLQUFLLENBQUMsQ0FBQ3NDLEdBQUcsQ0FBQztFQUNoQztBQUNGLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci8uL3NyYy9mZWF0dXJlcy9oYW5kbGVycy9kcmF3LXRhYmxlLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL2ZlYXR1cmVzL2hhbmRsZXJzL2hhbmRsZXItbWF0Y2hlci50cyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvZmVhdHVyZXMvaGFuZGxlcnMvbG9hZC12YXJpYWJsZXMtaGFuZGxlci50cyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcGx1Z2luL21hcmtlci50cyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcGx1Z2luL3RhYmxlLWNlbGwudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi90YWJsZS1jb2x1bW4udHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi90YWJsZS50cyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvc2hhcmVkL2V2ZW50cy9uYW1lcy50cyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvc2hhcmVkL2V2ZW50cy9wb3N0RXZlbnRzLnRzIiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci8uL3NyYy9hcHAvcGx1Z2luL2NvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlTWFya2VyIH0gZnJvbSAnQC9zaGFyZWQvY29tcG9uZW50cy9wbHVnaW4vbWFya2VyJ1xuaW1wb3J0IHsgY3JlYXRlVGFibGUgfSBmcm9tICdAL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi90YWJsZSdcbmltcG9ydCB7XG4gIGFkZFN0cm9rZSxcbiAgY3JlYXRlRGl2aWRlcixcbiAgY3JlYXRlTmV3QmFkZ2UsXG4gIGNyZWF0ZVRhYmxlQ2VsbCxcbiAgY3JlYXRlVGFibGVIZWFkZXIsXG59IGZyb20gJ0Avc2hhcmVkL2NvbXBvbmVudHMvcGx1Z2luL3RhYmxlLWNlbGwnXG5pbXBvcnQgeyBjcmVhdGVUYWJsZUNvbHVtbiB9IGZyb20gJ0Avc2hhcmVkL2NvbXBvbmVudHMvcGx1Z2luL3RhYmxlLWNvbHVtbidcbmltcG9ydCB7IFRva2VuTWFyayB9IGZyb20gJ0Avc2hhcmVkL2NvbnN0YW50cy90b2tlbi1tYXJrcydcbmltcG9ydCB7IFRva2Vuc1NldHRpbmdzIH0gZnJvbSAnQC9zaGFyZWQvdHlwZXMvaW50ZXJmYWNlcy50eXBlcydcblxuZXhwb3J0IGNvbnN0IGRyYXdUYWJsZUhhbmRsZXI6IE1lc3NhZ2VFdmVudEhhbmRsZXI8XG4gIFRva2Vuc1NldHRpbmdzIHwgbnVsbFxuPiA9IGFzeW5jICh7IGRhdGEgfSkgPT4ge1xuICBpZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhLnNlbGVjdGVkQ29sbGVjdGlvbiA9PT0gbnVsbCkge1xuICAgIGZpZ21hLm5vdGlmeSgn0J/RgNC+0LLQtdGA0YzRgtC1INCw0LrRgtGD0LDQu9GM0L3QvtGB0YLRjCDQtNCw0L3QvdGL0YUnKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgY29sbGVjdGlvbnMgPSBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zKClcblxuICBpZiAoIWNvbGxlY3Rpb25zLm1hcCgoZWwpID0+IGVsLmlkKS5pbmNsdWRlcyhkYXRhLnNlbGVjdGVkQ29sbGVjdGlvbikpIHtcbiAgICBmaWdtYS5ub3RpZnkoJ9Cf0YDQvtCy0LXRgNGM0YLQtSDQsNC60YLRg9Cw0LvRjNC90L7RgdGC0Ywg0LTQsNC90L3Ri9GFJylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9ucy5maW5kKChlbCkgPT4gZWwuaWQgPT09IGRhdGEuc2VsZWN0ZWRDb2xsZWN0aW9uKVxuXG4gIGlmICghY29sbGVjdGlvbikge1xuICAgIGZpZ21hLm5vdGlmeSgn0J/RgNC+0LLQtdGA0YzRgtC1INCw0LrRgtGD0LDQu9GM0L3QvtGB0YLRjCDQtNCw0L3QvdGL0YUnKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgbW9kZXMgPSBmaWdtYS52YXJpYWJsZXNcbiAgICAuZ2V0VmFyaWFibGVDb2xsZWN0aW9uQnlJZChkYXRhLnNlbGVjdGVkQ29sbGVjdGlvbilcbiAgICA/Lm1vZGVzLmZpbHRlcigoZWwpID0+IGRhdGEuc2VsZWN0ZWRNb2Rlcy5pbmNsdWRlcyhlbC5tb2RlSWQpKVxuXG4gIGlmIChtb2Rlcykge1xuICAgIGNvbnN0IHRhYmxlRGF0YToge1xuICAgICAgbmFtZTogc3RyaW5nXG4gICAgICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gICAgICBtYXJrOiBUb2tlbk1hcmsgfCBudWxsXG4gICAgICB2YWx1ZXM6IHsgW21vZGU6IHN0cmluZ106IHN0cmluZyB9XG4gICAgfVtdID0gW11cblxuICAgIGxldCBpc01hcmsgPSBmYWxzZVxuXG4gICAgY29sbGVjdGlvbi52YXJpYWJsZUlkcy5mb3JFYWNoKCh2YXJpYWJsZUlkKSA9PiB7XG4gICAgICBjb25zdCB2YXJpYWJsZSA9IGZpZ21hLnZhcmlhYmxlcy5nZXRWYXJpYWJsZUJ5SWQodmFyaWFibGVJZClcblxuICAgICAgaWYgKHZhcmlhYmxlICYmICFkYXRhLmhpZGRlblZhcmlhYmxlcy5pbmNsdWRlcyh2YXJpYWJsZS5pZCkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiB7IFttb2RlOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9XG5cbiAgICAgICAgaWYgKHZhcmlhYmxlLnZhbHVlc0J5TW9kZSkge1xuICAgICAgICAgIG1vZGVzLmZvckVhY2goKG1vZGUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1ttb2RlLm5hbWVdID0gdmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGUubW9kZUlkXT8udG9TdHJpbmcoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5tYXJrQXNbdmFyaWFibGUuaWRdKSB7XG4gICAgICAgICAgaXNNYXJrID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdGFibGVEYXRhLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHZhcmlhYmxlLm5hbWUsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHZhcmlhYmxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuICAgICAgICAgIG1hcms6IGRhdGEubWFya0FzW3ZhcmlhYmxlLmlkXSA/PyBudWxsLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBzZWN0aW9uID0gZmlnbWEuY3JlYXRlU2VjdGlvbigpXG4gICAgc2VjdGlvbi5uYW1lID0gJ1Rva2VucyB0YWJsZSdcblxuICAgIGNvbnN0IHRhYmxlID0gY3JlYXRlVGFibGUoKVxuICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQodGFibGUpXG5cbiAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChzZWN0aW9uKVxuXG4gICAgY29uc3QgdGFibGVEYXRhQXJyYXkgPSBbXG4gICAgICBbJ1Rva2VuIG5hbWVzJywgLi4ubW9kZXMubWFwKChtb2RlKSA9PiBtb2RlLm5hbWUpXSxcbiAgICAgIC4uLnRhYmxlRGF0YS5tYXAoKGRhdGEpID0+IFtcbiAgICAgICAgZGF0YS5uYW1lLFxuICAgICAgICAuLi5tb2Rlcy5tYXAoKG1vZGUpID0+IGRhdGEudmFsdWVzW21vZGUubmFtZV0pLFxuICAgICAgXSksXG4gICAgXVxuXG4gICAgY29uc3QgY29sdW1uczogUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlVGFibGVDb2x1bW4+W10gPSBbXVxuXG4gICAgZm9yIChjb25zdCB0aXRsZSBvZiB0YWJsZURhdGFBcnJheVswXSkge1xuICAgICAgY29uc3QgY29sdW1uID0gY3JlYXRlVGFibGVDb2x1bW4oKVxuICAgICAgY29uc3QgaGVhZGVyID0gYXdhaXQgY3JlYXRlVGFibGVIZWFkZXIodGl0bGUpXG5cbiAgICAgIGNvbHVtbi5hcHBlbmRDaGlsZChoZWFkZXIpXG5cbiAgICAgIHRhYmxlLmFwcGVuZENoaWxkKGNvbHVtbilcbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pXG4gICAgfVxuXG4gICAgZm9yIChsZXQgcm93ID0gMTsgcm93IDwgdGFibGVEYXRhQXJyYXkubGVuZ3RoOyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGFibGVEYXRhQXJyYXlbMF0ubGVuZ3RoOyBjb2wrKykge1xuICAgICAgICBjb25zdCB7IGNlbGwgfSA9IGF3YWl0IGNyZWF0ZVRhYmxlQ2VsbChcbiAgICAgICAgICB0YWJsZURhdGFBcnJheVtyb3ddW2NvbF0sXG4gICAgICAgICAgY29sID09PSAwID8gaXNNYXJrIDogZmFsc2UsXG4gICAgICAgIClcblxuICAgICAgICBjb2x1bW5zW2NvbF0uYXBwZW5kQ2hpbGQoY2VsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgY29sSWR4KSA9PiB7XG4gICAgICA7KGNvbHVtbi5jaGlsZHJlbiBhcyBGcmFtZU5vZGVbXSkuZm9yRWFjaChhc3luYyAocm93LCByb3dJZHgpID0+IHtcbiAgICAgICAgYWRkU3Ryb2tlKHJvdylcblxuICAgICAgICBpZiAoY29sSWR4ICE9PSAwKSB7XG4gICAgICAgICAgY29uc3QgW2RpdmlkZXIsIGxpbmVdID0gY3JlYXRlRGl2aWRlcigpXG5cbiAgICAgICAgICBkaXZpZGVyLnJlc2l6ZSgxLCByb3cuaGVpZ2h0KVxuXG4gICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRpdmlkZXIpXG5cbiAgICAgICAgICBsaW5lLmxheW91dFNpemluZ0hvcml6b250YWwgPSAnRklYRUQnXG4gICAgICAgICAgbGluZS5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdGSUxMJ1xuXG4gICAgICAgICAgZGl2aWRlci5sYXlvdXRQb3NpdGlvbmluZyA9ICdBQlNPTFVURSdcbiAgICAgICAgICBkaXZpZGVyLnggPSAwXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgY29sSWR4ID09PSAwICYmXG4gICAgICAgICAgcm93SWR4ICE9PSAwICYmXG4gICAgICAgICAgdGFibGVEYXRhW3Jvd0lkeCAtIDFdLm1hcmsgIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgeyBuZXdCYWRnZSB9ID0gYXdhaXQgY3JlYXRlTmV3QmFkZ2UoXG4gICAgICAgICAgICB0YWJsZURhdGFbcm93SWR4IC0gMV0ubWFyayBhcyBUb2tlbk1hcmssXG4gICAgICAgICAgKVxuICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuZXdCYWRnZSlcblxuICAgICAgICAgIG5ld0JhZGdlLmZpbGxzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgICAgICAgICBib3VuZFZhcmlhYmxlczoge30sXG4gICAgICAgICAgICAgIGNvbG9yOiB7IHI6IDAuNTkyMTU2ODg3MDU0NDQzNCwgZzogMC4yNzg0MzEzODU3NTU1Mzg5NCwgYjogMSB9LFxuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdXG5cbiAgICAgICAgICBuZXdCYWRnZS5sYXlvdXRQb3NpdGlvbmluZyA9ICdBQlNPTFVURSdcbiAgICAgICAgICBuZXdCYWRnZS54ID0gcm93LndpZHRoIC0gbmV3QmFkZ2Uud2lkdGggLSAyMFxuICAgICAgICAgIG5ld0JhZGdlLnkgPSByb3cuaGVpZ2h0IC8gMiAtIG5ld0JhZGdlLmhlaWdodCAvIDJcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgc2VjdGlvbi5yZXNpemVXaXRob3V0Q29uc3RyYWludHModGFibGUud2lkdGggKyA0MDAsIHRhYmxlLmhlaWdodCArIDIwMClcblxuICAgIHRhYmxlLnggPSAzMDBcbiAgICB0YWJsZS55ID0gMTAwXG5cbiAgICB0YWJsZURhdGEuZm9yRWFjaChhc3luYyAoZGF0YSwgcm93SWR4KSA9PiB7XG4gICAgICBpZiAoZGF0YS5kZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCB7IGNlbGwsIHRleHQsIHdyYXBwZXIsIGxpbmUsIGxpbmVXcmFwcGVyIH0gPSBhd2FpdCBjcmVhdGVNYXJrZXIoXG4gICAgICAgICAgZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgKVxuXG4gICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICAgICAgbGluZVdyYXBwZXIuYXBwZW5kQ2hpbGQobGluZSlcbiAgICAgICAgbGluZVdyYXBwZXIubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnRklMTCdcbiAgICAgICAgbGluZS5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0ZJTEwnXG4gICAgICAgIGxpbmUubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnRklMTCdcbiAgICAgICAgdGV4dC5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0ZJTEwnXG5cbiAgICAgICAgd3JhcHBlci5maWxscyA9IFtdXG4gICAgICAgIGxpbmVXcmFwcGVyLmZpbGxzID0gW11cblxuICAgICAgICBjZWxsLmZpbGxzID0gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJsZW5kTW9kZTogJ05PUk1BTCcsXG4gICAgICAgICAgICBib3VuZFZhcmlhYmxlczoge30sXG4gICAgICAgICAgICBjb2xvcjogeyByOiAwLjU5MjE1Njg4NzA1NDQ0MzQsIGc6IDAuMjc4NDMxMzg1NzU1NTM4OTQsIGI6IDEgfSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdXG5cbiAgICAgICAgd3JhcHBlci54ID0gdGFibGUueCAtIHdyYXBwZXIud2lkdGggKyAxNFxuICAgICAgICB3cmFwcGVyLnkgPVxuICAgICAgICAgIGNvbHVtbnNbMF0uY2hpbGRyZW5bMF0/LmhlaWdodCArXG4gICAgICAgICAgMTAwICtcbiAgICAgICAgICByb3dJZHggKiBjb2x1bW5zWzBdLmNoaWxkcmVuWzFdPy5oZWlnaHQgK1xuICAgICAgICAgIChjb2x1bW5zWzBdLmNoaWxkcmVuWzFdPy5oZWlnaHQgLyAyIC0gd3JhcHBlci5oZWlnaHQgLyAyKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbc2VjdGlvbl1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRzIH0gZnJvbSAnQC9zaGFyZWQvZXZlbnRzJ1xuaW1wb3J0IHsgZHJhd1RhYmxlSGFuZGxlciB9IGZyb20gJy4vZHJhdy10YWJsZS1oYW5kbGVyJ1xuaW1wb3J0IHsgbG9hZFZhcmlhYmxlc0hhbmRsZXIgfSBmcm9tICcuL2xvYWQtdmFyaWFibGVzLWhhbmRsZXInXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyTWF0Y2hlcjogUmVjb3JkPHN0cmluZywgTWVzc2FnZUV2ZW50SGFuZGxlcj4gPSB7XG4gIFtFdmVudHMuRHJhd1RhYmxlXTogZHJhd1RhYmxlSGFuZGxlcixcbiAgW0V2ZW50cy5Mb2FkVmFyaWFibGVzXTogbG9hZFZhcmlhYmxlc0hhbmRsZXIsXG59XG4iLCJpbXBvcnQgeyBFdmVudHMgfSBmcm9tICdAL3NoYXJlZC9ldmVudHMnXG5pbXBvcnQgeyBwb3N0VG9VSSB9IGZyb20gJ0Avc2hhcmVkL2V2ZW50cy9wb3N0RXZlbnRzJ1xuaW1wb3J0IHR5cGUgeyBWYXJpYWJsZXNEYXRhIH0gZnJvbSAnQC9zaGFyZWQvdHlwZXMvaW50ZXJmYWNlcy50eXBlcydcblxuZXhwb3J0IGNvbnN0IGxvYWRWYXJpYWJsZXNIYW5kbGVyOiBNZXNzYWdlRXZlbnRIYW5kbGVyID0gKCkgPT4ge1xuICBjb25zdCBjb2xsZWN0aW9ucyA9IGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnMoKVxuXG4gIGNvbnN0IG1vZGVzID0gY29sbGVjdGlvbnMucmVkdWNlKFxuICAgIChhY2MsIGN1cnIpID0+IHtcbiAgICAgIGFjY1tjdXJyLmlkXSA9IGZpZ21hLnZhcmlhYmxlc1xuICAgICAgICAuZ2V0VmFyaWFibGVDb2xsZWN0aW9uQnlJZChjdXJyLmlkKVxuICAgICAgICA/Lm1vZGVzLm1hcCgobW9kZSkgPT4gKHsgbmFtZTogbW9kZS5uYW1lLCBpZDogbW9kZS5tb2RlSWQgfSkpXG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LFxuICAgIHt9IGFzIFZhcmlhYmxlc0RhdGFbJ21vZGVzJ10sXG4gIClcblxuICBjb25zdCB2YXJpYWJsZXMgPSBjb2xsZWN0aW9ucy5yZWR1Y2UoXG4gICAgKGFjYywgY3VycikgPT4ge1xuICAgICAgYWNjW2N1cnIuaWRdID0gY3Vyci52YXJpYWJsZUlkc1xuICAgICAgICAubWFwKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhcmlhYmxlRGF0YSA9IGZpZ21hLnZhcmlhYmxlcy5nZXRWYXJpYWJsZUJ5SWQodmFyaWFibGUpXG5cbiAgICAgICAgICBpZiAodmFyaWFibGVEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBuYW1lOiB2YXJpYWJsZURhdGE/Lm5hbWUsXG4gICAgICAgICAgICAgIGlkOiB2YXJpYWJsZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChlbCkgPT4gZWwgIT09IG51bGwpIGFzIFZhcmlhYmxlc0RhdGFbJ3ZhcmlhYmxlcyddW3N0cmluZ11cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sXG4gICAge30gYXMgVmFyaWFibGVzRGF0YVsndmFyaWFibGVzJ10sXG4gIClcblxuICBjb25zdCBkYXRhOiBWYXJpYWJsZXNEYXRhID0ge1xuICAgIGNvbGxlY3Rpb25zOiBjb2xsZWN0aW9ucy5tYXAoKGNvbGxlY3Rpb24pID0+ICh7XG4gICAgICBuYW1lOiBjb2xsZWN0aW9uLm5hbWUsXG4gICAgICBpZDogY29sbGVjdGlvbi5pZCxcbiAgICB9KSksXG4gICAgbW9kZXMsXG4gICAgdmFyaWFibGVzLFxuICB9XG5cbiAgcG9zdFRvVUkoe1xuICAgIGV2ZW50OiBFdmVudHMuTG9hZFZhcmlhYmxlc1Jlc3BvbnNlLFxuICAgIGRhdGEsXG4gIH0pXG59XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlTWFya2VyID0gYXN5bmMgKHRpdGxlOiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgd3JhcHBlciA9IGZpZ21hLmNyZWF0ZUZyYW1lKClcbiAgd3JhcHBlci5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnXG4gIHdyYXBwZXIubGF5b3V0V3JhcCA9ICdOT19XUkFQJ1xuICB3cmFwcGVyLm5hbWUgPSAnbWFya2VyJ1xuICB3cmFwcGVyLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcbiAgd3JhcHBlci5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRydcblxuICBjb25zdCBjZWxsID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBjZWxsLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgY2VsbC5sYXlvdXRXcmFwID0gJ05PX1dSQVAnXG4gIGNlbGwubmFtZSA9ICdkZXNjcmlwdGlvbidcbiAgY2VsbC5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIGNlbGwubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIGNlbGwudmVydGljYWxQYWRkaW5nID0gMFxuICBjZWxsLmhvcml6b250YWxQYWRkaW5nID0gNlxuICBjZWxsLmNvcm5lclJhZGl1cyA9IDZcbiAgY2VsbC5tYXhXaWR0aCA9IDI1MFxuXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2VsbClcblxuICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4gIGF3YWl0IGZpZ21hLmxvYWRGb250QXN5bmModGV4dC5mb250TmFtZSBhcyBGb250TmFtZSlcbiAgdGV4dC5jaGFyYWN0ZXJzID0gdGl0bGVcbiAgdGV4dC5mb250U2l6ZSA9IDEyXG4gIHRleHQudGV4dEF1dG9SZXNpemUgPSAnV0lEVEhfQU5EX0hFSUdIVCdcbiAgdGV4dC5uYW1lID0gJ3RleHQnXG4gIGNlbGwuYXBwZW5kQ2hpbGQodGV4dClcblxuICB0ZXh0LmZpbGxzID0gW1xuICAgIHtcbiAgICAgIGJsZW5kTW9kZTogJ05PUk1BTCcsXG4gICAgICBib3VuZFZhcmlhYmxlczoge30sXG4gICAgICBjb2xvcjogeyByOiAxLCBnOiAxLCBiOiAxIH0sXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfSxcbiAgXVxuXG4gIGNvbnN0IGxpbmVXcmFwcGVyID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBsaW5lV3JhcHBlci5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnXG4gIGxpbmVXcmFwcGVyLmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgbGluZVdyYXBwZXIubmFtZSA9ICdsaW5lIHdyYXBwZXInXG4gIGxpbmVXcmFwcGVyLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcbiAgbGluZVdyYXBwZXIubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG5cbiAgd3JhcHBlci5hcHBlbmRDaGlsZChsaW5lV3JhcHBlcilcblxuICBjb25zdCBsaW5lID0gZmlnbWEuY3JlYXRlTGluZSgpXG4gIGxpbmUuc3Ryb2tlcyA9IFtcbiAgICB7XG4gICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgY29sb3I6IHsgcjogMC41OTIxNTY4ODcwNTQ0NDM0LCBnOiAwLjI3ODQzMTM4NTc1NTUzODk0LCBiOiAxIH0sXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgYmxlbmRNb2RlOiAnTk9STUFMJyxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBib3VuZFZhcmlhYmxlczoge30sXG4gICAgfSxcbiAgXVxuICBsaW5lLnN0cm9rZVdlaWdodCA9IDFcbiAgbGluZS5zdHJva2VDYXAgPSAnU1FVQVJFJ1xuXG4gIHJldHVybiB7XG4gICAgdGV4dCxcbiAgICBjZWxsLFxuICAgIHdyYXBwZXIsXG4gICAgbGluZSxcbiAgICBsaW5lV3JhcHBlcixcbiAgfVxufVxuIiwiaW1wb3J0IHsgVG9rZW5NYXJrIH0gZnJvbSAnQC9zaGFyZWQvY29uc3RhbnRzL3Rva2VuLW1hcmtzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGl2aWRlciA9ICgpOiBbRnJhbWVOb2RlLCBMaW5lTm9kZV0gPT4ge1xuICBjb25zdCBjZWxsID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBjZWxsLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgY2VsbC5sYXlvdXRXcmFwID0gJ05PX1dSQVAnXG4gIGNlbGwubmFtZSA9ICdkaXZpZGVyJ1xuICBjZWxsLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcbiAgY2VsbC52ZXJ0aWNhbFBhZGRpbmcgPSAxMlxuXG4gIGNvbnN0IGxpbmUgPSBmaWdtYS5jcmVhdGVMaW5lKClcbiAgbGluZS5yb3RhdGlvbiA9IC05MFxuICBsaW5lLnN0cm9rZXMgPSBbXG4gICAge1xuICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgIGNvbG9yOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICAgIG9wYWNpdHk6IDAuMDgsXG4gICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIGJvdW5kVmFyaWFibGVzOiB7fSxcbiAgICB9LFxuICBdXG4gIGxpbmUuc3Ryb2tlV2VpZ2h0ID0gMVxuICBsaW5lLnN0cm9rZUNhcCA9ICdST1VORCdcblxuICBjZWxsLmFwcGVuZENoaWxkKGxpbmUpXG5cbiAgcmV0dXJuIFtjZWxsLCBsaW5lXVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTmV3QmFkZ2UgPSBhc3luYyAobWFyazogVG9rZW5NYXJrKSA9PiB7XG4gIGNvbnN0IG5ld0JhZGdlID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBuZXdCYWRnZS5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnXG4gIG5ld0JhZGdlLmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgbmV3QmFkZ2UubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIG5ld0JhZGdlLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcbiAgbmV3QmFkZ2UuaG9yaXpvbnRhbFBhZGRpbmcgPSA2XG4gIG5ld0JhZGdlLmNvcm5lclJhZGl1cyA9IDZcbiAgbmV3QmFkZ2UudmVydGljYWxQYWRkaW5nID0gNFxuICBuZXdCYWRnZS5uYW1lID0gJ25ldydcblxuICBjb25zdCBuZXdUZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4gIGF3YWl0IGZpZ21hLmxvYWRGb250QXN5bmMobmV3VGV4dC5mb250TmFtZSBhcyBGb250TmFtZSlcbiAgbmV3VGV4dC5jaGFyYWN0ZXJzID0gbWFya1xuICBuZXdUZXh0LmZvbnRTaXplID0gMTJcbiAgbmV3VGV4dC50ZXh0QXV0b1Jlc2l6ZSA9ICdXSURUSF9BTkRfSEVJR0hUJ1xuICBuZXdUZXh0Lm5hbWUgPSAnYmFkZ2UgdGV4dCdcbiAgbmV3VGV4dC5maWxscyA9IFtcbiAgICB7XG4gICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgICAgY29sb3I6IHsgcjogMSwgZzogMSwgYjogMSB9LFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH0sXG4gIF1cblxuICBuZXdCYWRnZS5hcHBlbmRDaGlsZChuZXdUZXh0KVxuXG4gIHJldHVybiB7XG4gICAgbmV3QmFkZ2UsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRhYmxlQ2VsbCA9IGFzeW5jIChcbiAgY2hhcmFjdGVyczogc3RyaW5nLFxuICB3aXRoTWFyazogYm9vbGVhbixcbikgPT4ge1xuICBjb25zdCBjZWxsID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBjZWxsLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgY2VsbC5sYXlvdXRXcmFwID0gJ05PX1dSQVAnXG4gIGNlbGwubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIGNlbGwubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuICBjZWxsLm1pbldpZHRoID0gMjYwXG4gIGNlbGwubmFtZSA9ICdjZWxsJ1xuICBjZWxsLnBhZGRpbmdSaWdodCA9IHdpdGhNYXJrID8gMTIwIDogMFxuXG4gIGNvbnN0IGNvbnRlbnQgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIGNvbnRlbnQubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICBjb250ZW50LmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgY29udGVudC5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRydcbiAgY29udGVudC5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIGNvbnRlbnQuaG9yaXpvbnRhbFBhZGRpbmcgPSAxNlxuICBjb250ZW50LnZlcnRpY2FsUGFkZGluZyA9IDE0XG4gIGNvbnRlbnQubmFtZSA9ICdjb250ZW50J1xuXG4gIGNvbnN0IHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KClcbiAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyh0ZXh0LmZvbnROYW1lIGFzIEZvbnROYW1lKVxuICB0ZXh0LmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzXG4gIHRleHQuZm9udFNpemUgPSAxNFxuICB0ZXh0LnRleHRBdXRvUmVzaXplID0gJ1dJRFRIX0FORF9IRUlHSFQnXG4gIHRleHQubmFtZSA9ICd0ZXh0J1xuXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQodGV4dClcbiAgY2VsbC5hcHBlbmRDaGlsZChjb250ZW50KVxuXG4gIHJldHVybiB7IGNlbGwsIGNvbnRlbnQgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVGFibGVIZWFkZXIgPSBhc3luYyAoY2hhcmFjdGVyczogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGNlbGwgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIGNlbGwubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICBjZWxsLmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgY2VsbC5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRydcbiAgY2VsbC5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIGNlbGwubWluV2lkdGggPSAyMDBcbiAgY2VsbC5uYW1lID0gJ2hlYWRlcidcblxuICBjb25zdCBjb250ZW50ID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBjb250ZW50LmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgY29udGVudC5sYXlvdXRXcmFwID0gJ05PX1dSQVAnXG4gIGNvbnRlbnQubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIGNvbnRlbnQubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuICBjb250ZW50Lmhvcml6b250YWxQYWRkaW5nID0gMTZcbiAgY29udGVudC52ZXJ0aWNhbFBhZGRpbmcgPSAxNlxuICBjb250ZW50Lm5hbWUgPSAnY29udGVudCdcblxuICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4gIGF3YWl0IGZpZ21hLmxvYWRGb250QXN5bmModGV4dC5mb250TmFtZSBhcyBGb250TmFtZSlcbiAgdGV4dC5jaGFyYWN0ZXJzID0gY2hhcmFjdGVyc1xuICB0ZXh0LmZvbnRTaXplID0gMTRcbiAgdGV4dC50ZXh0QXV0b1Jlc2l6ZSA9ICdXSURUSF9BTkRfSEVJR0hUJ1xuICB0ZXh0Lm5hbWUgPSAndGV4dCdcblxuICBjb250ZW50LmFwcGVuZENoaWxkKHRleHQpXG4gIGNlbGwuYXBwZW5kQ2hpbGQoY29udGVudClcblxuICByZXR1cm4gY2VsbFxufVxuXG5leHBvcnQgY29uc3QgYWRkU3Ryb2tlID0gKGNlbGw6IEZyYW1lTm9kZSkgPT4ge1xuICBjZWxsLmxheW91dFNpemluZ0hvcml6b250YWwgPSAnRklMTCdcbiAgY2VsbC5zdHJva2VzID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgICBvcGFjaXR5OiAwLjA4LFxuICAgICAgYmxlbmRNb2RlOiAnTk9STUFMJyxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBib3VuZFZhcmlhYmxlczoge30sXG4gICAgfSxcbiAgXVxuICBjZWxsLnN0cm9rZUJvdHRvbVdlaWdodCA9IDFcbiAgY2VsbC5zdHJva2VMZWZ0V2VpZ2h0ID0gMFxuICBjZWxsLnN0cm9rZVJpZ2h0V2VpZ2h0ID0gMFxuICBjZWxsLnN0cm9rZVRvcFdlaWdodCA9IDBcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVUYWJsZUNvbHVtbiA9ICgpID0+IHtcbiAgY29uc3Qgcm93ID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICByb3cubGF5b3V0TW9kZSA9ICdWRVJUSUNBTCdcbiAgcm93LmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgcm93LmxheW91dFNpemluZ0hvcml6b250YWwgPSAnSFVHJ1xuICByb3cubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuXG4gIHJldHVybiByb3dcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVUYWJsZSA9ICgpID0+IHtcbiAgY29uc3QgdGFibGUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIHRhYmxlLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgdGFibGUubGF5b3V0V3JhcCA9ICdOT19XUkFQJ1xuICB0YWJsZS5uYW1lID0gJ3Rva2VucyB0YWJsZSdcbiAgdGFibGUubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIHRhYmxlLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcblxuICByZXR1cm4gdGFibGVcbn1cbiIsImV4cG9ydCBlbnVtIEV2ZW50cyB7XG4gIERyYXdUYWJsZSA9ICdkcmF3LXRhYmxlJyxcbiAgTG9hZFZhcmlhYmxlcyA9ICdsb2FkLXZhcmlhYmxlcycsXG4gIExvYWRWYXJpYWJsZXNSZXNwb25zZSA9ICdsb2FkLXZhcmlhYmxlcy1yZXNwb25zZScsXG59XG4iLCJleHBvcnQgY29uc3QgcG9zdFRvUGx1Z2luID0gKGRhdGE6IFBsdWdpbk1lc3NhZ2UpID0+IHtcbiAgcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogZGF0YSB9LCAnKicpXG59XG5cbmV4cG9ydCBjb25zdCBwb3N0VG9VSSA9IChkYXRhOiBQbHVnaW5NZXNzYWdlKSA9PiB7XG4gIGZpZ21hLnVpLnBvc3RNZXNzYWdlKGRhdGEpXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGhhbmRsZXJNYXRjaGVyIH0gZnJvbSAnQC9mZWF0dXJlcy9oYW5kbGVycy9oYW5kbGVyLW1hdGNoZXInXG5cbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB0aGVtZUNvbG9yczogdHJ1ZSwgd2lkdGg6IDUwMCwgaGVpZ2h0OiA3MDAgfSlcblxuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICBpZiAoaGFuZGxlck1hdGNoZXJbbXNnLmV2ZW50XSkge1xuICAgIGhhbmRsZXJNYXRjaGVyW21zZy5ldmVudF0obXNnKVxuICB9XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlTWFya2VyIiwiY3JlYXRlVGFibGUiLCJhZGRTdHJva2UiLCJjcmVhdGVEaXZpZGVyIiwiY3JlYXRlTmV3QmFkZ2UiLCJjcmVhdGVUYWJsZUNlbGwiLCJjcmVhdGVUYWJsZUhlYWRlciIsImNyZWF0ZVRhYmxlQ29sdW1uIiwiZHJhd1RhYmxlSGFuZGxlciIsIl9yZWYiLCJfZmlnbWEkdmFyaWFibGVzJGdldFYiLCJkYXRhIiwic2VsZWN0ZWRDb2xsZWN0aW9uIiwiZmlnbWEiLCJub3RpZnkiLCJjb2xsZWN0aW9ucyIsInZhcmlhYmxlcyIsImdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9ucyIsIm1hcCIsImVsIiwiaWQiLCJpbmNsdWRlcyIsImNvbGxlY3Rpb24iLCJmaW5kIiwibW9kZXMiLCJnZXRWYXJpYWJsZUNvbGxlY3Rpb25CeUlkIiwiZmlsdGVyIiwic2VsZWN0ZWRNb2RlcyIsIm1vZGVJZCIsInRhYmxlRGF0YSIsImlzTWFyayIsInZhcmlhYmxlSWRzIiwiZm9yRWFjaCIsInZhcmlhYmxlSWQiLCJ2YXJpYWJsZSIsImdldFZhcmlhYmxlQnlJZCIsImhpZGRlblZhcmlhYmxlcyIsIl9kYXRhJG1hcmtBcyR2YXJpYWJsZSIsInZhbHVlcyIsInZhbHVlc0J5TW9kZSIsIm1vZGUiLCJfdmFyaWFibGUkdmFsdWVzQnlNb2QiLCJuYW1lIiwidG9TdHJpbmciLCJtYXJrQXMiLCJwdXNoIiwiZGVzY3JpcHRpb24iLCJtYXJrIiwic2VjdGlvbiIsImNyZWF0ZVNlY3Rpb24iLCJ0YWJsZSIsImFwcGVuZENoaWxkIiwiY3VycmVudFBhZ2UiLCJ0YWJsZURhdGFBcnJheSIsImNvbHVtbnMiLCJ0aXRsZSIsImNvbHVtbiIsImhlYWRlciIsInJvdyIsImxlbmd0aCIsImNvbCIsImNlbGwiLCJjb2xJZHgiLCJjaGlsZHJlbiIsInJvd0lkeCIsImRpdmlkZXIiLCJsaW5lIiwicmVzaXplIiwiaGVpZ2h0IiwibGF5b3V0U2l6aW5nSG9yaXpvbnRhbCIsImxheW91dFNpemluZ1ZlcnRpY2FsIiwibGF5b3V0UG9zaXRpb25pbmciLCJ4IiwibmV3QmFkZ2UiLCJmaWxscyIsImJsZW5kTW9kZSIsImJvdW5kVmFyaWFibGVzIiwiY29sb3IiLCJyIiwiZyIsImIiLCJvcGFjaXR5IiwidHlwZSIsInZpc2libGUiLCJ3aWR0aCIsInkiLCJyZXNpemVXaXRob3V0Q29uc3RyYWludHMiLCJfY29sdW1ucyQwJGNoaWxkcmVuJCIsIl9jb2x1bW5zJDAkY2hpbGRyZW4kMiIsIl9jb2x1bW5zJDAkY2hpbGRyZW4kMyIsInRleHQiLCJ3cmFwcGVyIiwibGluZVdyYXBwZXIiLCJzZWxlY3Rpb24iLCJFdmVudHMiLCJsb2FkVmFyaWFibGVzSGFuZGxlciIsImhhbmRsZXJNYXRjaGVyIiwiRHJhd1RhYmxlIiwiTG9hZFZhcmlhYmxlcyIsInBvc3RUb1VJIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsInZhcmlhYmxlRGF0YSIsImV2ZW50IiwiTG9hZFZhcmlhYmxlc1Jlc3BvbnNlIiwiY3JlYXRlRnJhbWUiLCJsYXlvdXRNb2RlIiwibGF5b3V0V3JhcCIsInZlcnRpY2FsUGFkZGluZyIsImhvcml6b250YWxQYWRkaW5nIiwiY29ybmVyUmFkaXVzIiwibWF4V2lkdGgiLCJjcmVhdGVUZXh0IiwibG9hZEZvbnRBc3luYyIsImZvbnROYW1lIiwiY2hhcmFjdGVycyIsImZvbnRTaXplIiwidGV4dEF1dG9SZXNpemUiLCJjcmVhdGVMaW5lIiwic3Ryb2tlcyIsInN0cm9rZVdlaWdodCIsInN0cm9rZUNhcCIsInJvdGF0aW9uIiwibmV3VGV4dCIsIndpdGhNYXJrIiwibWluV2lkdGgiLCJwYWRkaW5nUmlnaHQiLCJjb250ZW50Iiwic3Ryb2tlQm90dG9tV2VpZ2h0Iiwic3Ryb2tlTGVmdFdlaWdodCIsInN0cm9rZVJpZ2h0V2VpZ2h0Iiwic3Ryb2tlVG9wV2VpZ2h0IiwicG9zdFRvUGx1Z2luIiwicGFyZW50IiwicG9zdE1lc3NhZ2UiLCJwbHVnaW5NZXNzYWdlIiwidWkiLCJzaG93VUkiLCJfX2h0bWxfXyIsInRoZW1lQ29sb3JzIiwib25tZXNzYWdlIiwibXNnIl0sInNvdXJjZVJvb3QiOiIifQ==