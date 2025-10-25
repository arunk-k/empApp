import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmployees, updateEmployee } from "../redux/employeeThunks";

const EditEmployee = () => {
  const { id } = useParams();
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
    if (employees.length === 0) dispatch(fetchEmployees());
  }, [dispatch, employees.length]);

  useEffect(() => {
    if (employees.length > 0) {
      const emp = employees.find((e) => e._id === id);
      if (emp) {
        setData({
          name: emp.name || "",
          department: emp.department || "",
          position: emp.position || "",
          age: emp.age || "",
          salary: emp.salary || "",
          email: emp.email || "",
          dateOfJoining: emp.dateOfJoining
            ? new Date(emp.dateOfJoining).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        });
      } else {
        alert("Employee not found!");
      }
    }
  }, [employees, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, department, age, salary } = data;

    if (!name || !department || !age || !salary) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const payload = {
        name,
        department,
        position: data.position,
        age: Number(data.age),
        salary: Number(data.salary),
        email: data.email,
        dateOfJoining: new Date(data.dateOfJoining),
      };

      const result = await dispatch(updateEmployee({ id, updatedData: payload })).unwrap();
      if (result) {
        setShowSuccess(true);
        setTimeout(() => nav("/"), 1500);
      }
    } catch (err) {
      alert("Failed to update employee. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right,#106c85, #033543)",
        minHeight: "100vh",
      }}
      className="d-flex justify-content-center pt-5 pb-4 px-3"
    >
      <div
        className="p-3 p-md-4 rounded border shadow w-100"
        style={{
          background: "linear-gradient(to right,#15718a, #033543)",
          maxWidth: "500px",
        }}
      >
        {showSuccess && (
          <Alert variant="info" onClose={() => setShowSuccess(false)} dismissible>
            Employee updated successfully!
          </Alert>
        )}

        <h3 className="ps-4 pt-4 text-light">Edit Employee</h3>

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
                onChange={(e) => setData({ ...data, department: e.target.value })}
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
                onChange={(e) => setData({ ...data, position: e.target.value })}
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
                onChange={(e) => setData({ ...data, dateOfJoining: e.target.value })}
              />
            </FloatingLabel>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="submit"
                style={{ backgroundColor: "#01607a" }}
                className="btn btn-light text-light mb-4 px-4"
              >
                Update
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

export default EditEmployee;
