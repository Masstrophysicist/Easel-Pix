import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import client from "./db/client.js";
import seed from "./db/seed.js";
import apiRouter from "./api/index.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();

//Middleware//
app.use(express.json());

//API routes//
app.use("/api", apiRouter);

//Frontend//
app.get("/", (req, res) =>
  res.sendFile(path.join(dirname, "../easel-pix/dist/index.html"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../easel-pix/dist/assets"))
);

//error handling//
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: err.message || err,
  });
});

const init = async () => {
  const PORT = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  await seed();

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

init();
