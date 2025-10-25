import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { addEmployee, fetchEmployees } from "../redux/employeeThunks";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";

const AddEmployee = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { employees, loading } = useSelector((state) => state.employeeSlice);
  const [showSuccess, setShowSuccess] = useState(false);

  const [data, setData] = useState({
    name: "",
    department: "",
    position: "",
    age: "",
    salary: "",
    email: "",
    dateOfJoining: new Date().toISOString().split("T")[0], 
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, department, position, age, salary, email } = data;

    if (!name || !department || !age || !salary) {
      alert("Please fill in all required fields!");
      return;
    }

    const existing = employees.find(
      (emp) => emp.email?.toLowerCase() === email?.toLowerCase()
    );
    if (existing) {
      alert("An employee with this email already exists.");
      return;
    }

    try {
      const payload = {
        name,
        department,
        position,
        age: Number(age),
        salary: Number(salary),
        email,
        dateOfJoining: new Date(data.dateOfJoining),
      };

      const result = await dispatch(addEmployee(payload)).unwrap();
      if (result) {
        setShowSuccess(true);
        setTimeout(() => {
          nav("/");
        }, 1500);
      }
    } catch (err) {
      alert("Failed to add employee. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #106c85, #033543)",
        minHeight: "100vh",
      }}
      className="d-flex justify-content-center pt-5 pb-4 px-3"
    >
      <div
        className="p-3 p-md-4 rounded border shadow w-100"
        style={{
          background: "linear-gradient(to right, #15718a, #033543)",
          maxWidth: "500px",
        }}
      >
        {showSuccess && (
          <div className="pt-3">
            <Alert
              variant="info"
              onClose={() => setShowSuccess(false)}
              dismissible
            >
              Employee added successfully!
            </Alert>
          </div>
        )}

        <h3 className="ps-4 pt-4 text-light">Add Employee</h3>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center gap-2 p-5 text-light">
            <span style={{ fontSize: "17px" }}>Loading...</span>
            <Spinner animation="grow" variant="light" size="sm" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingName"
              label="Enter Name"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="text"
                placeholder="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDepartment"
              label="Enter Department"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="text"
                placeholder="department"
                value={data.department}
                onChange={(e) =>
                  setData({ ...data, department: e.target.value })
                }
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPosition"
              label="Enter Position"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="text"
                placeholder="position"
                value={data.position}
                onChange={(e) =>
                  setData({ ...data, position: e.target.value })
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingAge"
              label="Enter Age"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="number"
                placeholder="age"
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingSalary"
              label="Enter Salary"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="number"
                placeholder="salary"
                value={data.salary}
                onChange={(e) => setData({ ...data, salary: e.target.value })}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingEmail"
              label="Enter Email"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="email"
                placeholder="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingDate"
              label="Date of Joining"
              className="ms-4 mt-4 me-4 text-secondary"
            >
              <Form.Control
                type="date"
                value={data.dateOfJoining}
                onChange={(e) =>
                  setData({ ...data, dateOfJoining: e.target.value })
                }
              />
            </FloatingLabel>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                style={{ backgroundColor: "#01607a" }}
                className="btn btn-light text-light mb-4 px-4"
              >
                Submit
              </button>
              <button
                type="button"
                style={{ backgroundColor: "#455659" }}
                onClick={() => nav("/")}
                className="btn btn-light text-light mb-4 px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;
