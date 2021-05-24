const express = require("express");
const config = require("config");

const { Notes } = require("../models/Notes");
const { getCurrentTime } = require("../helper");

const router = express.Router();

router.get("/getNotes", (req, res) => {
  Notes.find({ isDeleted: false })
    .then((result) => {
      res.status(200).send({ status: 200, result: result, message: null });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, message: err });
    });
});

router.post("/addNote", async (req, res) => {
  const note = new Notes({
    title: req.body.title,
    content: req.body.content,
    createdAt: req.body.createdAt,
    modifiedAt: req.body.modifiedAt,
  });

  let result;
  try {
    result = await note.save();
    res
      .status(200)
      .send({
        status: 200,
        result: result,
        message: "Note added successfully",
      });
  } catch (err) {
    res.status(500).send({ status: 500, result: null, message: err });
  }
});

router.put("/updateNote", (req, res) => {
  Notes.findOneAndUpdate({ _id: req.body.noteId }, { ...req.body })
    .then((result) => {
      res
        .status(200)
        .send({
          status: 200,
          result: result,
          message: "Note updated successfully",
        });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, message: err });
    });
});

router.put("/archiveNote", (req, res) => {
  Notes.findOneAndUpdate(
    { _id: req.body.noteId },
    { isDeleted: true, modifiedAt: req.body.modifiedAt }
  )
    .then((result) => {
      res
        .status(200)
        .send({
          status: 200,
          result: result,
          message: "Note archived successfully",
        });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, message: err });
    });
});

router.put("/deleteNote", (req, res) => {
  Notes.findOneAndDelete({ _id: req.body.noteId })
    .then((result) => {
      res
        .status(200)
        .send({
          status: 200,
          result: result,
          message: "Note deleted successfully",
        });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, message: err });
    });
});

module.exports = router;
