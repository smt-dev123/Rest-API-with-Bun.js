import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

export const model = () => {
  db.query(
    `
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      sex TEXT 
    )
  `
  ).run();
  db.close();
};
