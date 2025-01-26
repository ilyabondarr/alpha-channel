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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ \"./css/style.scss\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const input = document.querySelector('.change-data__form-povesi');\n\n  // Обработчик события keydown для предотвращения ввода неподходящих символов\n  input.addEventListener('keydown', function (event) {\n    // Позволяем только цифры, клавиши Backspace, Delete и Enter\n    if ((event.key < '0' || event.key > '5') && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Enter') {\n      event.preventDefault(); // Запрещаем ввод, если это не число\n    }\n  });\n\n  // Обработчик события input для ограничения длины ввода\n  input.addEventListener('input', function () {\n    // Получаем текущее значение\n    const value = input.value;\n\n    // Если значение больше 5, устанавливаем его на 5\n    if (value > 5) {\n      input.value = 5;\n    }\n    // Если длина значения больше 1 и оно не пустое, устанавливаем его на максимально допустимое значение 5\n    else if (value.length > 1) {\n      input.value = value.charAt(0); // Оставляем только первое введенное число\n    }\n  });\n\n  //карта яндекс\n  ymaps.ready(init);\n  var myMap;\n  var placemarks = []; // Массив для хранения меток\n\n  function init() {\n    // Создаем карту\n    myMap = new ymaps.Map(\"map\", {\n      center: [56.3287, 44.0020],\n      // Координаты центра карты (Нижний Новгород)\n      zoom: 12,\n      controls: [] // Убираем стандартные элементы управления (опционально)\n    });\n\n    // Предопределенные метки\n    var marks = [{\n      coordinates: [56.3287, 44.0020],\n      hint: \"Центральная площадь\"\n    }, {\n      coordinates: [56.3284, 44.0004],\n      hint: \"Нижегородский кремль\"\n    }, {\n      coordinates: [56.3270, 44.0027],\n      hint: \"Набережная Волги\"\n    }];\n\n    // Создаем и добавляем предопределенные метки на карту\n    marks.forEach(function (mark) {\n      addPlacemark(mark.coordinates, mark.hint);\n    });\n\n    // Загружаем метки из localStorage\n    loadPlacemarks();\n\n    // Обработчик клика по кнопке добавления метки\n    document.querySelector('.marker-form__button').addEventListener('click', function () {\n      var name = document.getElementById('mark-name').value;\n      var coordinatesInput = document.getElementById('mark-coordinates').value.split(',').map(Number);\n\n      // Проверка ввода\n      if (name && coordinatesInput.length === 2) {\n        addPlacemark(coordinatesInput, name); // Добавляем метку на карту\n        savePlacemarks(); // Сохраняем метки в localStorage\n        // Очищаем поля ввода\n        document.getElementById('mark-name').value = '';\n        document.getElementById('mark-coordinates').value = '';\n      } else {\n        alert(\"Пожалуйста, введите корректные данные для метки.\");\n      }\n    });\n  }\n  // Функция для добавления метки на карту\n  function addPlacemark(coordinates, hint) {\n    var placemark = new ymaps.Placemark(coordinates, {\n      hintContent: hint\n    });\n\n    // Добавляем обработчик клика на метке\n    placemark.events.add('click', function () {\n      // Получаем координаты метки\n      var coords = placemark.geometry.getCoordinates();\n\n      // Записываем координаты в input\n      document.querySelector('.change-data__input-coordinates').value = coords.join(', ');\n\n      // Используем геокодер для получения адреса\n      ymaps.geocode(coords).then(function (res) {\n        var firstGeoObject = res.geoObjects.get(0);\n        if (firstGeoObject) {\n          var address = firstGeoObject.getAddressLine();\n          document.querySelector('.change-data__input-adress').value = address; // Записываем адрес в input\n        } else {\n          document.querySelector('.change-data__input-adress').value = 'Адрес не найден';\n        }\n      }).catch(function (error) {\n        console.log(\"Ошибка геокодирования: \", error);\n      });\n    });\n\n    // Добавляем метку на карту и в массив меток\n    myMap.geoObjects.add(placemark);\n    placemarks.push(placemark); // Сохраняем метку в массиве для дальнейшей работы\n  }\n\n  // Функция для сохранения меток в localStorage\n  function savePlacemarks() {\n    const savedPlacemarks = placemarks.map(placemark => {\n      return {\n        coordinates: placemark.geometry.coordinates,\n        hint: placemark.properties.hintContent\n      };\n    });\n    localStorage.setItem('placemarks', JSON.stringify(savedPlacemarks));\n  }\n\n  // Функция для загрузки меток из localStorage\n  function loadPlacemarks() {\n    const savedPlacemarks = JSON.parse(localStorage.getItem('placemarks'));\n    if (savedPlacemarks) {\n      savedPlacemarks.forEach(mark => {\n        addPlacemark(mark.coordinates, mark.hint);\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./css/style.scss?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;