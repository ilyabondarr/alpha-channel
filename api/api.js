// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// let poles = []; // Массив опор для хранения информации
// // Функция для получения данных из запроса
// const getReqData = (request) => {
//     return new Promise((resolve, reject) => {
//         let body = "";
//         request.on("data", (chunk) => {
//             body += chunk.toString();
//         });
//         request.on("end", () => {
//             resolve(JSON.parse(body));
//         });
//         request.on("error", (error) => {
//             reject(error);
//         });
//     });
// };

// // Создание сервера
// const server = http.createServer(async (request, response) => {
//     const reqPath = request.url;

//     // Раздача статических файлов (включая js)
//     if (reqPath.startsWith("/js/")) {
//         const filePath = path.join(__dirname, "js", reqPath.replace("/js/", ""));
        
//         fs.readFile(filePath, (error, data) => {
//             if (error) {
//                 response.writeHead(404, { "Content-Type": "application/json" });
//                 response.end(JSON.stringify({ message: "Файл не найден" }));
//             } else {
//                 response.writeHead(200, { "Content-Type": "application/javascript" });
//                 response.end(data);
//             }
//         });
//         return; // Завершаем обработку, если это статический файл
//     }

//     // Если запрашивается главная страница или index.html
//     if (reqPath === "/" || reqPath === "/index.html") {
//         fs.readFile(path.join(__dirname, "index.html"), (error, data) => {
//             if (error) {
//                 response.writeHead(500, { "Content-Type": "application/json" });
//                 response.end(JSON.stringify({ message: "Ошибка загрузки страницы" }));
//             } else {
//                 response.writeHead(200, { "Content-Type": "text/html" });
//                 response.end(data);
//             }
//         });
//     }
//     // Получение всех опор
//     else if (reqPath === "/api/poles" && request.method === "GET") {
//         response.writeHead(200, { "Content-Type": "application/json" });
//         response.end(JSON.stringify(poles));
//     }
//     // Получение одной опоры по ID
//     else if (reqPath.match(/\/api\/poles\/([0-9]+)/) && request.method === "GET") {
//         const id = reqPath.split("/")[3];
//         const pole = poles.find((p) => p.id === parseInt(id));
//         if (pole) {
//             response.writeHead(200, { "Content-Type": "application/json" });
//             response.end(JSON.stringify(pole));
//         } else {
//             response.writeHead(404, { "Content-Type": "application/json" });
//             response.end(JSON.stringify({ message: "Опора не найдена" }));
//         }
//     }
//     // Запрос статуса оптики на опоре
//     else if (reqPath.match(/\/api\/poles\/([0-9]+)\/optic-status/) && request.method === "GET") {
//         const id = reqPath.split("/")[3];
//         const pole = poles.find((p) => p.id === parseInt(id));
//         if (pole) {
//             const status = pole.opticCount > 5 ? "Аварийная" : "Нормальная";

//             response.writeHead(200, { "Content-Type": "application/json" });
//             response.end(JSON.stringify({ id: pole.id, opticCount: pole.opticCount, status }));
//         } else {
//             response.writeHead(404, { "Content-Type": "application/json" });
//             response.end(JSON.stringify({ message: "Опора не найдена" }));
//         }
//     }
//     // Добавление новой опоры
//     else if (reqPath === "/api/poles" && request.method === "POST") {
//         try {

//             const poleData = await getReqData(request);
//             const pole = {
//                 id: poles.length ? Math.max(...poles.map(p => p.id)) + 1 : 1,
//                 address: poleData.address,
//                 coordinates: poleData.coordinates,
//                 isEmergency: poleData.isEmergency,
//                 employeeId: poleData.employeeId,
//                 photo: poleData.photo,
//                 opticCount: poleData.opticCount
//             };
//             poles.push(pole);
//             response.writeHead(201, { "Content-Type": "application/json" });
//             response.end(JSON.stringify(pole));
//         } catch (error) {
//             response.writeHead(400, { "Content-Type": "application/json" });
//             response.end(JSON.stringify({ message: "Ошибка при добавлении опоры" }));
//         }
//     }
//     // Удаление опоры по ID
//     else if (reqPath.match(/\/api\/poles\/([0-9]+)/) && request.method === "DELETE") {
//         const id = reqPath.split("/")[3];
//         const poleIndex = poles.findIndex((p) => p.id === parseInt(id));
//         if (poleIndex > -1) {
//             const deletedPole = poles.splice(poleIndex, 1)[0];
//             response.writeHead(200, { "Content-Type": "application/json" });
//             response.end(JSON.stringify(deletedPole));
//         } else {
//             response.writeHead(404, { "Content-Type": "application/json" });
//             response.end(JSON.stringify({ message: "Опора не найдена" }));
//         }
//     }
//     // Если запрос не соответствует ни одному из случаев
//     else {
//         response.writeHead(404, { "Content-Type": "application/json" });
//         response.end(JSON.stringify({ message: "Ресурс не найден" }));
//     }
// });

// // Указываем порт для сервера
// const PORT = process.env.PORT || 3000;

// // Запуск сервера
// server.listen(PORT, 'localhost', () => {
//     console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
// });
 