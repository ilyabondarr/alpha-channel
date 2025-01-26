import "../css/style.scss";

document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector('.change-data__form-povesi');

        // Обработчик события keydown для предотвращения ввода неподходящих символов
        input.addEventListener('keydown', function (event) {
            // Позволяем только цифры, клавиши Backspace, Delete и Enter
            if ((event.key < '0' || event.key > '5') && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Enter') {
                event.preventDefault(); // Запрещаем ввод, если это не число
            }
        });

        // Обработчик события input для ограничения длины ввода
        input.addEventListener('input', function () {
            // Получаем текущее значение
            const value = input.value;

            // Если значение больше 5, устанавливаем его на 5
            if (value > 5) {
                input.value = 5;
            } 
            // Если длина значения больше 1 и оно не пустое, устанавливаем его на максимально допустимое значение 5
            else if (value.length > 1) {
                input.value = value.charAt(0); // Оставляем только первое введенное число
            }
        });


        //карта яндекс
        ymaps.ready(init);
        var myMap;
        var placemarks = []; // Массив для хранения меток

        function init() {
            // Создаем карту
            myMap = new ymaps.Map("map", {
                center: [56.3287, 44.0020], // Координаты центра карты (Нижний Новгород)
                zoom: 12,
                controls: [] // Убираем стандартные элементы управления (опционально)
            });

            // Предопределенные метки
            var marks = [
                { coordinates: [56.3287, 44.0020], hint: "Центральная площадь" },
                { coordinates: [56.3284, 44.0004], hint: "Нижегородский кремль" },
                { coordinates: [56.3270, 44.0027], hint: "Набережная Волги" }
            ];

            // Создаем и добавляем предопределенные метки на карту
            marks.forEach(function(mark) {
                addPlacemark(mark.coordinates, mark.hint);
            });

            // Загружаем метки из localStorage
            loadPlacemarks();

            // Обработчик клика по кнопке добавления метки
            document.querySelector('.marker-form__button').addEventListener('click', function () {
                var name = document.getElementById('mark-name').value;
                var coordinatesInput = document.getElementById('mark-coordinates').value.split(',').map(Number);

                // Проверка ввода
                if (name && coordinatesInput.length === 2) {
                    addPlacemark(coordinatesInput, name); // Добавляем метку на карту
                    savePlacemarks(); // Сохраняем метки в localStorage
                    // Очищаем поля ввода
                    document.getElementById('mark-name').value = '';
                    document.getElementById('mark-coordinates').value = '';
                } else {
                    alert("Пожалуйста, введите корректные данные для метки.");
                }
            });
        }
        // Функция для добавления метки на карту
        function addPlacemark(coordinates, hint) {
            var placemark = new ymaps.Placemark(coordinates, {
                hintContent: hint
            });

            // Добавляем обработчик клика на метке
            placemark.events.add('click', function () {
                // Получаем координаты метки
                var coords = placemark.geometry.getCoordinates();

                // Записываем координаты в input
                document.querySelector('.change-data__input-coordinates').value = coords.join(', ');

                // Используем геокодер для получения адреса
                ymaps.geocode(coords).then(function (res) {
                    var firstGeoObject = res.geoObjects.get(0);
                    if (firstGeoObject) {
                        var address = firstGeoObject.getAddressLine();
                        document.querySelector('.change-data__input-adress').value = address; // Записываем адрес в input
                    } else {
                        document.querySelector('.change-data__input-adress').value = 'Адрес не найден';
                    }
                }).catch(function (error) {
                    console.log("Ошибка геокодирования: ", error);
                });
            });

            // Добавляем метку на карту и в массив меток
            myMap.geoObjects.add(placemark);
            placemarks.push(placemark); // Сохраняем метку в массиве для дальнейшей работы
        }

        // Функция для сохранения меток в localStorage
        function savePlacemarks() {
            const savedPlacemarks = placemarks.map(placemark => {
                return {
                    coordinates: placemark.geometry.coordinates,
                    hint: placemark.properties.hintContent
                };
            });
            localStorage.setItem('placemarks', JSON.stringify(savedPlacemarks));
        }

        // Функция для загрузки меток из localStorage
        function loadPlacemarks() {
            const savedPlacemarks = JSON.parse(localStorage.getItem('placemarks'));
            if (savedPlacemarks) {
                savedPlacemarks.forEach(mark => {
                    addPlacemark(mark.coordinates, mark.hint);
                });
            }
        }
 

}) 