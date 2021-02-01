const { query } = require("../db/index.js");
var CryptoJS = require("crypto-js");

/*---------------Notes-----------------*/
//POST note
async function createNote(value) {
  if (value.email === undefined) {
    value.email = "loggedOut";
  }

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
    `INSERT INTO notes_react (title, text, color, email)
        VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [cipherTitle, cipherText, cipherColour, value.email]
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
async function getAllNotes(email) {
  if (email === undefined) {
    email = "loggedOut";
  }
  const res = await query(
    `SELECT * FROM notes_react WHERE email = $1 ORDER BY id ASC`,
    [email]
  );

  const notes = res.rows.map((item) => {
    // Decrypt
    var decryptingText = CryptoJS.AES.decrypt(
      `${item.text}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedText = decryptingText.toString(CryptoJS.enc.Utf8);

    // Decrypt
    var decryptingTitle = CryptoJS.AES.decrypt(
      `${item.title}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedTitle = decryptingTitle.toString(CryptoJS.enc.Utf8);

    // Decrypt
    var decryptingColour = CryptoJS.AES.decrypt(
      `${item.color}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedColour = decryptingColour.toString(CryptoJS.enc.Utf8);

    return {
      id: item.id,
      title: decryptedTitle,
      text: decryptedText,
      color: decryptedColour,
      status: item.status,
      email: item.email,
    };
  });

  return notes;
}

//DELETE note from db
async function deleteNote(id) {
  const res = await query(`DELETE FROM notes_react WHERE id=${id};`);
  return res;
}

module.exports = {
  createNote,
  getMaxNoteId,
  getAllNotes,
  deleteNote,
};
