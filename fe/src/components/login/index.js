import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../api";
import "./index.scss";

const validateLoginForm = ({ username, password }) => {
  const errors = {};
  if (!username) errors.username = "*required";
  if (!password) errors.password = "*required";
  return errors;
};

const Login = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState("");

  const signIn = async ({ username, password }) => {
    try {
      const {
        user: { token },
      } = await login(username, password);
      setAccessToken(token);
      navigate("../admin/dashboard");
    } catch ({ message }) {
      setLoginFailed(message);
    }
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validate: validateLoginForm,
    onSubmit: signIn,
  });

  return (
    <Col xs={10} className="login-container">
      <Row className="justify-content-center signin-header mb-3"> Sign In</Row>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3 justify-content-center">
          <Form.Group
            as={Row}
            className="mb-3 justify-content-center"
            controlId="username"
          >
            <Col sm={8} className="input-field-group">
              <Form.Label column sm={3} className="input-label">
                Username:
              </Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter your username"
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
              <Form.Label column sm={3} className="input-label">
                Password:
              </Form.Label>
            </Col>
            <Col sm={8}>
              <Form.Control
                type="password"
                placeholder="********"
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

          <Form.Group as={Row} className="mb-3 mt-4 justify-content-center">
            <Col sm={8}>
              <Button
                type="submit"
                className="signin-button pt-2 pb-2"
                disabled={formik.isSubmitting}
              >
                LOG IN
              </Button>
              {loginFailed && (
                <p className="form-feedback pt-2">{loginFailed}</p>
              )}
            </Col>
          </Form.Group>
        </Row>
      </Form>
      <Link to={`/signup`}>Need an account? Signup Here</Link>
    </Col>
  );
};

export default Login;
