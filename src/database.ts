import { Client } from "pg";

const client: Client = new Client({
  user: "Marcos Rodrigues",
  password: "778899",
  host: "localhost",
  database: "kenzie_movies",
  port: 5432,
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};

export { client, startDatabase };
