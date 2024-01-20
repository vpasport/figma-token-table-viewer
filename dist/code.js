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
    collection.variableIds.forEach(variableId => {
      const variable = figma.variables.getVariableById(variableId);
      if (variable && !data.hiddenVariables.includes(variable.id)) {
        const values = {};
        if (variable.valuesByMode) {
          modes.forEach(mode => {
            var _variable$valuesByMod;
            values[mode.name] = (_variable$valuesByMod = variable.valuesByMode[mode.modeId]) === null || _variable$valuesByMod === void 0 ? void 0 : _variable$valuesByMod.toString();
          });
        }
        tableData.push({
          name: variable.name,
          description: variable.description,
          values: values,
          isNew: data.maskAsNewVariables.includes(variable.id)
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
        } = await (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.createTableCell)(tableDataArray[row][col]);
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
        if (colIdx === 0 && rowIdx !== 0 && tableData[rowIdx - 1].isNew) {
          const {
            newBadge
          } = await (0,_shared_components_plugin_table_cell__WEBPACK_IMPORTED_MODULE_2__.createNewBadge)();
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
const createNewBadge = async () => {
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
  newText.characters = 'NEW';
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
const createTableCell = async characters => {
  const cell = figma.createFrame();
  cell.layoutMode = 'HORIZONTAL';
  cell.layoutWrap = 'NO_WRAP';
  cell.layoutSizingHorizontal = 'HUG';
  cell.layoutSizingVertical = 'HUG';
  cell.minWidth = 260;
  cell.name = 'cell';
  cell.paddingRight = 60;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ3JDLEtBQUssQ0FBQyxFQUFFO0lBQzdCUiw4RUFBYyxDQUFDNkMsR0FBRyxDQUFDckMsS0FBSyxDQUFDLENBQUNxQyxHQUFHLENBQUM7RUFDaEM7QUFDRixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvZmVhdHVyZXMvaGFuZGxlcnMvZHJhdy10YWJsZS1oYW5kbGVyLnRzIiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci8uL3NyYy9mZWF0dXJlcy9oYW5kbGVycy9oYW5kbGVyLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL2ZlYXR1cmVzL2hhbmRsZXJzL2xvYWQtdmFyaWFibGVzLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi9tYXJrZXIudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi90YWJsZS1jZWxsLnRzIiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9wbHVnaW4vdGFibGUtY29sdW1uLnRzIiwid2VicGFjazovL3Rva2VuLXRhYmxlLXZpZXdlci8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9wbHVnaW4vdGFibGUudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL3NoYXJlZC9ldmVudHMvbmFtZXMudHMiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyLy4vc3JjL3NoYXJlZC9ldmVudHMvcG9zdEV2ZW50cy50cyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9rZW4tdGFibGUtdmlld2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2tlbi10YWJsZS12aWV3ZXIvLi9zcmMvYXBwL3BsdWdpbi9jb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZU1hcmtlciB9IGZyb20gJ0Avc2hhcmVkL2NvbXBvbmVudHMvcGx1Z2luL21hcmtlcidcbmltcG9ydCB7IGNyZWF0ZVRhYmxlIH0gZnJvbSAnQC9zaGFyZWQvY29tcG9uZW50cy9wbHVnaW4vdGFibGUnXG5pbXBvcnQge1xuICBhZGRTdHJva2UsXG4gIGNyZWF0ZURpdmlkZXIsXG4gIGNyZWF0ZU5ld0JhZGdlLFxuICBjcmVhdGVUYWJsZUNlbGwsXG4gIGNyZWF0ZVRhYmxlSGVhZGVyLFxufSBmcm9tICdAL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi90YWJsZS1jZWxsJ1xuaW1wb3J0IHsgY3JlYXRlVGFibGVDb2x1bW4gfSBmcm9tICdAL3NoYXJlZC9jb21wb25lbnRzL3BsdWdpbi90YWJsZS1jb2x1bW4nXG5cbmV4cG9ydCBjb25zdCBkcmF3VGFibGVIYW5kbGVyOiBNZXNzYWdlRXZlbnRIYW5kbGVyID0gYXN5bmMgKHsgZGF0YSB9KSA9PiB7XG4gIGNvbnN0IGNvbGxlY3Rpb25zID0gZmlnbWEudmFyaWFibGVzLmdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9ucygpXG5cbiAgaWYgKCFjb2xsZWN0aW9ucy5tYXAoKGVsKSA9PiBlbC5pZCkuaW5jbHVkZXMoZGF0YS5zZWxlY3RlZENvbGxlY3Rpb24pKSB7XG4gICAgZmlnbWEubm90aWZ5KCfQn9GA0L7QstC10YDRjNGC0LUg0LDQutGC0YPQsNC70YzQvdC+0YHRgtGMINC00LDQvdC90YvRhScpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBjb2xsZWN0aW9uID0gY29sbGVjdGlvbnMuZmluZCgoZWwpID0+IGVsLmlkID09PSBkYXRhLnNlbGVjdGVkQ29sbGVjdGlvbilcblxuICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICBmaWdtYS5ub3RpZnkoJ9Cf0YDQvtCy0LXRgNGM0YLQtSDQsNC60YLRg9Cw0LvRjNC90L7RgdGC0Ywg0LTQsNC90L3Ri9GFJylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IG1vZGVzID0gZmlnbWEudmFyaWFibGVzXG4gICAgLmdldFZhcmlhYmxlQ29sbGVjdGlvbkJ5SWQoZGF0YS5zZWxlY3RlZENvbGxlY3Rpb24pXG4gICAgPy5tb2Rlcy5maWx0ZXIoKGVsKSA9PiBkYXRhLnNlbGVjdGVkTW9kZXMuaW5jbHVkZXMoZWwubW9kZUlkKSlcblxuICBpZiAobW9kZXMpIHtcbiAgICBjb25zdCB0YWJsZURhdGE6IHtcbiAgICAgIG5hbWU6IHN0cmluZ1xuICAgICAgZGVzY3JpcHRpb246IHN0cmluZ1xuICAgICAgaXNOZXc6IGJvb2xlYW5cbiAgICAgIHZhbHVlczogeyBbbW9kZTogc3RyaW5nXTogc3RyaW5nIH1cbiAgICB9W10gPSBbXVxuXG4gICAgY29sbGVjdGlvbi52YXJpYWJsZUlkcy5mb3JFYWNoKCh2YXJpYWJsZUlkKSA9PiB7XG4gICAgICBjb25zdCB2YXJpYWJsZSA9IGZpZ21hLnZhcmlhYmxlcy5nZXRWYXJpYWJsZUJ5SWQodmFyaWFibGVJZClcblxuICAgICAgaWYgKHZhcmlhYmxlICYmICFkYXRhLmhpZGRlblZhcmlhYmxlcy5pbmNsdWRlcyh2YXJpYWJsZS5pZCkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiB7IFttb2RlOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9XG5cbiAgICAgICAgaWYgKHZhcmlhYmxlLnZhbHVlc0J5TW9kZSkge1xuICAgICAgICAgIG1vZGVzLmZvckVhY2goKG1vZGUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1ttb2RlLm5hbWVdID0gdmFyaWFibGUudmFsdWVzQnlNb2RlW21vZGUubW9kZUlkXT8udG9TdHJpbmcoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZURhdGEucHVzaCh7XG4gICAgICAgICAgbmFtZTogdmFyaWFibGUubmFtZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogdmFyaWFibGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgICAgICAgaXNOZXc6IGRhdGEubWFza0FzTmV3VmFyaWFibGVzLmluY2x1ZGVzKHZhcmlhYmxlLmlkKSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc2VjdGlvbiA9IGZpZ21hLmNyZWF0ZVNlY3Rpb24oKVxuICAgIHNlY3Rpb24ubmFtZSA9ICdUb2tlbnMgdGFibGUnXG5cbiAgICBjb25zdCB0YWJsZSA9IGNyZWF0ZVRhYmxlKClcbiAgICBzZWN0aW9uLmFwcGVuZENoaWxkKHRhYmxlKVxuXG4gICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoc2VjdGlvbilcblxuICAgIGNvbnN0IHRhYmxlRGF0YUFycmF5ID0gW1xuICAgICAgWydUb2tlbiBuYW1lcycsIC4uLm1vZGVzLm1hcCgobW9kZSkgPT4gbW9kZS5uYW1lKV0sXG4gICAgICAuLi50YWJsZURhdGEubWFwKChkYXRhKSA9PiBbXG4gICAgICAgIGRhdGEubmFtZSxcbiAgICAgICAgLi4ubW9kZXMubWFwKChtb2RlKSA9PiBkYXRhLnZhbHVlc1ttb2RlLm5hbWVdKSxcbiAgICAgIF0pLFxuICAgIF1cblxuICAgIGNvbnN0IGNvbHVtbnM6IFJldHVyblR5cGU8dHlwZW9mIGNyZWF0ZVRhYmxlQ29sdW1uPltdID0gW11cblxuICAgIGZvciAoY29uc3QgdGl0bGUgb2YgdGFibGVEYXRhQXJyYXlbMF0pIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGNyZWF0ZVRhYmxlQ29sdW1uKClcbiAgICAgIGNvbnN0IGhlYWRlciA9IGF3YWl0IGNyZWF0ZVRhYmxlSGVhZGVyKHRpdGxlKVxuXG4gICAgICBjb2x1bW4uYXBwZW5kQ2hpbGQoaGVhZGVyKVxuXG4gICAgICB0YWJsZS5hcHBlbmRDaGlsZChjb2x1bW4pXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKVxuICAgIH1cblxuICAgIGZvciAobGV0IHJvdyA9IDE7IHJvdyA8IHRhYmxlRGF0YUFycmF5Lmxlbmd0aDsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRhYmxlRGF0YUFycmF5WzBdLmxlbmd0aDsgY29sKyspIHtcbiAgICAgICAgY29uc3QgeyBjZWxsIH0gPSBhd2FpdCBjcmVhdGVUYWJsZUNlbGwodGFibGVEYXRhQXJyYXlbcm93XVtjb2xdKVxuXG4gICAgICAgIGNvbHVtbnNbY29sXS5hcHBlbmRDaGlsZChjZWxsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2xJZHgpID0+IHtcbiAgICAgIDsoY29sdW1uLmNoaWxkcmVuIGFzIEZyYW1lTm9kZVtdKS5mb3JFYWNoKGFzeW5jIChyb3csIHJvd0lkeCkgPT4ge1xuICAgICAgICBhZGRTdHJva2Uocm93KVxuXG4gICAgICAgIGlmIChjb2xJZHggIT09IDApIHtcbiAgICAgICAgICBjb25zdCBbZGl2aWRlciwgbGluZV0gPSBjcmVhdGVEaXZpZGVyKClcblxuICAgICAgICAgIGRpdmlkZXIucmVzaXplKDEsIHJvdy5oZWlnaHQpXG5cbiAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGl2aWRlcilcblxuICAgICAgICAgIGxpbmUubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdGSVhFRCdcbiAgICAgICAgICBsaW5lLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0ZJTEwnXG5cbiAgICAgICAgICBkaXZpZGVyLmxheW91dFBvc2l0aW9uaW5nID0gJ0FCU09MVVRFJ1xuICAgICAgICAgIGRpdmlkZXIueCA9IDBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2xJZHggPT09IDAgJiYgcm93SWR4ICE9PSAwICYmIHRhYmxlRGF0YVtyb3dJZHggLSAxXS5pc05ldykge1xuICAgICAgICAgIGNvbnN0IHsgbmV3QmFkZ2UgfSA9IGF3YWl0IGNyZWF0ZU5ld0JhZGdlKClcbiAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQobmV3QmFkZ2UpXG5cbiAgICAgICAgICBuZXdCYWRnZS5maWxscyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYmxlbmRNb2RlOiAnTk9STUFMJyxcbiAgICAgICAgICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgICAgICAgICAgICBjb2xvcjogeyByOiAwLjU5MjE1Njg4NzA1NDQ0MzQsIGc6IDAuMjc4NDMxMzg1NzU1NTM4OTQsIGI6IDEgfSxcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXVxuXG4gICAgICAgICAgbmV3QmFkZ2UubGF5b3V0UG9zaXRpb25pbmcgPSAnQUJTT0xVVEUnXG4gICAgICAgICAgbmV3QmFkZ2UueCA9IHJvdy53aWR0aCAtIG5ld0JhZGdlLndpZHRoIC0gMjBcbiAgICAgICAgICBuZXdCYWRnZS55ID0gcm93LmhlaWdodCAvIDIgLSBuZXdCYWRnZS5oZWlnaHQgLyAyXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHNlY3Rpb24ucmVzaXplV2l0aG91dENvbnN0cmFpbnRzKHRhYmxlLndpZHRoICsgNDAwLCB0YWJsZS5oZWlnaHQgKyAyMDApXG5cbiAgICB0YWJsZS54ID0gMzAwXG4gICAgdGFibGUueSA9IDEwMFxuXG4gICAgdGFibGVEYXRhLmZvckVhY2goYXN5bmMgKGRhdGEsIHJvd0lkeCkgPT4ge1xuICAgICAgaWYgKGRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgY29uc3QgeyBjZWxsLCB0ZXh0LCB3cmFwcGVyLCBsaW5lLCBsaW5lV3JhcHBlciB9ID0gYXdhaXQgY3JlYXRlTWFya2VyKFxuICAgICAgICAgIGRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgIClcblxuICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgICAgIGxpbmVXcmFwcGVyLmFwcGVuZENoaWxkKGxpbmUpXG4gICAgICAgIGxpbmVXcmFwcGVyLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0ZJTEwnXG4gICAgICAgIGxpbmUubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdGSUxMJ1xuICAgICAgICBsaW5lLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0ZJTEwnXG4gICAgICAgIHRleHQubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdGSUxMJ1xuXG4gICAgICAgIHdyYXBwZXIuZmlsbHMgPSBbXVxuICAgICAgICBsaW5lV3JhcHBlci5maWxscyA9IFtdXG5cbiAgICAgICAgY2VsbC5maWxscyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgICAgICAgICAgY29sb3I6IHsgcjogMC41OTIxNTY4ODcwNTQ0NDM0LCBnOiAwLjI3ODQzMTM4NTc1NTUzODk0LCBiOiAxIH0sXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuXG4gICAgICAgIHdyYXBwZXIueCA9IHRhYmxlLnggLSB3cmFwcGVyLndpZHRoICsgMTRcbiAgICAgICAgd3JhcHBlci55ID1cbiAgICAgICAgICBjb2x1bW5zWzBdLmNoaWxkcmVuWzBdPy5oZWlnaHQgK1xuICAgICAgICAgIDEwMCArXG4gICAgICAgICAgcm93SWR4ICogY29sdW1uc1swXS5jaGlsZHJlblsxXT8uaGVpZ2h0ICtcbiAgICAgICAgICAoY29sdW1uc1swXS5jaGlsZHJlblsxXT8uaGVpZ2h0IC8gMiAtIHdyYXBwZXIuaGVpZ2h0IC8gMilcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW3NlY3Rpb25dXG4gIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50cyB9IGZyb20gJ0Avc2hhcmVkL2V2ZW50cydcbmltcG9ydCB7IGRyYXdUYWJsZUhhbmRsZXIgfSBmcm9tICcuL2RyYXctdGFibGUtaGFuZGxlcidcbmltcG9ydCB7IGxvYWRWYXJpYWJsZXNIYW5kbGVyIH0gZnJvbSAnLi9sb2FkLXZhcmlhYmxlcy1oYW5kbGVyJ1xuXG5leHBvcnQgY29uc3QgaGFuZGxlck1hdGNoZXI6IFJlY29yZDxzdHJpbmcsIE1lc3NhZ2VFdmVudEhhbmRsZXI+ID0ge1xuICBbRXZlbnRzLkRyYXdUYWJsZV06IGRyYXdUYWJsZUhhbmRsZXIsXG4gIFtFdmVudHMuTG9hZFZhcmlhYmxlc106IGxvYWRWYXJpYWJsZXNIYW5kbGVyLFxufVxuIiwiaW1wb3J0IHsgRXZlbnRzIH0gZnJvbSAnQC9zaGFyZWQvZXZlbnRzJ1xuaW1wb3J0IHsgcG9zdFRvVUkgfSBmcm9tICdAL3NoYXJlZC9ldmVudHMvcG9zdEV2ZW50cydcbmltcG9ydCB0eXBlIHsgVmFyaWFibGVzRGF0YSB9IGZyb20gJ0Avc2hhcmVkL3R5cGVzL2ludGVyZmFjZXMudHlwZXMnXG5cbmV4cG9ydCBjb25zdCBsb2FkVmFyaWFibGVzSGFuZGxlcjogTWVzc2FnZUV2ZW50SGFuZGxlciA9ICgpID0+IHtcbiAgY29uc3QgY29sbGVjdGlvbnMgPSBmaWdtYS52YXJpYWJsZXMuZ2V0TG9jYWxWYXJpYWJsZUNvbGxlY3Rpb25zKClcblxuICBjb25zdCBtb2RlcyA9IGNvbGxlY3Rpb25zLnJlZHVjZShcbiAgICAoYWNjLCBjdXJyKSA9PiB7XG4gICAgICBhY2NbY3Vyci5pZF0gPSBmaWdtYS52YXJpYWJsZXNcbiAgICAgICAgLmdldFZhcmlhYmxlQ29sbGVjdGlvbkJ5SWQoY3Vyci5pZClcbiAgICAgICAgPy5tb2Rlcy5tYXAoKG1vZGUpID0+ICh7IG5hbWU6IG1vZGUubmFtZSwgaWQ6IG1vZGUubW9kZUlkIH0pKVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSxcbiAgICB7fSBhcyBWYXJpYWJsZXNEYXRhWydtb2RlcyddLFxuICApXG5cbiAgY29uc3QgdmFyaWFibGVzID0gY29sbGVjdGlvbnMucmVkdWNlKFxuICAgIChhY2MsIGN1cnIpID0+IHtcbiAgICAgIGFjY1tjdXJyLmlkXSA9IGN1cnIudmFyaWFibGVJZHNcbiAgICAgICAgLm1hcCgodmFyaWFibGUpID0+IHtcbiAgICAgICAgICBjb25zdCB2YXJpYWJsZURhdGEgPSBmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkKHZhcmlhYmxlKVxuXG4gICAgICAgICAgaWYgKHZhcmlhYmxlRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbmFtZTogdmFyaWFibGVEYXRhPy5uYW1lLFxuICAgICAgICAgICAgICBpZDogdmFyaWFibGUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoZWwpID0+IGVsICE9PSBudWxsKSBhcyBWYXJpYWJsZXNEYXRhWyd2YXJpYWJsZXMnXVtzdHJpbmddXG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9LFxuICAgIHt9IGFzIFZhcmlhYmxlc0RhdGFbJ3ZhcmlhYmxlcyddLFxuICApXG5cbiAgY29uc3QgZGF0YTogVmFyaWFibGVzRGF0YSA9IHtcbiAgICBjb2xsZWN0aW9uczogY29sbGVjdGlvbnMubWFwKChjb2xsZWN0aW9uKSA9PiAoe1xuICAgICAgbmFtZTogY29sbGVjdGlvbi5uYW1lLFxuICAgICAgaWQ6IGNvbGxlY3Rpb24uaWQsXG4gICAgfSkpLFxuICAgIG1vZGVzLFxuICAgIHZhcmlhYmxlcyxcbiAgfVxuXG4gIHBvc3RUb1VJKHtcbiAgICBldmVudDogRXZlbnRzLkxvYWRWYXJpYWJsZXNSZXNwb25zZSxcbiAgICBkYXRhLFxuICB9KVxufVxuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZU1hcmtlciA9IGFzeW5jICh0aXRsZTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIHdyYXBwZXIubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICB3cmFwcGVyLmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgd3JhcHBlci5uYW1lID0gJ21hcmtlcidcbiAgd3JhcHBlci5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIHdyYXBwZXIubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG5cbiAgY29uc3QgY2VsbCA9IGZpZ21hLmNyZWF0ZUZyYW1lKClcbiAgY2VsbC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnXG4gIGNlbGwubGF5b3V0V3JhcCA9ICdOT19XUkFQJ1xuICBjZWxsLm5hbWUgPSAnZGVzY3JpcHRpb24nXG4gIGNlbGwubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuICBjZWxsLmxheW91dFNpemluZ0hvcml6b250YWwgPSAnSFVHJ1xuICBjZWxsLnZlcnRpY2FsUGFkZGluZyA9IDBcbiAgY2VsbC5ob3Jpem9udGFsUGFkZGluZyA9IDZcbiAgY2VsbC5jb3JuZXJSYWRpdXMgPSA2XG4gIGNlbGwubWF4V2lkdGggPSAyNTBcblxuICB3cmFwcGVyLmFwcGVuZENoaWxkKGNlbGwpXG5cbiAgY29uc3QgdGV4dCA9IGZpZ21hLmNyZWF0ZVRleHQoKVxuICBhd2FpdCBmaWdtYS5sb2FkRm9udEFzeW5jKHRleHQuZm9udE5hbWUgYXMgRm9udE5hbWUpXG4gIHRleHQuY2hhcmFjdGVycyA9IHRpdGxlXG4gIHRleHQuZm9udFNpemUgPSAxMlxuICB0ZXh0LnRleHRBdXRvUmVzaXplID0gJ1dJRFRIX0FORF9IRUlHSFQnXG4gIHRleHQubmFtZSA9ICd0ZXh0J1xuICBjZWxsLmFwcGVuZENoaWxkKHRleHQpXG5cbiAgdGV4dC5maWxscyA9IFtcbiAgICB7XG4gICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgICAgY29sb3I6IHsgcjogMSwgZzogMSwgYjogMSB9LFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH0sXG4gIF1cblxuICBjb25zdCBsaW5lV3JhcHBlciA9IGZpZ21hLmNyZWF0ZUZyYW1lKClcbiAgbGluZVdyYXBwZXIubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICBsaW5lV3JhcHBlci5sYXlvdXRXcmFwID0gJ05PX1dSQVAnXG4gIGxpbmVXcmFwcGVyLm5hbWUgPSAnbGluZSB3cmFwcGVyJ1xuICBsaW5lV3JhcHBlci5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIGxpbmVXcmFwcGVyLmxheW91dFNpemluZ0hvcml6b250YWwgPSAnSFVHJ1xuXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQobGluZVdyYXBwZXIpXG5cbiAgY29uc3QgbGluZSA9IGZpZ21hLmNyZWF0ZUxpbmUoKVxuICBsaW5lLnN0cm9rZXMgPSBbXG4gICAge1xuICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgIGNvbG9yOiB7IHI6IDAuNTkyMTU2ODg3MDU0NDQzNCwgZzogMC4yNzg0MzEzODU3NTU1Mzg5NCwgYjogMSB9LFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGJsZW5kTW9kZTogJ05PUk1BTCcsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgIH0sXG4gIF1cbiAgbGluZS5zdHJva2VXZWlnaHQgPSAxXG4gIGxpbmUuc3Ryb2tlQ2FwID0gJ1NRVUFSRSdcblxuICByZXR1cm4ge1xuICAgIHRleHQsXG4gICAgY2VsbCxcbiAgICB3cmFwcGVyLFxuICAgIGxpbmUsXG4gICAgbGluZVdyYXBwZXIsXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVEaXZpZGVyID0gKCk6IFtGcmFtZU5vZGUsIExpbmVOb2RlXSA9PiB7XG4gIGNvbnN0IGNlbGwgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIGNlbGwubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICBjZWxsLmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgY2VsbC5uYW1lID0gJ2RpdmlkZXInXG4gIGNlbGwubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuICBjZWxsLnZlcnRpY2FsUGFkZGluZyA9IDEyXG5cbiAgY29uc3QgbGluZSA9IGZpZ21hLmNyZWF0ZUxpbmUoKVxuICBsaW5lLnJvdGF0aW9uID0gLTkwXG4gIGxpbmUuc3Ryb2tlcyA9IFtcbiAgICB7XG4gICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgICAgb3BhY2l0eTogMC4wOCxcbiAgICAgIGJsZW5kTW9kZTogJ05PUk1BTCcsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgIH0sXG4gIF1cbiAgbGluZS5zdHJva2VXZWlnaHQgPSAxXG4gIGxpbmUuc3Ryb2tlQ2FwID0gJ1JPVU5EJ1xuXG4gIGNlbGwuYXBwZW5kQ2hpbGQobGluZSlcblxuICByZXR1cm4gW2NlbGwsIGxpbmVdXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOZXdCYWRnZSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbmV3QmFkZ2UgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIG5ld0JhZGdlLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgbmV3QmFkZ2UubGF5b3V0V3JhcCA9ICdOT19XUkFQJ1xuICBuZXdCYWRnZS5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRydcbiAgbmV3QmFkZ2UubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuICBuZXdCYWRnZS5ob3Jpem9udGFsUGFkZGluZyA9IDZcbiAgbmV3QmFkZ2UuY29ybmVyUmFkaXVzID0gNlxuICBuZXdCYWRnZS52ZXJ0aWNhbFBhZGRpbmcgPSA0XG4gIG5ld0JhZGdlLm5hbWUgPSAnbmV3J1xuXG4gIGNvbnN0IG5ld1RleHQgPSBmaWdtYS5jcmVhdGVUZXh0KClcbiAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyhuZXdUZXh0LmZvbnROYW1lIGFzIEZvbnROYW1lKVxuICBuZXdUZXh0LmNoYXJhY3RlcnMgPSAnTkVXJ1xuICBuZXdUZXh0LmZvbnRTaXplID0gMTJcbiAgbmV3VGV4dC50ZXh0QXV0b1Jlc2l6ZSA9ICdXSURUSF9BTkRfSEVJR0hUJ1xuICBuZXdUZXh0Lm5hbWUgPSAnYmFkZ2UgdGV4dCdcbiAgbmV3VGV4dC5maWxscyA9IFtcbiAgICB7XG4gICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgYm91bmRWYXJpYWJsZXM6IHt9LFxuICAgICAgY29sb3I6IHsgcjogMSwgZzogMSwgYjogMSB9LFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH0sXG4gIF1cblxuICBuZXdCYWRnZS5hcHBlbmRDaGlsZChuZXdUZXh0KVxuXG4gIHJldHVybiB7XG4gICAgbmV3QmFkZ2UsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRhYmxlQ2VsbCA9IGFzeW5jIChjaGFyYWN0ZXJzOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgY2VsbCA9IGZpZ21hLmNyZWF0ZUZyYW1lKClcbiAgY2VsbC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnXG4gIGNlbGwubGF5b3V0V3JhcCA9ICdOT19XUkFQJ1xuICBjZWxsLmxheW91dFNpemluZ0hvcml6b250YWwgPSAnSFVHJ1xuICBjZWxsLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcbiAgY2VsbC5taW5XaWR0aCA9IDI2MFxuICBjZWxsLm5hbWUgPSAnY2VsbCdcbiAgY2VsbC5wYWRkaW5nUmlnaHQgPSA2MFxuXG4gIGNvbnN0IGNvbnRlbnQgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIGNvbnRlbnQubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICBjb250ZW50LmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgY29udGVudC5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRydcbiAgY29udGVudC5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIGNvbnRlbnQuaG9yaXpvbnRhbFBhZGRpbmcgPSAxNlxuICBjb250ZW50LnZlcnRpY2FsUGFkZGluZyA9IDE0XG4gIGNvbnRlbnQubmFtZSA9ICdjb250ZW50J1xuXG4gIGNvbnN0IHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KClcbiAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyh0ZXh0LmZvbnROYW1lIGFzIEZvbnROYW1lKVxuICB0ZXh0LmNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzXG4gIHRleHQuZm9udFNpemUgPSAxNFxuICB0ZXh0LnRleHRBdXRvUmVzaXplID0gJ1dJRFRIX0FORF9IRUlHSFQnXG4gIHRleHQubmFtZSA9ICd0ZXh0J1xuXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQodGV4dClcbiAgY2VsbC5hcHBlbmRDaGlsZChjb250ZW50KVxuXG4gIHJldHVybiB7IGNlbGwsIGNvbnRlbnQgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVGFibGVIZWFkZXIgPSBhc3luYyAoY2hhcmFjdGVyczogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGNlbGwgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIGNlbGwubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJ1xuICBjZWxsLmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgY2VsbC5sYXlvdXRTaXppbmdIb3Jpem9udGFsID0gJ0hVRydcbiAgY2VsbC5sYXlvdXRTaXppbmdWZXJ0aWNhbCA9ICdIVUcnXG4gIGNlbGwubWluV2lkdGggPSAyMDBcbiAgY2VsbC5uYW1lID0gJ2hlYWRlcidcblxuICBjb25zdCBjb250ZW50ID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICBjb250ZW50LmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgY29udGVudC5sYXlvdXRXcmFwID0gJ05PX1dSQVAnXG4gIGNvbnRlbnQubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIGNvbnRlbnQubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuICBjb250ZW50Lmhvcml6b250YWxQYWRkaW5nID0gMTZcbiAgY29udGVudC52ZXJ0aWNhbFBhZGRpbmcgPSAxNlxuICBjb250ZW50Lm5hbWUgPSAnY29udGVudCdcblxuICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpXG4gIGF3YWl0IGZpZ21hLmxvYWRGb250QXN5bmModGV4dC5mb250TmFtZSBhcyBGb250TmFtZSlcbiAgdGV4dC5jaGFyYWN0ZXJzID0gY2hhcmFjdGVyc1xuICB0ZXh0LmZvbnRTaXplID0gMTRcbiAgdGV4dC50ZXh0QXV0b1Jlc2l6ZSA9ICdXSURUSF9BTkRfSEVJR0hUJ1xuICB0ZXh0Lm5hbWUgPSAndGV4dCdcblxuICBjb250ZW50LmFwcGVuZENoaWxkKHRleHQpXG4gIGNlbGwuYXBwZW5kQ2hpbGQoY29udGVudClcblxuICByZXR1cm4gY2VsbFxufVxuXG5leHBvcnQgY29uc3QgYWRkU3Ryb2tlID0gKGNlbGw6IEZyYW1lTm9kZSkgPT4ge1xuICBjZWxsLmxheW91dFNpemluZ0hvcml6b250YWwgPSAnRklMTCdcbiAgY2VsbC5zdHJva2VzID0gW1xuICAgIHtcbiAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgICBvcGFjaXR5OiAwLjA4LFxuICAgICAgYmxlbmRNb2RlOiAnTk9STUFMJyxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBib3VuZFZhcmlhYmxlczoge30sXG4gICAgfSxcbiAgXVxuICBjZWxsLnN0cm9rZUJvdHRvbVdlaWdodCA9IDFcbiAgY2VsbC5zdHJva2VMZWZ0V2VpZ2h0ID0gMFxuICBjZWxsLnN0cm9rZVJpZ2h0V2VpZ2h0ID0gMFxuICBjZWxsLnN0cm9rZVRvcFdlaWdodCA9IDBcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVUYWJsZUNvbHVtbiA9ICgpID0+IHtcbiAgY29uc3Qgcm93ID0gZmlnbWEuY3JlYXRlRnJhbWUoKVxuICByb3cubGF5b3V0TW9kZSA9ICdWRVJUSUNBTCdcbiAgcm93LmxheW91dFdyYXAgPSAnTk9fV1JBUCdcbiAgcm93LmxheW91dFNpemluZ0hvcml6b250YWwgPSAnSFVHJ1xuICByb3cubGF5b3V0U2l6aW5nVmVydGljYWwgPSAnSFVHJ1xuXG4gIHJldHVybiByb3dcbn1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVUYWJsZSA9ICgpID0+IHtcbiAgY29uc3QgdGFibGUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpXG4gIHRhYmxlLmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCdcbiAgdGFibGUubGF5b3V0V3JhcCA9ICdOT19XUkFQJ1xuICB0YWJsZS5uYW1lID0gJ3Rva2VucyB0YWJsZSdcbiAgdGFibGUubGF5b3V0U2l6aW5nSG9yaXpvbnRhbCA9ICdIVUcnXG4gIHRhYmxlLmxheW91dFNpemluZ1ZlcnRpY2FsID0gJ0hVRydcblxuICByZXR1cm4gdGFibGVcbn1cbiIsImV4cG9ydCBlbnVtIEV2ZW50cyB7XG4gIERyYXdUYWJsZSA9ICdkcmF3LXRhYmxlJyxcbiAgTG9hZFZhcmlhYmxlcyA9ICdsb2FkLXZhcmlhYmxlcycsXG4gIExvYWRWYXJpYWJsZXNSZXNwb25zZSA9ICdsb2FkLXZhcmlhYmxlcy1yZXNwb25zZScsXG59XG4iLCJleHBvcnQgY29uc3QgcG9zdFRvUGx1Z2luID0gKGRhdGE6IFBsdWdpbk1lc3NhZ2UpID0+IHtcbiAgcGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogZGF0YSB9LCAnKicpXG59XG5cbmV4cG9ydCBjb25zdCBwb3N0VG9VSSA9IChkYXRhOiBQbHVnaW5NZXNzYWdlKSA9PiB7XG4gIGZpZ21hLnVpLnBvc3RNZXNzYWdlKGRhdGEpXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGhhbmRsZXJNYXRjaGVyIH0gZnJvbSAnQC9mZWF0dXJlcy9oYW5kbGVycy9oYW5kbGVyLW1hdGNoZXInXG5cbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB0aGVtZUNvbG9yczogdHJ1ZSwgd2lkdGg6IDUwMCwgaGVpZ2h0OiA3MDAgfSlcblxuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICBpZiAoaGFuZGxlck1hdGNoZXJbbXNnLmV2ZW50XSkge1xuICAgIGhhbmRsZXJNYXRjaGVyW21zZy5ldmVudF0obXNnKVxuICB9XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlTWFya2VyIiwiY3JlYXRlVGFibGUiLCJhZGRTdHJva2UiLCJjcmVhdGVEaXZpZGVyIiwiY3JlYXRlTmV3QmFkZ2UiLCJjcmVhdGVUYWJsZUNlbGwiLCJjcmVhdGVUYWJsZUhlYWRlciIsImNyZWF0ZVRhYmxlQ29sdW1uIiwiZHJhd1RhYmxlSGFuZGxlciIsIl9yZWYiLCJfZmlnbWEkdmFyaWFibGVzJGdldFYiLCJkYXRhIiwiY29sbGVjdGlvbnMiLCJmaWdtYSIsInZhcmlhYmxlcyIsImdldExvY2FsVmFyaWFibGVDb2xsZWN0aW9ucyIsIm1hcCIsImVsIiwiaWQiLCJpbmNsdWRlcyIsInNlbGVjdGVkQ29sbGVjdGlvbiIsIm5vdGlmeSIsImNvbGxlY3Rpb24iLCJmaW5kIiwibW9kZXMiLCJnZXRWYXJpYWJsZUNvbGxlY3Rpb25CeUlkIiwiZmlsdGVyIiwic2VsZWN0ZWRNb2RlcyIsIm1vZGVJZCIsInRhYmxlRGF0YSIsInZhcmlhYmxlSWRzIiwiZm9yRWFjaCIsInZhcmlhYmxlSWQiLCJ2YXJpYWJsZSIsImdldFZhcmlhYmxlQnlJZCIsImhpZGRlblZhcmlhYmxlcyIsInZhbHVlcyIsInZhbHVlc0J5TW9kZSIsIm1vZGUiLCJfdmFyaWFibGUkdmFsdWVzQnlNb2QiLCJuYW1lIiwidG9TdHJpbmciLCJwdXNoIiwiZGVzY3JpcHRpb24iLCJpc05ldyIsIm1hc2tBc05ld1ZhcmlhYmxlcyIsInNlY3Rpb24iLCJjcmVhdGVTZWN0aW9uIiwidGFibGUiLCJhcHBlbmRDaGlsZCIsImN1cnJlbnRQYWdlIiwidGFibGVEYXRhQXJyYXkiLCJjb2x1bW5zIiwidGl0bGUiLCJjb2x1bW4iLCJoZWFkZXIiLCJyb3ciLCJsZW5ndGgiLCJjb2wiLCJjZWxsIiwiY29sSWR4IiwiY2hpbGRyZW4iLCJyb3dJZHgiLCJkaXZpZGVyIiwibGluZSIsInJlc2l6ZSIsImhlaWdodCIsImxheW91dFNpemluZ0hvcml6b250YWwiLCJsYXlvdXRTaXppbmdWZXJ0aWNhbCIsImxheW91dFBvc2l0aW9uaW5nIiwieCIsIm5ld0JhZGdlIiwiZmlsbHMiLCJibGVuZE1vZGUiLCJib3VuZFZhcmlhYmxlcyIsImNvbG9yIiwiciIsImciLCJiIiwib3BhY2l0eSIsInR5cGUiLCJ2aXNpYmxlIiwid2lkdGgiLCJ5IiwicmVzaXplV2l0aG91dENvbnN0cmFpbnRzIiwiX2NvbHVtbnMkMCRjaGlsZHJlbiQiLCJfY29sdW1ucyQwJGNoaWxkcmVuJDIiLCJfY29sdW1ucyQwJGNoaWxkcmVuJDMiLCJ0ZXh0Iiwid3JhcHBlciIsImxpbmVXcmFwcGVyIiwic2VsZWN0aW9uIiwiRXZlbnRzIiwibG9hZFZhcmlhYmxlc0hhbmRsZXIiLCJoYW5kbGVyTWF0Y2hlciIsIkRyYXdUYWJsZSIsIkxvYWRWYXJpYWJsZXMiLCJwb3N0VG9VSSIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJ2YXJpYWJsZURhdGEiLCJldmVudCIsIkxvYWRWYXJpYWJsZXNSZXNwb25zZSIsImNyZWF0ZUZyYW1lIiwibGF5b3V0TW9kZSIsImxheW91dFdyYXAiLCJ2ZXJ0aWNhbFBhZGRpbmciLCJob3Jpem9udGFsUGFkZGluZyIsImNvcm5lclJhZGl1cyIsIm1heFdpZHRoIiwiY3JlYXRlVGV4dCIsImxvYWRGb250QXN5bmMiLCJmb250TmFtZSIsImNoYXJhY3RlcnMiLCJmb250U2l6ZSIsInRleHRBdXRvUmVzaXplIiwiY3JlYXRlTGluZSIsInN0cm9rZXMiLCJzdHJva2VXZWlnaHQiLCJzdHJva2VDYXAiLCJyb3RhdGlvbiIsIm5ld1RleHQiLCJtaW5XaWR0aCIsInBhZGRpbmdSaWdodCIsImNvbnRlbnQiLCJzdHJva2VCb3R0b21XZWlnaHQiLCJzdHJva2VMZWZ0V2VpZ2h0Iiwic3Ryb2tlUmlnaHRXZWlnaHQiLCJzdHJva2VUb3BXZWlnaHQiLCJwb3N0VG9QbHVnaW4iLCJwYXJlbnQiLCJwb3N0TWVzc2FnZSIsInBsdWdpbk1lc3NhZ2UiLCJ1aSIsInNob3dVSSIsIl9faHRtbF9fIiwidGhlbWVDb2xvcnMiLCJvbm1lc3NhZ2UiLCJtc2ciXSwic291cmNlUm9vdCI6IiJ9