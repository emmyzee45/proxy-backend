import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import userRoutes from "./routes/users.js";
// import orderRoutes from "./routes/orders.js";
// import ticketRoutes from "./routes/tickets.js";
// import messageRoutes from "./routes/messages.js";
import authRoutes from "./routes/auth.js";
// import webhookRoutes from "./routes/webhook.js";
import proxyRoutes from "./routes/proxy.js";

dotenv.config();
const app = express();

const connect = () => {
  mongoose.connect(process.env.Mongo)
  .then(()=>{
    console.log("MongoDB connected!")
  })
  .catch((err) => {
    throw err
  })
}

// https://plutuspbl.io/modules/100/1002
// ngrok config add-authtoken 2XHo8HCbuowu0IsSumfWDbKHhp7_61J7fwGfX5VnEMxXQGojD
// ngrok http 5000
// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
    );

app.use(express.json({
  verify: (req,  res, buf) => {
      const url = req.originalUrl;
      if(url.startsWith("/api/webhooks")) {
          req.rawBody = buf.toString();
      }
  }
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/tickets", ticketRoutes);
// app.use("/api/messages", messageRoutes);
app.use("/api/proxies", proxyRoutes);
// app.use("/api/webhooks", webhookRoutes)
// console.log(process.env.NODE_ENV)
// Serve static assets if in production

// if (process.env.NODE_ENV !== "production") {

//    // Set static folder
//   app.use(express.static("../client/build"));

//   const __dirname = dirname(fileURLToPath(import.meta.url));
// // qntvg4x2UCI2viO3JZec7O7mBiKBAxN5khuTcyv7sQq19f
//   app.get("/*", function(req, res) {
//     res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (err) {
//       if(err) {
//         res.status(500).json(err);
//       }
//     }
//     )
//   })
// }

app.listen(process.env.PORT, ()=>{
    console.log(`App has started at ${process.env.PORT}`);
    connect()
})