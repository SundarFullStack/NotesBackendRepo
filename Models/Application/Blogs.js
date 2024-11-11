const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    notesTitle: {
      type: String,
      required: true,
    },
    notesData: {
      type: String,
      required: true,
    },

    savedDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    collection: "Notes",
  }
);

module.exports = mongoose.model("Notes", notesSchema);
