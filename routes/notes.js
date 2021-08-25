const express = require("express");
const {
  addNote,
  getAllNotes,
  updateNotes,
  deleteNotes,
  getAllNotesById,
} = require("../controllers/notes");
const { verifyToken } = require("../middlewares/authmiddleware");
const { handleNoteIdparam } = require("../middlewares/notemiddleware");
const router = express.Router();

//whenever any route has noteid as header then this route function will pass the control to handleNoteIdparam
router.param("noteId", handleNoteIdparam);

//localhost: 8000 / auth / note/ add
router.post("/add", verifyToken, addNote);

//localhost: 8000 / auth / note/ getallnotes
router.get("/getallnotes", verifyToken, getAllNotes);

//localhost: 8000 / auth / note/ update/:noteId
router.put("/update/:noteId", verifyToken, updateNotes);

//localhost: 8000 / auth / note/ delete/:noteId
router.delete("/delete/:noteId", verifyToken, deleteNotes);

//localhost: 8000 / auth / note/getnote/:noteId
router.get("/getnote/:noteId", verifyToken, getAllNotesById);

module.exports = router;
