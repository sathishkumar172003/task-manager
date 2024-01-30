const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    defaultValue: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = new mongoose.model("Task", taskSchema);
