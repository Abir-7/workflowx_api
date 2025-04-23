"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const http_1 = __importDefault(require("http"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const noRouteFound_1 = require("./app/utils/noRouteFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const corsOption = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOption));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    const serverTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        timeZoneName: "short",
    });
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WorkFlow-X Server</title>
      <style>
        body {
          font-family: 'Courier New', Courier, monospace;
          background-color: #1e1e2f;
          color: #ffffff;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        h1 {
          color: #4caf50;
        }
        p {
          margin: 5px 0;
        }
        a {
          color: #61dafb;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .credits {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #aaaaaa;
        }
      </style>
    </head>
    <body>
      <h1>🚀 WorkFlow-X Server is Online!</h1>
      <p>Welcome to the backend server of WorkFlow-X.</p>
      <p>Everything is running smoothly! ✅</p>
      <div class="credits">
        <p>👨‍💻 <strong>Backend Developer:</strong> Tazwarul Islam Abir</p>
        <p>🔗 <a href="https://github.com/Abir-7" target="_blank">github.com/Abir-7</a></p>
        <p>🤝 <strong>Contributor:</strong> Zaman Sheikh</p>
        <p>🔗 <a href="https://github.com/zamansheikh" target="_blank">github.com/zamansheikh</a></p>
        <p>🕒 <strong>Server Time (UTC):</strong> ${serverTime}</p>
        <p>📡 <strong>API Base URL:</strong> <code>/api</code></p>
        <p>📂 <strong>Static Files:</strong> <code>/uploads</code></p>
      </div>
    </body>
    </html>
  `);
});
app.use(express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(noRouteFound_1.noRouteFound);
const server = http_1.default.createServer(app);
exports.default = server;
