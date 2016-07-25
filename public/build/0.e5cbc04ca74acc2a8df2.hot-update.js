webpackHotUpdate(0,{

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _redux = __webpack_require__(247);\n\nvar _reducerProfile = __webpack_require__(347);\n\nexports.default = (0, _redux.combineReducers)({\n  profile: _reducerProfile.profile\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./reducers/reducers.js\n ** module id = 345\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./reducers/reducers.js?");

/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.greeting = greeting;\n\nvar _actions = __webpack_require__(344);\n\nfunction greeting() {\n  var state = arguments.length <= 0 || arguments[0] === undefined ? {\n    hello: '',\n    goodbye: ''\n  } : arguments[0];\n  var action = arguments[1];\n\n  switch (action.type) {\n    case _actions.GET_HELLO_WORLD:\n      return Object.assign({}, state, {\n        hello: 'Hello World'\n      });\n    case _actions.GET_GOODBYE_WORLD:\n      return Object.assign({}, state, {\n        goodbye: 'Goodbye World'\n      });\n    default:\n      return state;\n  }\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./reducers/reducerProfile.js\n ** module id = 347\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./reducers/reducerProfile.js?");

/***/ }

})