const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: false },
  age: { type: Number, required: true },
  salary: { type: Number, required: true },
  email: { type: String },
  dateOfJoining: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Employee", employeeSchema);
