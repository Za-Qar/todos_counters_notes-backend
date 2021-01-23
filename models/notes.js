const { query } = require("../db/index.js");

/*---------------Notes-----------------*/
//POST note
async function createNote(value) {
  console.log("this is the value in models/items.js notes: ", value);
  const res = await query(
    `INSERT INTO notes_react (title, text, color)
        values ($1, $2, $3)`,
    [value.title, value.text, value.colour]
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
  createNote,
  getMaxNoteId,
  getAllNotes,
  deleteNote,
};
