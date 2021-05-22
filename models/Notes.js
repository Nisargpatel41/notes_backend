const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: String,
    required: true,
  },
  isDeleted: { type: Boolean, required: false, default: false },
});

const Notes = mongoose.model("Notes", notesSchema);

exports.Notes = Notes;
