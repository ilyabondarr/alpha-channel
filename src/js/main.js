import "../css/style.scss";
import label from "../assets/label.png";

document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".change-data__input-coordinates");

  // Обработчик события keydown для предотвращения ввода неподходящих символов
  if (input) {
    input.addEventListener("keydown", function (event) {
      // Позволяем только цифры, клавиши Backspace, Delete и Enter
      if ((event.key < "0" || event.key > "5") && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "Enter") {
        event.preventDefault(); // Запрещаем ввод, если это не число
      }
    });
  }

  if (input) {
    input.addEventListener("input", function () {
      // Получаем текущее значение
      const value = input.value;
      if (value > 5) {
        input.value = 5;
      } else if (value.length > 1) {
        input.value = value.charAt(0);
      }
    });
  }
  ymaps.ready(init);
  var myMap;
  var placemarks = [];
  var markerCoords = [];
  var currentLine;
  function init() {
    myMap = new ymaps.Map("map", {
      center: [56.3287, 44.002], // Координаты центра карты (Нижний Новгород)
      zoom: 12,
      controls: [] // Убираем стандартные элементы управления (опционально)
    });
    var marks = [
      { coordinates: [56.3287, 44.002], hint: "Центральная площадь" },
      { coordinates: [56.3284, 44.0004], hint: "Нижегородский кремль" },
      { coordinates: [56.327, 44.0027], hint: "Набережная Волги" }
    ];
    marks.forEach(function (mark) {
      addPlacemark(mark.coordinates, mark.hint);
    });

    loadPlacemarks();
    const markerFormButton = document.querySelector(".marker-form__button");
    if (markerFormButton) {
      markerFormButton.addEventListener("click", function () {
        var name = document.getElementById("mark-name").value;
        var coordinatesInput = document.getElementById("mark-coordinates").value.split(",").map(Number);

        // Проверка ввода
        if (name && coordinatesInput.length === 2) {
          addPlacemark(coordinatesInput, name); // Добавляем метку на карту
          savePlacemarks(); // Сохраняем метки в localStorage
          // Очищаем поля ввода
          document.getElementById("mark-name").value = "";
          document.getElementById("mark-coordinates").value = "";
        } else {
          alert("Пожалуйста, введите корректные данные для метки.");
        }
      });
    }
  }
  function addPlacemark(coordinates, hint) {
    var placemark = new ymaps.Placemark(coordinates, {
        hintContent: hint
    }, {
        iconLayout: 'default#image',
        iconImageHref: label, // Путь к вашей иконке
        iconImageSize: [30, 38], // Размер новой иконки
        iconImageOffset: [-15, -38] // Смещение новой иконки
    });

    placemark.events.add('click', function () {
        var coords = placemark.geometry.getCoordinates();
        document.querySelector('.change-data__input-coordinates').value = coords.join(', ');

        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            if (firstGeoObject) {
                var address = firstGeoObject.getAddressLine();
                document.querySelector('.change-data__input-adress').value = address; // Записываем адрес в input

                // Записываем данные в модальное окно
                document.getElementById('modal-coordinates').value = coords.join(', ');
                document.getElementById('modal-address').value = address;

                // Получаем координаты блока карты
                var mapElement = document.getElementById("map");
                var mapRect = mapElement.getBoundingClientRect();

                // Устанавливаем позицию модального окна над картой
                modal.style.display = "block";
                modal.style.top = (mapRect.top + window.scrollY) + 'px'; // Используем scrollY для учета прокрутки страницы
                modal.style.left = (mapRect.left + window.scrollX + (mapRect.width / 2) - (modal.offsetWidth / 2)) + 'px'; // Центрируем по горизонтали
            } else {
                document.querySelector('.change-data__input-adress').value = 'Адрес не найден';
            }
        }).catch(function (error) {
            console.log("Ошибка геокодирования: ", error);
        });

        // Добавляем координаты в массив
        markerCoords.push(coords);
        console.log('Координаты метки добавлены в массив:', markerCoords); // Для проверки

        // Если в массиве две координаты, рисуем линию между ними
        if (markerCoords.length === 2) {
            drawLine(markerCoords[0], markerCoords[1]);
            // Очищаем массив координат после добавления линии
            markerCoords = [];
        }
    });

    myMap.geoObjects.add(placemark);
    
    placemarks.push(placemark);
}

// Функция для рисования линии между двумя метками
function drawLine(startCoords, endCoords) {
    if (currentLine) {
        myMap.geoObjects.remove(currentLine); // Удаляем предыдущую линию, если она есть
    }
    
    // Создаем новую линию между двумя метками
    currentLine = new ymaps.Polyline([startCoords, endCoords], {}, {
        strokeColor: "#0000FF", // Цвет линии
        strokeWidth: 4 // Толщина линии
    });

    // Добавляем линию на карту
    myMap.geoObjects.add(currentLine);
}


  // Функция для рисования линии между двумя метками
  function drawLine(startCoords, endCoords) {
    if (currentLine) {
      myMap.geoObjects.remove(currentLine); // Удаляем предыдущую линию, если она есть
    }

    // Создаем новую линию между двумя метками
    currentLine = new ymaps.Polyline(
      [startCoords, endCoords],
      {},
      {
        strokeColor: "#0000FF", // Цвет линии
        strokeWidth: 4 // Толщина линии
      }
    );

    // Добавляем линию на карту
    myMap.geoObjects.add(currentLine);
  }
  var modal = document.getElementById("modal-info");
  function savePlacemarks() {
    const savedPlacemarks = placemarks.map((placemark) => {
      return {
        coordinates: placemark.geometry.coordinates,
        hint: placemark.properties.get("hintContent")
      };
    });
    localStorage.setItem("placemarks", JSON.stringify(savedPlacemarks));
  }
  function loadPlacemarks() {
    const savedPlacemarks = JSON.parse(localStorage.getItem("placemarks"));
    if (savedPlacemarks) {
      savedPlacemarks.forEach((mark) => {
        addPlacemark(mark.coordinates, mark.hint); // Добавляем загруженные метки на карту
      });
    }
  }
});
