import React from "react";
import { Row, Navbar, Nav, Button, Col, Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "./index.scss";

const AdminHomePage = () => {
  const location = useLocation();
  const { clearAccessToken } = useAuth();

  return (
    <Container fluid className="vh-100 admin-container">
      <Row className="justify-content-center h-100">
        <Col xs={12} className="p-0">
          <Navbar expand="lg" className="navigation-bar">
            <Navbar.Collapse id="navbar">
              <Nav className="me-auto">
                <Nav.Link
                  href="/admin/dashboard"
                  active={location.pathname.includes("dashboard")}
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  href="/admin/employee-list"
                  active={location.pathname.includes("list")}
                >
                  Employee List
                </Nav.Link>
              </Nav>
              <Button
                variant="secondary"
                className="logout-button"
                onClick={clearAccessToken}
              >
                Logout
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHomePage;
