import express from "express";
import { addMovie, deleteMovie, getAllMovies, getMovieById } from "../Controllers/movie-controller";

const movieRouter = express.Router();

movieRouter.post("/",addMovie);

movieRouter.get("/",getAllMovies);

movieRouter.get("/:id",getMovieById);

movieRouter.delete("/:id",deleteMovie);

export default movieRouter;