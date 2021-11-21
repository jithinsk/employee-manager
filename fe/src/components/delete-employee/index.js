import React, { useState } from "react";
import { Button, Modal, Row, Col, ListGroup } from "react-bootstrap";
import { deleteEmployee } from "../../api";
import "./index.scss";

const DeleteEmployeeModal = ({ show, onHide, employee }) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const deleteEmployeeByID = async () => {
    try {
      await deleteEmployee(employee.id);
      setSubmitStatus(true);
    } catch ({ message }) {
      setSubmitErrorMessage(message);
    }
  };

  const clearState = () => {
    setSubmitStatus(false);
    setSubmitErrorMessage("");
    onHide(submitStatus);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="delete-container">
        {submitStatus ? (
          <Row className="justify-content-center">
            <Col xs={12}>
              <p className="form-feedback-positive">
                Employee deleted successfully!
              </p>
            </Col>
          </Row>
        ) : submitErrorMessage ? (
          <Row className="justify-content-center">
            <Col xs={12}>
              <p className="form-feedback">{submitErrorMessage}</p>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col xs={12}>
              <p className="form-delete-text">
                You are deleting employee with following details. Please click
                Confirm to delete.
              </p>
            </Col>
            <Col xs={6}>
              <ListGroup>
                <ListGroup.Item disabled>
                  Employee ID: {employee.employeeID}
                </ListGroup.Item>
                <ListGroup.Item disabled>
                  Employee Email: {employee.email}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={clearState}>
          Close
        </Button>
        {!submitStatus && !submitErrorMessage && (
          <Button variant="danger" onClick={deleteEmployeeByID}>
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployeeModal;
