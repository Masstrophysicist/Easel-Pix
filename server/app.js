import express from "express";
import client from "./db/client.js";
import apiRouter from "./api/index.js";
import { seed } from "./db/seed.js";
import getUserFromToken from "./middleware/getUserFromToken.js";
import usersRouter from "./api/users.js";

const app = express();

app.use(express.json());
app.use(getUserFromToken);

//API//
app.use("/api", apiRouter);
app.use("/users", usersRouter);
//Serve local images folder if you have one//
app.use("/images", express.static("server/images"));

//Error handling//
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message || err });
});

const init = async () => {
  const PORT = process.env.PORT || 3000;

  await client.connect();
  console.log("connected to database");

  //Run this part only after schema.sql has been run successfully//
  await seed();

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

init();
