import express from "express";
import cors from "cors";
import router from "./app/routes";
import http from "http";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { noRouteFound } from "./app/utils/noRouteFound";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

const corsOption = {
  origin: ["*"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  const serverTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka", timeZoneName: "short" });
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
app.use(express.static(path.join(process.cwd(), "uploads")));
app.use(globalErrorHandler);
app.use(noRouteFound);

const server = http.createServer(app);

export default server;
