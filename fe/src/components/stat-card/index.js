import React from "react";
import { Card } from "react-bootstrap";
import "./index.scss";

const StatCard = ({ title, text }) => {
  return (
    <Card className="stat-card">
      <Card.Body className="stat-card-body d-flex">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
