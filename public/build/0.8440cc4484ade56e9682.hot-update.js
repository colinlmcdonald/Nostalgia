webpackHotUpdate(0,{

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getProfileInfo = getProfileInfo;\nexports.processProfile = processProfile;\n\nvar _index = __webpack_require__(348);\n\nvar constants = _interopRequireWildcard(_index);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction getProfileInfo(id) {\n  return function (dispatch) {\n    return fetch('http://localhost:3000/user/' + id + '/profile').then(function (res) {\n      return res.json();\n    }).then(function (json) {\n      return dispatch(processProfile(json));\n    });\n  };\n};\n\nfunction processProfile(payload) {\n  return {\n    type: constants.SPOTIFY_LOGIN,\n    payload: payload\n  };\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./actions/actions.js\n ** module id = 344\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./actions/actions.js?");

/***/ }

})