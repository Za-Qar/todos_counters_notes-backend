const { query } = require("../index");

async function createTableTodo() {
  let res = await query(
    `CREATE TABLE todos_react(
            id SERIAL PRIMARY KEY,
            todo TEXT,
            color TEXT,
            status TEXT
        )`
  );
  console.log(res);
}

createTableTodo();

async function createTableCounter() {
  let res = await query(
    `CREATE TABLE counters_react(
      id SERIAL PRIMARY KEY,
      counter TEXT,
      count INTEGER,
      color TEXT,
      status TEXT,
      email TEXT
    )`
  );
  console.log(res);
}

createTableCounter();

async function createTableNotes() {
  let res = await query(
    `CREATE TABLE notes_react(
      id SERIAL PRIMARY KEY,
      title TEXT,
      text TEXT,
      color TEXT,
      status TEXT,
      email TEXT
    )`
  );
  console.log(res);
}

createTableNotes();

// async function dropItems() {
//   let res = await query(`DROP TABLE notes_react `);
//   console.log(res);
// }
// dropItems();
