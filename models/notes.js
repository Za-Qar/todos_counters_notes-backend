const { query } = require("../db/index.js");
var CryptoJS = require("crypto-js");

/*---------------Notes-----------------*/
//POST note
async function createNote(value) {
  // Encrypt
  var cipherTitle = CryptoJS.AES.encrypt(
    value.title,
    process.env.ENCRYPTION_HASH
  ).toString();

  var cipherText = CryptoJS.AES.encrypt(
    value.text,
    process.env.ENCRYPTION_HASH
  ).toString();

  var cipherColour = CryptoJS.AES.encrypt(
    value.colour,
    process.env.ENCRYPTION_HASH
  ).toString();

  const res = await query(
    `INSERT INTO notes_react (title, text, color)
        VALUES ($1, $2, $3)
      RETURNING *
    `,
    [value.title, value.text, value.colour]
    // [cipherTitle, cipherText, cipherColour]
  );
  return res.rows;
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
  const res = await query(`SELECT * FROM notes_react ORDER BY id ASC`);
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
