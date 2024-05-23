const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, query, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
///////  ROUTE 1: Get All Notes   with  GET "/api/notes/fetchallnotes". Lgin Required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internnal Server Erro Occured");
  }
});
///////  ROUTE 2: ADD Notes   with  POST "/api/notes/addnote". Lgin Required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description  must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internnal Server Erro Occured");
    }
  }
);

///////  ROUTE 3: Updates Notes   with  PUT "/api/notes/updatenote". Lgin Required
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Createe a new noote object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      /// Finnd the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(401).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Alloowed");
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json({ note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internnal Server Erro Occured");
    }
  }
);

///////  ROUTE 4: Delete Notes   with  DELETE "/api/notes/deletenote". Lgin Required
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      // const { title, description, tag } = req.body;
      // Createe a new noote object

      /// Finnd the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(401).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Alloowed");
      }
      /// Allow deletion only if user own this note

      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });

      // }
      note = await Notes.findByIdAndDelete(req.params.id);

      res.json({ Success: "Note has beenn deleted", note: note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internnal Server Erro Occured");
    }
  }
);
module.exports = router;
