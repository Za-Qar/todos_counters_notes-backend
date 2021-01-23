const { query } = require("../db/index.js");

/*------------Counters------------*/
//Post counter value to DB
async function createCounter(value) {
  const res = await query(
    `INSERT INTO counters_react (counter, count, color)
    VALUES 
        ($1, $2, $3) 
    RETURNING *
    `,
    [value.counter, value.zero, value.colour]
  );
  return res.rows;
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

module.exports = {
  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxidCounters,
  deleteCounter,
  getAllCounters,
};
