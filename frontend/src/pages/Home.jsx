import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../redux/employeeThunks";
import Header from "../components/Header";
import { Table, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector((state) => state.employeeSlice);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this employee?");
        if (!confirm) return;

        try {
            await dispatch(deleteEmployee(id)).unwrap();
            setShowDeleteSuccess(true);
            dispatch(fetchEmployees());
            setTimeout(() => setShowDeleteSuccess(false), 2000);
        } catch (error) {
            console.log("Delete failed", error);
        }
    };


    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.position && emp.position.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <Header onSearch={setSearchTerm} />

            <div className="container mt-5 pt-2">
                {showDeleteSuccess && (
                    <Alert variant="danger" onClose={() => setShowDeleteSuccess(false)} dismissible>
                        Employee deleted successfully!
                    </Alert>
                )}

                <div className="d-flex justify-content-end mb-3">
                    <Link
                        to="/add"
                        className="btn btn-light rounded-pill px-4"
                        style={{ backgroundColor: "#04495c", color: "#fcf2f7" }}
                    >
                        Add Employee <i className="fa-solid fa-plus fa-sm"></i>
                    </Link>
                </div>

                <div className="table-responsive">
                    <Table
                        style={{ background: "linear-gradient(to right,rgb(21, 113, 138), #033543)" }}
                        className="text-light"
                        responsive="xs"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Position</th>
                                <th>Age</th>
                                <th>Salary</th>
                                <th>Email</th>
                                <th>Date of Joining</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <span>Loading...</span>
                                            <Spinner animation="grow" variant="light" size="sm" />
                                        </div>
                                    </td>
                                </tr>
                            ) : error.length > 0 ? (
                                <tr>
                                    <td colSpan="9">
                                        <h4>{error}</h4>
                                    </td>
                                </tr>
                            ) : filteredEmployees.length > 0 ? (
                                filteredEmployees.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.department}</td>
                                        <td>{item.position}</td>
                                        <td>{item.age}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.email}</td>
                                        <td>{new Date(item.dateOfJoining).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/edit/${item._id}`}
                                                className="btn btn-outline-light btn-sm me-2 mb-2"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-outline-danger btn-sm mb-2"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center fst-italic">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Home;
