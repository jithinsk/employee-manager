import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Search from "../search";
import ResultsTable from "../results-table";
import { debounce } from "../../utils/common";
import "./index.scss";

const debounceInput = debounce((value, dispatch) => {
  dispatch(value);
}, 500);

const EmployeeList = () => {
  const [fieldValue, setFieldValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSelectChange = ({ target: { value } }) => {
    setSelectValue(value);
    setFieldValue("");
    setSearchValue("");
  };

  const handleInputChage = ({ target: { value } }) => {
    setFieldValue(value);
    debounceInput(value, setSearchValue);
  };

  return (
    <Row className="pt-3 justify-content-center results-container">
      <Col xs={8} className="mb-3">
        <Search
          fieldValue={fieldValue}
          selectValue={selectValue}
          handleInputChage={handleInputChage}
          handleSelectChange={handleSelectChange}
        ></Search>
      </Col>
      <Col xs={10} className="h-100">
        <Card>
          <Card.Header className="list-header">Employee List</Card.Header>
          <Card.Body>
            <Row className="justify-content-center">
              <ResultsTable
                searchField={selectValue}
                searchInput={searchValue}
              ></ResultsTable>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EmployeeList;
