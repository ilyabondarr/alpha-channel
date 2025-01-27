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

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ \"./css/style.scss\");\n/* harmony import */ var _assets_label_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/label.png */ \"./assets/label.png\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const input = document.querySelector(\".change-data__input-coordinates\");\n\n  // Обработчик события keydown для предотвращения ввода неподходящих символов\n  if (input) {\n    input.addEventListener(\"keydown\", function (event) {\n      // Позволяем только цифры, клавиши Backspace, Delete и Enter\n      if ((event.key < \"0\" || event.key > \"5\") && event.key !== \"Backspace\" && event.key !== \"Delete\" && event.key !== \"Enter\") {\n        event.preventDefault(); // Запрещаем ввод, если это не число\n      }\n    });\n  }\n  if (input) {\n    input.addEventListener(\"input\", function () {\n      // Получаем текущее значение\n      const value = input.value;\n      if (value > 5) {\n        input.value = 5;\n      } else if (value.length > 1) {\n        input.value = value.charAt(0);\n      }\n    });\n  }\n  ymaps.ready(init);\n  var myMap;\n  var placemarks = [];\n  var markerCoords = [];\n  var currentLine;\n  function init() {\n    myMap = new ymaps.Map(\"map\", {\n      center: [56.3287, 44.002],\n      // Координаты центра карты (Нижний Новгород)\n      zoom: 12,\n      controls: [] // Убираем стандартные элементы управления (опционально)\n    });\n    var marks = [{\n      coordinates: [56.3287, 44.002],\n      hint: \"Центральная площадь\"\n    }, {\n      coordinates: [56.3284, 44.0004],\n      hint: \"Нижегородский кремль\"\n    }, {\n      coordinates: [56.327, 44.0027],\n      hint: \"Набережная Волги\"\n    }];\n    marks.forEach(function (mark) {\n      addPlacemark(mark.coordinates, mark.hint);\n    });\n    loadPlacemarks();\n    const markerFormButton = document.querySelector(\".marker-form__button\");\n    if (markerFormButton) {\n      markerFormButton.addEventListener(\"click\", function () {\n        var name = document.getElementById(\"mark-name\").value;\n        var coordinatesInput = document.getElementById(\"mark-coordinates\").value.split(\",\").map(Number);\n\n        // Проверка ввода\n        if (name && coordinatesInput.length === 2) {\n          addPlacemark(coordinatesInput, name); // Добавляем метку на карту\n          savePlacemarks(); // Сохраняем метки в localStorage\n          // Очищаем поля ввода\n          document.getElementById(\"mark-name\").value = \"\";\n          document.getElementById(\"mark-coordinates\").value = \"\";\n        } else {\n          alert(\"Пожалуйста, введите корректные данные для метки.\");\n        }\n      });\n    }\n  }\n  function addPlacemark(coordinates, hint) {\n    var placemark = new ymaps.Placemark(coordinates, {\n      hintContent: hint\n    }, {\n      iconLayout: 'default#image',\n      iconImageHref: _assets_label_png__WEBPACK_IMPORTED_MODULE_1__,\n      // Путь к вашей иконке\n      iconImageSize: [30, 38],\n      // Размер новой иконки\n      iconImageOffset: [-15, -38] // Смещение новой иконки\n    });\n    placemark.events.add('click', function () {\n      var coords = placemark.geometry.getCoordinates();\n      document.querySelector('.change-data__input-coordinates').value = coords.join(', ');\n      ymaps.geocode(coords).then(function (res) {\n        var firstGeoObject = res.geoObjects.get(0);\n        if (firstGeoObject) {\n          var address = firstGeoObject.getAddressLine();\n          document.querySelector('.change-data__input-adress').value = address; // Записываем адрес в input\n\n          // Записываем данные в модальное окно\n          document.getElementById('modal-coordinates').value = coords.join(', ');\n          document.getElementById('modal-address').value = address;\n\n          // Получаем координаты блока карты\n          var mapElement = document.getElementById(\"map\");\n          var mapRect = mapElement.getBoundingClientRect();\n\n          // Устанавливаем позицию модального окна над картой\n          modal.style.display = \"block\";\n          modal.style.top = mapRect.top + window.scrollY + 'px'; // Используем scrollY для учета прокрутки страницы\n          modal.style.left = mapRect.left + window.scrollX + mapRect.width / 2 - modal.offsetWidth / 2 + 'px'; // Центрируем по горизонтали\n        } else {\n          document.querySelector('.change-data__input-adress').value = 'Адрес не найден';\n        }\n      }).catch(function (error) {\n        console.log(\"Ошибка геокодирования: \", error);\n      });\n\n      // Добавляем координаты в массив\n      markerCoords.push(coords);\n      console.log('Координаты метки добавлены в массив:', markerCoords); // Для проверки\n\n      // Если в массиве две координаты, рисуем линию между ними\n      if (markerCoords.length === 2) {\n        drawLine(markerCoords[0], markerCoords[1]);\n        // Очищаем массив координат после добавления линии\n        markerCoords = [];\n      }\n    });\n    myMap.geoObjects.add(placemark);\n    placemarks.push(placemark);\n  }\n\n  // Функция для рисования линии между двумя метками\n  function drawLine(startCoords, endCoords) {\n    if (currentLine) {\n      myMap.geoObjects.remove(currentLine); // Удаляем предыдущую линию, если она есть\n    }\n\n    // Создаем новую линию между двумя метками\n    currentLine = new ymaps.Polyline([startCoords, endCoords], {}, {\n      strokeColor: \"#0000FF\",\n      // Цвет линии\n      strokeWidth: 4 // Толщина линии\n    });\n\n    // Добавляем линию на карту\n    myMap.geoObjects.add(currentLine);\n  }\n\n  // Функция для рисования линии между двумя метками\n  function drawLine(startCoords, endCoords) {\n    if (currentLine) {\n      myMap.geoObjects.remove(currentLine); // Удаляем предыдущую линию, если она есть\n    }\n\n    // Создаем новую линию между двумя метками\n    currentLine = new ymaps.Polyline([startCoords, endCoords], {}, {\n      strokeColor: \"#0000FF\",\n      // Цвет линии\n      strokeWidth: 4 // Толщина линии\n    });\n\n    // Добавляем линию на карту\n    myMap.geoObjects.add(currentLine);\n  }\n  var modal = document.getElementById(\"modal-info\");\n  function savePlacemarks() {\n    const savedPlacemarks = placemarks.map(placemark => {\n      return {\n        coordinates: placemark.geometry.coordinates,\n        hint: placemark.properties.get(\"hintContent\")\n      };\n    });\n    localStorage.setItem(\"placemarks\", JSON.stringify(savedPlacemarks));\n  }\n  function loadPlacemarks() {\n    const savedPlacemarks = JSON.parse(localStorage.getItem(\"placemarks\"));\n    if (savedPlacemarks) {\n      savedPlacemarks.forEach(mark => {\n        addPlacemark(mark.coordinates, mark.hint); // Добавляем загруженные метки на карту\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./css/style.scss?");

/***/ }),

/***/ "./assets/label.png":
/*!**************************!*\
  !*** ./assets/label.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets\\\\656224b9fe0ed3bf76ec.png\";\n\n//# sourceURL=webpack:///./assets/label.png?");

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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "./";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;
