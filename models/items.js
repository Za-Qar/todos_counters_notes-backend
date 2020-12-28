const { query } = require("../db/index.js");

/*------------Todos------------*/

//Post todo value to db
async function createTodo(value) {
  const res = await query(
    `INSERT INTO todos_react (todo, color)
        values ($1, $2)`,
    [value.todo, value.colour]
  );
  console.log("here are the items.js values: ", value.todo, value.colour);
  return res;
}

//Get newest todo id
async function getMaxTodoId() {
  const res = await query(
    `SELECT id FROM todos_react WHERE id=(SELECT max(id) FROM todos_react)`
  );
  return res.rows;
}

//Get all todos
async function getAllData() {
  const res = await query(`SELECT * FROM todos_react`);
  console.log(res.rows);
  return res.rows;
}

//Delete todo from db
async function deleteTodo(id) {
  const res = await query(`DELETE FROM todos_react WHERE id=${id};`);
  console.log("deleted todo id, models/items.js deleteTodo function: ", res);
  return res;
}

//Patch: Strike through id
async function strikeTodo(value) {
  const res = await query(
    `
  UPDATE todos_react
  SET status = $1
  WHERE id = $2`,
    [value.status, value.id]
  );
  console.log("models - strike todo", value);
  return res;
}

/*------------Counters------------*/
//Post counter value to DB
async function createCounter(value) {
  const res = await query(
    `INSERT INTO counters_react (counter, count, color)
        values ($1, $2, $3)`,
    [value.counter, value.zero, value.colour]
  );
  return res;
}

//Patch: Increment counter by id
async function incrementCounter(id) {
  const res = await query(
    `UPDATE counters_react
      SET count = count + 1
      WHERE id = ${id}`
  );
  console.log("models - increment counter", id);
  return res;
}

//Patch: Decrement counter by id
async function decrementCounter(id) {
  const res = await query(`
  UPDATE counters_react
  SET count = count - 1
  WHERE id = ${id}`);
  console.log("models - decrement counter", id);
  return res;
}

//Get newest counter id
async function getMaxidCounters() {
  const res = await query(
    `SELECT id FROM counters_react WHERE id=(SELECT max(id) FROM counters_react)`
  );
  return res.rows;
}

//Delete counter from db
async function deleteCounter(id) {
  console.log("counter id to be deleted", id);
  const res = await query(`DELETE FROM counters_react WHERE id=${id};`);
  console.log("delete id from deleteCounter in models/items.js: ", res);
  return res;
}

//Get all Counters
async function getAllCounters() {
  const res = await query(`SELECT * FROM counters_react`);
  console.log("This is the get all counters id", res.rows);
  return res.rows;
}

/*---------------Notes-----------------*/
//POST note
async function createNote(value) {
  console.log(
    "this is the value and textValue in models/items.js line 98: ",
    value
  );
  const res = await query(
    `INSERT INTO notes_react (title, text)
        values ($1, $2)`,
    [value.title, value.text]
  );
  return res;
}

//GET newest note id
async function getMaxNoteId() {
  const res = await query(
    `SELECT id FROM notes_react WHERE id=(SELECT max(id) FROM notes_react)`
  );
  return res.rows;
}

//GET all notes
async function getAllNotes() {
  const res = await query(`SELECT * FROM notes_react`);
  console.log("This is the get all notes id", res.rows);
  return res.rows;
}

//DELETE note from db
async function deleteNote(id) {
  console.log(
    "------------------------------------note id to be deleted: ",
    id
  );
  const res = await query(`DELETE FROM notes_react WHERE id=${id};`);
  console.log("delete id from deleteNote in models/items.js: ", res);
  return res;
}

module.exports = {
  createTodo,
  getMaxTodoId,
  getAllData,
  deleteTodo,
  strikeTodo,

  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxidCounters,
  deleteCounter,
  getAllCounters,

  createNote,
  getMaxNoteId,
  getAllNotes,
  deleteNote,
};
