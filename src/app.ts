import express, { Application } from "express";
import { startDatabase } from "./database";
import { createMovie, deleteMovies, readMovies } from "./functions";
import { checkIfMovieExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post('/movies', createMovie);
app.get('/movies', readMovies);
app.delete('/movies/:id', checkIfMovieExists, deleteMovies);

app.listen(3000, async () => {
  await startDatabase();
  console.log("Server is running");
});
