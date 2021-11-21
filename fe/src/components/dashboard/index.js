import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Button, CardGroup, Spinner } from "react-bootstrap";
import { getDashboardData } from "../../api";
import StatCard from "../stat-card";
import EmployeeModal from "../add-edit-employee";
import "./index.scss";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const closeModal = (update) => {
    if (update) fetchData();
    setShowAddModal(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(fetchData, [fetchData]);

  return (
    <>
      <Row className="pt-3 justify-content-center dashboard-container">
        <Col xs={12} className="button-container d-flex">
          <h3 className="stats-heading">Employee Manager Stats</h3>
          <Button
            variant="primary"
            className="add-employee-button"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Employee
          </Button>
        </Col>
        <Col xs={8} className="pt-4 text-center">
          {isLoading ? (
            <div className="pt-5 mt-5">
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <>
              <CardGroup>
                <StatCard
                  title={dashboardData.totalEmployees || "Not available"}
                  text="Total employees"
                ></StatCard>
                <StatCard
                  title={dashboardData.lastAddedID || "Not available"}
                  text="Last added employee ID"
                ></StatCard>
                <StatCard
                  title={dashboardData.lastAddedDate || "Not available"}
                  text="Last employee added date"
                ></StatCard>
              </CardGroup>
              <CardGroup className="mt-5">
                <StatCard
                  title={dashboardData.userAddedEmployees || "Not available"}
                  text="Total employees added by current user"
                ></StatCard>
                <StatCard
                  title={dashboardData.userAddedID || "Not available"}
                  text="Last added employee ID by current user"
                ></StatCard>
                <StatCard
                  title={dashboardData.userAddedDate || "Not available"}
                  text="Last employee added date by current user"
                ></StatCard>
              </CardGroup>
            </>
          )}
        </Col>
      </Row>
      <EmployeeModal
        show={showAddModal}
        onHide={closeModal}
        action="add"
      ></EmployeeModal>
    </>
  );
};

export default Dashboard;
