import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./index.scss";

const Search = ({
  handleInputChage,
  handleSelectChange,
  fieldValue,
  selectValue,
}) => (
  <Form className="justify-content-center" as={Row}>
    <Col xs={2} className="my-auto">
      <span className="search-heading">Search Options:</span>
    </Col>
    <Col xs={3} className="my-auto select-container">
      <Form.Control
        as="select"
        id="type-select"
        defaultValue={selectValue}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Choose field...
        </option>
        <option value="employee_id">ID</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="age">Age</option>
        <option value="address">Address</option>
        <option value="mobile">Mobile</option>
      </Form.Control>
    </Col>
    <Col xs={7} className="my-auto">
      <Form.Control
        disabled={!selectValue}
        id="search-box"
        type="text"
        placeholder="Enter text to search"
        onChange={handleInputChage}
        value={fieldValue}
      />
    </Col>
  </Form>
);

export default Search;
