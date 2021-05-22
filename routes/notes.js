const express = require("express");
const config = require("config");

const { Notes } = require("../models/Notes");
const { getCurrentTime } = require("../helper");

const router = express.Router();

router.get("/getNotes", (req, res) => {
  Notes.find({ isDeleted: false })
    .then((result) => {
      res.status(200).send({ status: 200, result: result, errorMessage: null });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, errorMessage: err });
    });
});

router.post("/addNote", async (req, res) => {
  const currentTime = getCurrentTime();

  const note = new Notes({
    title: req.body.title,
    content: req.body.content,
    createdAt: currentTime,
    modifiedAt: currentTime,
  });

  let result;
  try {
    result = await note.save();
    res.status(200).send({ status: 200, result: result, errorMessage: null });
  } catch (err) {
    res.status(500).send({ status: 500, result: null, errorMessage: err });
  }
});

router.put("/updateNote", (req, res) => {
  const currentTime = getCurrentTime();

  Notes.findOneAndUpdate(
    { _id: req.body.noteId },
    { ...req.body, modifiedAt: currentTime }
  )
    .then((result) => {
      res.status(200).send({ status: 200, result: result, errorMessage: null });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, errorMessage: err });
    });
});

router.put("/archiveNote", (req, res) => {
  const currentTime = getCurrentTime();

  Notes.findOneAndUpdate(
    { _id: req.body.noteId },
    { isDeleted: true, modifiedAt: currentTime }
  )
    .then((result) => {
      res.status(200).send({ status: 200, result: result, errorMessage: null });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, errorMessage: err });
    });
});

router.put("/deleteNote", (req, res) => {
  Notes.findOneAndDelete({ _id: req.body.noteId })
    .then((result) => {
      res.status(200).send({ status: 200, result: result, errorMessage: null });
    })
    .catch((err) => {
      res.status(500).send({ status: 500, result: null, errorMessage: err });
    });
});

module.exports = router;
