import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./database";
import { iMovie, MovieCreate, MovieResult, Pagination } from "./interfaces";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movieDataRequest: iMovie = req.body;
    const movieData: MovieCreate = {
      ...movieDataRequest,
    };

    const query: string = format(
      `
    INSERT INTO
        table_movies(%I)
    VALUES
        (%L)
    RETURNING *;
    `,
      Object.keys(movieData),
      Object.values(movieData)
    );

    const queryResult: MovieResult = await client.query(query);
    console.log(queryResult);

    const newMovie: iMovie = queryResult.rows[0];

    return res.status(201).json(newMovie);
  } catch (error) {
    console.log(error);
    return res.status(409).json({
      message: "invalid duplicated name"
    });
  }
};

const readMovies = async (req: Request, res: Response): Promise<Response> => {
  let page: number = Number(req.query.page) || 1;
  let perPage: number = Number(req.query.perPage) || 5;

  if (perPage > 5) {
    perPage = 5;
  }

  page = (page - 1) * perPage;

  const query: string = `
    SELECT
        *
    FROM
        table_movies
    OFFSET $1 LIMIT $2;
    `;

  const moduleParam = req.params.module;

  const queryConfig: QueryConfig = {
    text: query,
    values: [page, perPage],
  };

  const baseUrl: string = `http://localhost:3000/movies/${moduleParam}`;
  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;

  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;

  const queryResult: MovieResult = await client.query(queryConfig);
  
  const count: number = queryResult.rowCount;

  if (page < 1) {
    prevPage = null;
  }

  if (count < 5) {
    nextPage = null;
  }

  const pagination: Pagination = {
    prevPage,
    nextPage,
    count,
    data: queryResult.rows,
  };

  return res.status(200).json(pagination);
};

const deleteMovies = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  const query: string =`
    DELETE FROM
      table_movies
    WHERE
      id = $1;
  `
  const queryConfig: QueryConfig= {
    text: query,
    values: [id]
  }

  const queryResult: MovieResult = await client.query(queryConfig)
  return res.status(204).json()}
  ;


export { createMovie, readMovies, deleteMovies };
