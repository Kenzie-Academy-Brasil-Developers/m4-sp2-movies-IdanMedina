CREATE TABLE table_movies(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	description TEXT,
	duration INTEGER NOT NULL,
	price INTEGER NOT NULL
);

SELECT
        *
    FROM
        table_movies
    OFFSET $1 LIMIT $2;

INSERT INTO
        table_movies(%I)
    VALUES
        (%L)
    RETURNING *;

DELETE FROM
      table_movies
    WHERE
      id = $1;

SELECT
            *
    FROM
            table_movies
    WHERE
            id= $1;

UPDATE
      table_movies
    SET(%I) = ROW(%L)
    WHERE
      id = $1
    RETURNING *;