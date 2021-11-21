import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";
import "./index.scss";

const Homepage = () => (
  <Container fluid className="vh-100 home-container">
    <Row className="justify-content-center h-100 align-items-center card-container">
      <Col sm={6}>
        <Card className="text-center form-card">
          <Card.Header className="pt-3 pb-3">
            <h3 className="app-header">Employee Manager</h3>
          </Card.Header>
          <Card.Body className="pt-3 pb-5">
            <Row className="justify-content-center">
              <Outlet />
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Homepage;
