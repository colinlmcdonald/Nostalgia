webpackHotUpdate(0,{

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.App = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(77);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(108);\n\nvar _reactRouter = __webpack_require__(261);\n\nvar _reactRedux = __webpack_require__(328);\n\nvar _actions = __webpack_require__(344);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = exports.App = function (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      var id = this.props.params.id;\n      this.props.dispatch((0, _actions.getProfileInfo)(id));\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement('div', null);\n    }\n  }]);\n\n  return App;\n}(_react.Component);\n\nfunction mapStateToProps(state) {};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(App);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/components/App.js\n ** module id = 343\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/components/App.js?");

/***/ }

})