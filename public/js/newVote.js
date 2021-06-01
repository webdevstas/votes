/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/newVote.js":
/*!************************!*\
  !*** ./src/newVote.js ***!
  \************************/
/***/ (() => {

eval("\n\nvar tBody = document.getElementById('answers__tbody');\nvar addAnswerBtn = document.getElementById('add-answer');\nvar answerRows;\nvar answerRowEl; // Initialise answerRows and answerRowEl variables\n\ninit(); // Add listener and handler for addAnswerBtn, calls in next eventLoop iteration\n\nsetTimeout(function () {\n  addAnswerBtn.addEventListener('click', function (event) {\n    event.preventDefault(); // Set title for additional inputs\n\n    answerRowEl.firstChild.textContent = 'Additional answer'; // Clear copied input\n\n    var input = findInput(answerRowEl.childNodes);\n    input.value = ''; // Add the new answer row\n\n    tBody.appendChild(answerRowEl); // Add the deleteBtn\n\n    var deleteBtn = document.createElement('button');\n    deleteBtn.innerText = '-';\n    deleteBtn.addEventListener('click', function (event) {\n      event.preventDefault();\n      this.parentNode.parentNode.removeChild(this.parentNode);\n    });\n    answerRowEl.appendChild(deleteBtn); // Reinitialise variables\n\n    init();\n  });\n}, 0);\n\nfunction init() {\n  answerRows = document.getElementsByClassName('answers__trow');\n  answerRowEl = answerRows[0].cloneNode(true);\n}\n\nfunction findInput(nodes) {\n  var input;\n  Array.from(nodes).forEach(function (node) {\n    if (node.nodeName === 'INPUT') {\n      input = node;\n    } else if (node.hasChildNodes()) {\n      input = findInput(node.childNodes);\n    } else input = null;\n  });\n  return input;\n}\n\n//# sourceURL=webpack://votes/./src/newVote.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/newVote.js"]();
/******/ 	
/******/ })()
;