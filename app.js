const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const categoriesRouter = require("./routes/api/categories.js");
const exerciseRouter = require("./routes/api/exercises.js");
// const filtersRouter = require("./routes/api/filters.js");
const productsRouter = require("./routes/api/products");

const authRouter = require("./routes/api/auth");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/exercises", exerciseRouter);
// app.use("/api/filters", filtersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
