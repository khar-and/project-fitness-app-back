const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const exerciseRouter = require("./routes/api/exercises.js");
const filtersRouter = require("./routes/api/filters.js");
const productsRouter = require("./routes/api/products");
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/filters", filtersRouter);
app.use("/api/products", productsRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
