var express = require("express");
var router = express.Router();

const {
  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxidCounters,
  deleteCounter,
  getAllCounters,
} = require("../models/counters");

/*------------Counters------------*/
//POST create counter
router.post("/", async function (req, res) {
  //Vlaidation
  let body = req.body;
  // if (!body.counter) {
  //   return res.send("404 Error");
  // }
  const items = await createCounter(body);
  res.json(items);
});

//PATCH counter increment
router.patch("/:id", async function (req, res) {
  let id = req.params.id;
  console.log("id", id);
  incrementCounter(id);
  return res.json({ success: true });
});

//PATCH counter decrement
router.patch("/decremet/:id", async function (req, res) {
  let id = req.params.id;
  console.log("id", id);
  decrementCounter(id);
  return res.json({ success: true });
});

//GET counter max id
router.get("/maxIdCounters", async function (req, res) {
  const id = await getMaxidCounters();
  console.log("max id counter: ", id);
  res.json({ success: true, payload: id });
});

//DELETE Counter
router.delete("/:id", async function (req, res) {
  let id = req.params.id;
  console.log("delete counter id, routes", id);
  deleteCounter(id);
  return res.json({ success: true });
});

//GET all Counters. */
router.get("/", async function (req, res) {
  const items = await getAllCounters();
  res.json({ success: true, payload: items });
});

module.exports = router;
