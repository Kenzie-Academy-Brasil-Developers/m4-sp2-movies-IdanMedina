import { QueryResult } from "pg";

interface iMovie {
  id?: number;
  name: string;
  description?: string;
  duration: number;
  price: number;
}

interface Pagination {
  prevPage: string | null,
  nextPage: string | null,
  count: number,
  data: iMovie[];
}

type MovieResult = QueryResult<iMovie>;
type MovieCreate = Omit<iMovie, "id">;

export { iMovie, MovieResult, MovieCreate, Pagination };
