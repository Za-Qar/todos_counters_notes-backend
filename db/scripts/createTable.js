const { query } = require("../index");

async function createTableTodo() {
  let res = await query(
    `CREATE TABLE todos_react(
            id SERIAL PRIMARY KEY,
            todo TEXT,
            colour TEXT,
            status TEXT,
            email TEXT
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
      colour TEXT,
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
      colour TEXT,
      status TEXT,
      email TEXT
    )`
  );
  console.log(res);
}

createTableNotes();

// async function dropItems() {
//   let count = await query(`DROP TABLE counters_react`);
//   let note = await query(`DROP TABLE notes_react`);
//   let todo = await query(`DROP TABLE todos_react`);
//   console.log(count, note, todo);
// }
// dropItems();
