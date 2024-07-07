import express from "express";
import { db_connect } from "./DB/modules/connections.js";
import authorRouter from "./src/modules/author/author.routes.js";
import bookRouter from "./src/modules/book/book.routes.js";

const app = express();
app.use(express.json());

app.use("/book", bookRouter);
app.use("/author", authorRouter);

db_connect();

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("*", (req, res) => {
  res.status(404).json("error");
});

app.listen(3000, () => {
  console.log("server is working on 3000");
});
