(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("markdownItPlusImage", [], factory);
	else if(typeof exports === 'object')
		exports["markdownItPlusImage"] = factory();
	else
		root["markdownItPlusImage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = __webpack_require__(1);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (md, url) {
  md.inline.ruler.before('image', 'plus-image', (0, _image2.default)(url));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/*!
 * ----------------------------------------------------
 *  Process @![image](<id> "title")
 * ----------------------------------------------------
 */

exports.default = function (basename) {
  return function (state, silent) {
    var _state$md$utils = state.md.utils,
        isSpace = _state$md$utils.isSpace,
        normalizeReference = _state$md$utils.normalizeReference;


    var attrs = void 0,
        code = void 0,
        content = void 0,
        label = void 0,
        labelEnd = void 0,
        labelStart = void 0,
        pos = void 0,
        ref = void 0,
        res = void 0,
        title = void 0,
        token = void 0,
        tokens = void 0,
        start = void 0,
        href = '',
        oldPos = state.pos,
        max = state.posMax;

    if (state.src.charCodeAt(state.pos + 0) !== 0x40 /* @ */) {
        return false;
      }
    if (state.src.charCodeAt(state.pos + 1) !== 0x21 /* ! */) {
        return false;
      }
    if (state.src.charCodeAt(state.pos + 2) !== 0x5B /* [ */) {
        return false;
      }

    labelStart = state.pos + 3;
    labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 2, false);

    // parser failed to find ']', so it's not a valid link
    if (labelEnd < 0) {
      return false;
    }

    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
        //
        // Inline link
        //

        // [link](  <href>  "title"  )
        //        ^^ skipping these spaces
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }

        // [link](  <href>  "title"  )
        //          ^^^^^^ parsing link destination
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = '';
          }
        }

        // [link](  <href>  "title"  )
        //                ^^ skipping these spaces
        start = pos;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) {
            break;
          }
        }

        // [link](  <href>  "title"  )
        //                  ^^^^^^^ parsing link title
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;

          // [link](  <href>  "title"  )
          //                         ^^ skipping these spaces
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace(code) && code !== 0x0A) {
              break;
            }
          }
        } else {
          title = '';
        }

        if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
            state.pos = oldPos;
            return false;
          }
        pos++;
      } else {
      //
      // Link reference
      //
      if (typeof state.env.references === 'undefined') {
        return false;
      }

      if (pos < max && state.src.charCodeAt(pos) === 0x5B /* [ */) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
        pos = labelEnd + 1;
      }

      // covers label === '' and label === undefined
      // (collapsed reference link and shortcut reference link respectively)
      if (!label) {
        label = state.src.slice(labelStart, labelEnd);
      }

      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }

    //
    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {

      if (!href) {
        state.pos = oldPos;

        return false;
      }

      content = state.src.slice(labelStart, labelEnd);

      state.md.inline.parse(content, state.md, state.env, tokens = []);

      token = state.push('image', 'img', 0);
      token.attrs = attrs = [['src', basename + href], ['alt', '']];
      token.children = tokens;
      token.content = content;

      if (title) {
        attrs.push(['title', title]);
      }
    }

    state.pos = pos;
    state.posMax = max;

    return true;
  };
};

/***/ })
/******/ ]);
});