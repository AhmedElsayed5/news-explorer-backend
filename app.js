require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
const DATABASE_CONNECTION =
  process.env.DATABASE_CONNECTION || "mongodb://127.0.0.1:27017/news-app";

const connectToMongo = async () => {
  try {
    mongoose.connect(DATABASE_CONNECTION);
  } catch (error) {
    // console.error(error);
  }
};
connectToMongo();
const routes = require("./routes");

app.use(requestLogger);
app.use(express.json());
app.use(helmet());
app.use("/", routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log(`App listening at port ${PORT}`);
  // console.log("This is working");
});
