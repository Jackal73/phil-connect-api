require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://frdm-user.adaptable.app",
    "https://tikkit-admin.adaptable.app",
    "https://phil-connect.adaptable.app", // access-control-allow-origin: http://phil-connect.adaptable.app,
    "https://localhost:3001",
    "https://localhost:3002",
    "https://phil-connect-api.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, // access-control-allow-credentials:true,
  //  access-control-allow-origin: https://phil-connect-api.onrender.com,
  optionSuccessStatus: 200,
};
const helmet = require("helmet");
const morgan = require("morgan");

// -------------- PORT to use ---------------------------
const port = process.env.PORT || 3001;

const app = express();

// -------------- API security --------------------------
// app.use(helmet());

// -------------- Handle CORS error ---------------------
app.use(cors(corsOptions));

// -------------- MongoDB connection setup --------------
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;
  mDb.on("open", () => {
    console.log("MongoDB is connected");
  });

  mDb.on("error", (error) => {
    console.log(error);
  });

  //Logger
  app.use(morgan("tiny"));
}

// -------------- Set bodyParser middleware ------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -------------- Load routers --------------------------
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");
const tokensRouter = require("./src/routers/tokens.router");

// -------------- Use routers ---------------------------
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/ticket/1", ticketRouter);
app.use("/v1/tokens", tokensRouter);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING!");
});

// -------------- Error handler -------------------------
const handleError = require("./src/utils/errorHandler");

app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
