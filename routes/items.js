var express = require("express");
var router = express.Router();

const {
  getAllData,
  createTodo,
  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxid,
  deleteTodo,
  getMaxTodoId,
} = require("../models/items");

/* GET home page. */
router.get("/", async function (req, res) {
  const items = await getAllData();
  res.json({ success: true, payload: items });
});

router.post("/createTodo", async function (req, res) {
  console.log("this is the post");
  let body = req.body;
  if (!body.todo) {
    return res.send("404 Error");
  }
  const items = await createTodo(body.todo);
  console.log("router", items);
  console.log("router", body);
  res.json(items);
});

router.post("/createCounter", async function (req, res) {
  //Vlaidation
  let body = req.body;
  console.log("post", body);
  // if (!body.counter) {
  //   return res.send("404 Error");
  // }
  const items = await createCounter(body);
  res.json(items);
});

router.patch("/:id", async function (req, res) {
  let id = req.params.id; //what's params
  console.log("id", id);
  incrementCounter(id);
  return res.json({ success: true });
});

router.patch("/decremet/:id", async function (req, res) {
  let id = req.params.id;
  console.log("id", id);
  decrementCounter(id);
  return res.json({ success: true });
});

router.get("/maxId", async function (req, res) {
  const id = await getMaxid();
  res.json({ success: true, payload: id });
});

router.get("/todo/maxId", async function (req, res) {
  const id = await getMaxTodoId();
  res.json({ success: true, payload: id });
});

router.delete("/:id", async function (req, res) {
  let id = req.params.id;
  console.log("delete id, routes", id);
  deleteTodo(id);
  return res.json({ success: true });
});

module.exports = router;
