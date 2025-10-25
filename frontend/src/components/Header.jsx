import { Container, Navbar, Nav, FormControl } from "react-bootstrap";

const Header = ({ onSearch }) => {
  return (
    <Navbar style={{ backgroundColor: "#071f26" }} expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/11246/11246228.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <span className="text-light">Employee Management System</span>
        </Navbar.Brand>
        <Navbar.Toggle className="custom-toggler" aria-controls="basic-navbar" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center my-2">
            <FormControl
              type="text"
              placeholder="Search by name, dept, or position"
              className="me-2"
              onChange={(e) => onSearch(e.target.value)}
              style={{ width: "300px" }}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
