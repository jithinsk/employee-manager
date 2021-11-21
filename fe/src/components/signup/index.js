import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { signup } from "../../api";
import "./index.scss";

const validateSignupForm = ({ username, password, confirmPassword }) => {
  const errors = {};
  if (!username) errors.username = "*required";
  else if (!/^[a-zA-Z0-9]+$/.test(username))
    errors.username = "*must be alpha numeric";
  else if (username.length < 4 || username.length > 8)
    errors.username = "*must be 4-8 character";

  if (!password) errors.password = "*required";
  else if (password.length < 8 || password.length > 12) {
    errors.password = "*must be 8-12 characters";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "*must contain a lowercase letter";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "*must contain an uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "*must contain a digit";
  }

  if (!confirmPassword) errors.confirmPassword = "*required";
  else if (password !== confirmPassword)
    errors.confirmPassword = "*passwords not matching";
  return errors;
};

const Signup = () => {
  const [signupStatus, setSignupStatus] = useState("init");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const signUp = async ({ username, password, confirmPassword }) => {
    try {
      await signup(username, password, confirmPassword);
      setSignupStatus("success");
    } catch (error) {
      setSignupStatus("failed");
      setSignupErrorMessage(error.message);
    }
  };

  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    validate: validateSignupForm,
    onSubmit: signUp,
  });

  return (
    <Col xs={12} className="signup-container">
      {signupStatus === "success" ? (
        <Link to={`/login`}>
          You have signed up successfully. Click here to go to Sign In
        </Link>
      ) : (
        <>
          <Row className="justify-content-center signup-header mb-3">
            Sign Up
          </Row>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="username"
            >
              <Col sm={8} className="input-field-group">
                <Form.Label column sm={4} className="input-label">
                  Username:
                </Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Username must be alphanumeric"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  isInvalid={formik.touched.username && formik.errors.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="feedback-text mb-0">{formik.errors.username}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="password"
            >
              <Col sm={8} className="input-field-group">
                <Form.Label column sm={4} className="input-label">
                  Password:
                </Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Password must be mixedcase with digits"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="feedback-text mb-0">{formik.errors.password}</p>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3 justify-content-center"
              controlId="confirmPassword"
            >
              <Col sm={8} className="input-field-group">
                <Form.Label column sm={4} className="input-label">
                  Confirm Password:
                </Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  isInvalid={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="feedback-text mb-0">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 mt-4 justify-content-center">
              <Col sm={8}>
                <Button
                  type="submit"
                  className="signup-button pt-2 pb-2"
                  disabled={formik.isSubmitting}
                >
                  SIGN UP
                </Button>
                {signupStatus === "failed" && (
                  <p className="form-feedback pt-2">{signupErrorMessage}</p>
                )}
              </Col>
            </Form.Group>
          </Form>
          <Link to={`/login`}>Have an account? Sign In Here</Link>
        </>
      )}
    </Col>
  );
};

export default Signup;
