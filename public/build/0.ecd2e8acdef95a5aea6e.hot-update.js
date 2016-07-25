webpackHotUpdate(0,{

/***/ 344:
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getProfileInfo = getProfileInfo;\nvar SPOTIFY_LOGIN = exports.SPOTIFY_LOGIN = 'SPOTIFY_LOGIN';\n\nfunction getProfileInfo(id) {\n  return function (dispatch) {\n    return fetch('http://localhost:3000/user/' + id + '/profile').then(function (res) {\n      return res.json();\n    }).then(function (json) {\n      return console.log(json);\n    });\n  };\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./actions/actions.js\n ** module id = 344\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./actions/actions.js?");

/***/ }

})