webpackHotUpdate(0,{

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.profile = profile;\n\nvar _index = __webpack_require__(348);\n\nvar constants = _interopRequireWildcard(_index);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction profile() {\n  var state = arguments.length <= 0 || arguments[0] === undefined ? {\n    name: '',\n    image: '',\n    id: '',\n    birthday: ''\n  } : arguments[0];\n  var action = arguments[1];\n\n  switch (action.type) {\n    case constants.SPOTIFY_LOGIN:\n      return Object.assign({}, state, {\n        name: action.payload.display_name,\n        image: action.payload.images[0].url,\n        id: action.payload.id\n      });\n    case constants.PROCESS_BIRTHDAY:\n      return Object.assign({}, state, {\n        birthday: action.payload\n      });\n    default:\n      return state;\n  }\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./reducers/reducerProfile.js\n ** module id = 347\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./reducers/reducerProfile.js?");

/***/ }

})