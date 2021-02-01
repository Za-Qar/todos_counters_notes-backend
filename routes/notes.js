var express = require("express");
var router = express.Router();

const {
  createNote,
  getMaxNoteId,
  getAllNotes,
  deleteNote,
} = require("../models/notes");

/*------------Notes------------*/
//POST note
router.post("/", async function (req, res) {
  let body = req.body;

  const items = await createNote(body);
  res.json(items);
});

//GET note max id
router.get("/getMaxNoteId", async function (req, res) {
  const id = await getMaxNoteId();
  res.json({ success: true, payload: id });
});

//GET all notes
router.get("/", async function (req, res) {
  let { email } = req.query;
  const notes = await getAllNotes(email);
  res.json({ success: true, payload: notes });
});

//DELETE note
router.delete("/:id", async function (req, res) {
  let id = req.params.id;
  deleteNote(id);
  return res.json({ success: true });
});

module.exports = router;
