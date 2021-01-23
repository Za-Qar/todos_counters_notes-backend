const { query } = require("../db/index.js");

/*------------Todos------------*/

//Post todo value to db
async function createTodo(value) {
  const res = await query(
    `INSERT INTO todos_react (todo, color)
          VALUES ($1, $2)
    RETURNING *
    `,
    [value.todo, value.colour]
  );
  console.log("here are the items.js values: ", value.todo, value.colour);
  console.log("this is res: ", res.rows);
  return res.rows;
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
  const res = await query(`SELECT * FROM todos_react ORDER BY id ASC`);
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

module.exports = {
  createTodo,
  getMaxTodoId,
  getAllData,
  deleteTodo,
  strikeTodo,
};
