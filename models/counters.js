const { query } = require("../db/index.js");
var CryptoJS = require("crypto-js");

/*------------Counters------------*/
//Post counter value to DB
async function createCounter(value) {
  if (value.email === undefined) {
    value.email = "loggedOut";
  }

  // Encrypt
  var cipherCounter = CryptoJS.AES.encrypt(
    `${value.counter}`,
    `${process.env.ENCRYPTION_HASH}`
  ).toString();

  var cipherColour = CryptoJS.AES.encrypt(
    `${value.colour}`,
    `${process.env.ENCRYPTION_HASH}`
  ).toString();

  const res = await query(
    `INSERT INTO counters_react (counter, count, color, email)
    VALUES 
        ($1, $2, $3, $4) 
    RETURNING *
    `,
    [cipherCounter, value.zero, cipherColour, value.email]
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

  return res;
}

//Patch: Decrement counter by id
async function decrementCounter(id) {
  const res = await query(`
  UPDATE counters_react
  SET count = count - 1
  WHERE id = ${id}`);
  return res;
}

//Patch: Strike through id
async function strikeCounter(value) {
  const res = await query(
    `
    UPDATE counters_react
    SET status = $1
    WHERE id = $2`,
    [value.status, value.id]
  );
  console.log("models - strike counter", value);
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
  const res = await query(`DELETE FROM counters_react WHERE id=${id};`);

  return res;
}

//Get all Counters
async function getAllCounters(email) {
  if (email === undefined) {
    email = "loggedOut";
  }

  const res = await query(
    `SELECT * FROM counters_react WHERE email = $1 ORDER BY id ASC`,
    [email]
  );

  const counter = res.rows.map((item) => {
    // Decrypt
    var decryptingCounter = CryptoJS.AES.decrypt(
      `${item.counter}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedCounter = decryptingCounter.toString(CryptoJS.enc.Utf8);

    // Decrypt
    var decryptingColour = CryptoJS.AES.decrypt(
      `${item.color}`,
      `${process.env.ENCRYPTION_HASH}`
    );
    var decryptedColour = decryptingColour.toString(CryptoJS.enc.Utf8);

    return {
      id: item.id,
      counter: decryptedCounter,
      count: item.count,
      color: decryptedColour,
      status: item.status,
      email: item.email,
    };
  });

  return counter;
}

module.exports = {
  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxidCounters,
  deleteCounter,
  getAllCounters,
  strikeCounter,
};
