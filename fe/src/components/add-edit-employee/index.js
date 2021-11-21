import React, { useState } from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { addEmployee, updateEmployee } from "../../api";
import "./index.scss";

const validateEmployeeForm = ({ employeeID, name, email, age, address, mobile }) => {
  const errors = {};
  if (!employeeID) errors.employeeID = "*required";
  else if (typeof employeeID !== "number" || employeeID < 1000 || employeeID > 9999)
    errors.employeeID = "*must be a four digit number";

  if (!name) errors.name = "*required";

  if (!email) errors.email = "*required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    errors.email = "*must be a valid email";

  if (!age) errors.age = "*required";
  else if (typeof age !== "number") errors.age = "*must be a number";

  if (!address) errors.address = "*required";

  if (!mobile) errors.mobile = "*required";
  else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))
    errors.mobile = "*must be a valid mobile number";

  return errors;
};

const EmployeeModal = ({ show, onHide, action, initialValues }) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const addNewEmployee = async (employee) => {
    try {
      await addEmployee(employee);
      setSubmitStatus(true);
    } catch ({ message }) {
      setSubmitErrorMessage(message);
    }
  };

  const editEmployee = async (employee) => {
    try {
      await updateEmployee(employee);
      setSubmitStatus(true);
    } catch ({ message }) {
      setSubmitErrorMessage(message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues || {
      employeeID: "",
      name: "",
      email: "",
      age: "",
      address: "",
      mobile: "",
    },
    validate: validateEmployeeForm,
    onSubmit: action === "add" ? addNewEmployee : editEmployee,
  });

  const clearState = (close) => {
    let isSubmitted = submitStatus;
    setSubmitStatus(false);
    setSubmitErrorMessage("");
    formik.resetForm();
    if (close) onHide(isSubmitted);
  };

  return (
    <Modal
      show={show}
      onHide={() => clearState(true)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {action === "add" ? `Add Employee` : `Edit Employee`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="employee-modal-body-container">
        {submitStatus ? (
          action === "add" ? (
            <Row className="justify-content-center">
              <Col xs={12}>
                <p className="form-feedback-positive">
                  Employee added successfully!
                </p>
              </Col>
              <Col xs={6} className="text-center">
                <Button onClick={() => clearState(false)}>Add another</Button>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col xs={12}>
                <p className="form-feedback-positive">
                  Employee details updated!
                </p>
              </Col>
              <Col xs={6} className="text-center">
                <Button onClick={() => clearState(true)}>Close</Button>
              </Col>
            </Row>
          )
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="username"
            >
              <Form.Label column sm={3} className="employee-modal-input-label">
                Employee ID:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Employee ID"
                  name="employeeID"
                  onChange={formik.handleChange}
                  value={formik.values.employeeID}
                  isInvalid={formik.touched.employeeID && formik.errors.employeeID}
                  disabled={action === "edit"}
                />
                {formik.touched.employeeID && formik.errors.employeeID && (
                  <p className="feedback-text mb-0">{formik.errors.employeeID}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="name"
            >
              <Form.Label column sm={3} className="employee-modal-input-label">
                Employee Name:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Employee Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="feedback-text mb-0">{formik.errors.name}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="email"
            >
              <Form.Label column sm={3} className="employee-modal-input-label">
                Email address:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="feedback-text mb-0">{formik.errors.email}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="age"
            >
              <Form.Label column sm={3} className="employee-modal-input-label">
                Age:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Age"
                  name="age"
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  isInvalid={formik.touched.age && formik.errors.age}
                />
                {formik.touched.age && formik.errors.age && (
                  <p className="feedback-text mb-0">{formik.errors.age}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="address"
            >
              <Form.Label column sm={3} className="employee-modal-input-label">
                Address:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  isInvalid={formik.touched.address && formik.errors.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="feedback-text mb-0">{formik.errors.address}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="mobile"
            >
              <Form.Label column sm={3} className="employee-modal-input-label">
                Mobile:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  name="mobile"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                  isInvalid={formik.touched.mobile && formik.errors.mobile}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="feedback-text mb-0">{formik.errors.mobile}</p>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 mt-5 justify-content-center">
              <Col sm={6}>
                <Button
                  type="submit"
                  className="submit-button"
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
                {submitErrorMessage && (
                  <p className="pt-2 form-feedback">{submitErrorMessage}</p>
                )}
              </Col>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeModal;
