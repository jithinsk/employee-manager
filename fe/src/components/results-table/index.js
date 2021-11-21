import React, { useCallback, useEffect, useState } from "react";
import { Table, Col, Image, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import EditEmployeeModal from "../add-edit-employee";
import DeleteEmployeeModal from "../delete-employee";
import { listEmployees } from "./../../api";
import deleteIcon from "./../../assets/delete.svg";
import editIcon from "./../../assets/edit.svg";
import "./index.scss";

const dataHeaders = [
  { key: "employeeID", value: "ID", columnCount: 1 },
  { key: "name", value: "Name", columnCount: 1 },
  { key: "age", value: "Age", columnCount: 1 },
  { key: "email", value: "Email", columnCount: 2 },
  { key: "address", value: "Address", columnCount: 3 },
  { key: "mobile", value: "Mobile", columnCount: 2 },
];
const itemsPerPage = 5;

const ResultsTable = ({ searchField, searchInput }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalState, setModalState] = useState({
    action: "",
    employeeID: "",
  });

  const searchFor = useCallback(async () => {
    try {
      setIsLoading(true);
      const options = { page: currentPage + 1, limit: itemsPerPage };
      if (searchField) options[searchField] = searchInput;
      const { employees, totalPages } = await listEmployees(options);
      setDataset(employees);
      setPageCount(totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [searchField, searchInput, currentPage]);

  const closeModal = (update) => {
    if (update) searchFor();
    setModalState({ action: "", employeeID: "" });
  };

  useEffect(searchFor, [searchFor]);

  const setEmployeeAction = (employeeID, action = "edit") => {
    setModalState({
      action,
      employeeID,
    });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Col xs={12} className="results-table-container">
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr className="d-flex">
            {dataHeaders.map(({ key, value, columnCount }) => (
              <th key={key} className={`col-sm-${columnCount}`}>
                {value}
              </th>
            ))}
            <th className="col-sm-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || dataset.length === 0 ? (
            <tr>
              <td className="no-rows-message" colSpan={6}>
                <div className="mt-5 text-center">
                  {isLoading ? (
                    <Spinner animation="border" role="status" />
                  ) : (
                    "No employees found"
                  )}
                </div>
              </td>
            </tr>
          ) : (
            dataset.map((data) => (
              <tr key={data.id} className="d-flex">
                {dataHeaders.map(({ key, columnCount }) => (
                  <td key={key} className={`col-sm-${columnCount}`}>
                    {data[key]}
                  </td>
                ))}
                <td className="col-sm-2">
                  <Image
                    className="action-image"
                    src={editIcon}
                    onClick={() => setEmployeeAction(data.id, "edit")}
                  ></Image>
                  <Image
                    className="action-image"
                    src={deleteIcon}
                    onClick={() => setEmployeeAction(data.id, "delete")}
                  ></Image>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={currentPage}
        />
      )}
      {modalState.action === "delete" && (
        <DeleteEmployeeModal
          show
          onHide={closeModal}
          employee={dataset.find(({ id }) => id === modalState.employeeID)}
        ></DeleteEmployeeModal>
      )}
      {modalState.action === "edit" && (
        <EditEmployeeModal
          show
          action={modalState.action}
          onHide={closeModal}
          initialValues={dataset.find(({ id }) => id === modalState.employeeID)}
        ></EditEmployeeModal>
      )}
    </Col>
  );
};

export default ResultsTable;
