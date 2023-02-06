import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { MovieResult } from "./interfaces";

const checkIfMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const query: string = `
        SELECT
            *
        FROM
            table_movies
        WHERE
            id= $1;
    `;

  const queryConfig: QueryConfig = {
    text: query,
    values: [id],
  };

  const queryResult: MovieResult = await client.query(queryConfig);

  if (queryResult.rows.length === 0) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }
  return next();
};
export { checkIfMovieExists };
