var express = require("express");
var router = express.Router();

const {
  createTodo,
  getAllData,
  deleteTodo,
  strikeTodo,
  //   getMaxTodoId,
} = require("../models/todos");

/*------------Todos------------*/
//POST create todo
router.post("/", async function (req, res) {
  console.log("this is the post: ", req.body);
  let body = req.body;
  // if (!body.todo) {
  //   return res.send("404 Error");
  // }
  console.log("this is post todo body: ", body);
  const items = await createTodo(body);
  res.json(items);
});

/* GET all todos */
router.get("/", async function (req, res) {
  let email = req.query.email;
  const items = await getAllData(email);
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

// //GET todo max id
// router.get("/maxId", async function (req, res) {
//   const id = await getMaxTodoId();
//   res.json({ success: true, payload: id });
// });

module.exports = router;
