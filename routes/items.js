var express = require("express");
var router = express.Router();

const {
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
} = require("../models/items");

/*------------Todos------------*/
//POST create todo
router.post("/todo", async function (req, res) {
  console.log("this is the post");
  let body = req.body;
  // if (!body.todo) {
  //   return res.send("404 Error");
  // }
  const items = await createTodo(body);
  console.log("router", items);
  console.log("router", body);
  res.json(items);
});

//GET todo max id
router.get("/todo/maxId", async function (req, res) {
  const id = await getMaxTodoId();
  res.json({ success: true, payload: id });
});

/* GET all notes */
router.get("/todo", async function (req, res) {
  const items = await getAllData();
  res.json({ success: true, payload: items });
});

//DELTE todo
router.delete("/todo/:id", async function (req, res) {
  let id = req.params.id;
  console.log("delete id, routes", id);
  deleteTodo(id);
  return res.json({ success: true });
});

//PATCH strike through todo
router.patch("/todo/strike", async function (req, res) {
  let body = req.body;
  strikeTodo(body);
  return res.json({ success: true });
});

/*------------Counters------------*/
//POST create counter
router.post("/counter", async function (req, res) {
  //Vlaidation
  let body = req.body;
  // if (!body.counter) {
  //   return res.send("404 Error");
  // }
  const items = await createCounter(body);
  res.json(items);
});

//PATCH counter increment
router.patch("/counter/:id", async function (req, res) {
  let id = req.params.id;
  console.log("id", id);
  incrementCounter(id);
  return res.json({ success: true });
});

//PATCH counter decrement
router.patch("/counter/decremet/:id", async function (req, res) {
  let id = req.params.id;
  console.log("id", id);
  decrementCounter(id);
  return res.json({ success: true });
});

//GET counter max id
router.get("/counter/maxIdCounters", async function (req, res) {
  const id = await getMaxidCounters();
  console.log("max id counter: ", id);
  res.json({ success: true, payload: id });
});

//DELETE Counter
router.delete("/counter/:id", async function (req, res) {
  let id = req.params.id;
  console.log("delete counter id, routes", id);
  deleteCounter(id);
  return res.json({ success: true });
});

//GET all Counters. */
router.get("/counter", async function (req, res) {
  const items = await getAllCounters();
  res.json({ success: true, payload: items });
});

/*------------Notes------------*/
//POST note
router.post("/note", async function (req, res) {
  let body = req.body;

  console.log("this is the post value Notes: ", body);

  const items = await createNote(body);
  res.json(items);
});

//GET note max id
router.get("/note/getMaxNoteId", async function (req, res) {
  const id = await getMaxNoteId();
  res.json({ success: true, payload: id });
});

//GET all notes
router.get("/note", async function (req, res) {
  const notes = await getAllNotes();
  res.json({ success: true, payload: notes });
});

//DELETE note
router.delete("/note/:id", async function (req, res) {
  let id = req.params.id;

  console.log("---------------------------delete note id, routes: ", id);

  deleteNote(id);
  return res.json({ success: true });
});

module.exports = router;
