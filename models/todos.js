const { query } = require("../db/index.js");
var CryptoJS = require("crypto-js");

/*------------Todos------------*/

//Post todo value to db
async function createTodo(value) {
  if (value.email === undefined) {
    value.email = "loggedOut";
  }

  // Encrypt
  var cipherTodo = CryptoJS.AES.encrypt(
    `${value.todo}`,
    `${process.env.ENCRYPTION_HASH}`
  ).toString();

  var cipherColour = CryptoJS.AES.encrypt(
    `${value.colour}`,
    `${process.env.ENCRYPTION_HASH}`
  ).toString();

  const res = await query(
    `INSERT INTO todos_react (todo, color, email)
          VALUES ($1, $2, $3)
    RETURNING *
    `,
    [cipherTodo, cipherColour, value.email]
  );
  return res.rows;
}

//Get all todos
async function getAllData(email) {
  if (email === undefined) {
    email = "loggedOut";
  }

  const res = await query(
    `SELECT * FROM todos_react WHERE email = $1 ORDER BY id ASC`,
    [email]
  );
  const todos = res.rows.map((item) => {
    // Decrypt
    var decryptingTodo = CryptoJS.AES.decrypt(
      `${item.todo}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedTodo = decryptingTodo.toString(CryptoJS.enc.Utf8);

    // Decrypt
    var decryptingColour = CryptoJS.AES.decrypt(
      `${item.color}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedColour = decryptingColour.toString(CryptoJS.enc.Utf8);

    return {
      id: item.id,
      todo: decryptedTodo,
      color: decryptedColour,
      status: item.status,
      email: item.email,
    };
  });

  return todos;
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

// //Get newest todo id
// async function getMaxTodoId() {
//   const res = await query(
//     `SELECT id FROM todos_react WHERE id=(SELECT max(id) FROM todos_react)`
//   );
//   return res.rows;
// }

module.exports = {
  createTodo,
  getAllData,
  deleteTodo,
  strikeTodo,
  //   getMaxTodoId,
};

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(
//   "my message",
//   `${process.env.ENCRYPTION_HASH}`
// ).toString();

// console.log(ciphertext);

// // Decrypt
// var bytes = CryptoJS.AES.decrypt(ciphertext, `${process.env.ENCRYPTION_HASH}`);
// var originalText = bytes.toString(CryptoJS.enc.Utf8);
// console.log(originalText); // 'my message'

// // var hashSHA512 = CryptoJS.SHA512("Message", "Secret Passphrase");
// // console.log("hashSHA512", hashSHA512);
// // var hashHmacSHA512 = CryptoJS.HmacSHA512("Message", "Secret Passphrase");
// // console.log("hashHmacSHA512", hashHmacSHA512);

var hash = CryptoJS.SHA1("Message");

var ciphertext = CryptoJS.AES.encrypt(
  "my message",
  `${process.env.ENCRYPTION_HASH}`
).toString();
console.log(ciphertext);
