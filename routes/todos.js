var express = require("express");
var router = express.Router();

const {
  createTodo,
  getMaxTodoId,
  getAllData,
  deleteTodo,
  strikeTodo,
} = require("../models/todos");

/*------------Todos------------*/
//POST create todo
router.post("/", async function (req, res) {
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
router.get("/maxId", async function (req, res) {
  const id = await getMaxTodoId();
  res.json({ success: true, payload: id });
});

/* GET all notes */
router.get("/todo", async function (req, res) {
  const items = await getAllData();
  res.json({ success: true, payload: items });
});

//DELTE todo
router.delete("/:id", async function (req, res) {
  let id = req.params.id;
  console.log("delete id, routes", id);
  deleteTodo(id);
  return res.json({ success: true });
});

//PATCH strike through todo
router.patch("/", async function (req, res) {
  let body = req.body;
  strikeTodo(body);
  return res.json({ success: true });
});
