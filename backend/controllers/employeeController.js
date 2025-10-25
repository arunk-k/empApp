const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  const { name, department, position } = req.query;
  const query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (department) query.department = { $regex: department, $options: "i" };
  if (position) query.position = { $regex: position, $options: "i" };

  try {
    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err.message });
  }
};


const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: "Error creating employee", error: err.message });
  }
};


const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: "Error updating employee", error: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
