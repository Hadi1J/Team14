import React from "react";
import Card from "react-bootstrap/Card";
import "./About.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function About() {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>
          He moonlights difficult engrossed it, sportsmen. Interested has all
          Devonshire difficulty . i enjoyed doing this code with my team they
          are such
        </Card.Text>
        <ul class="list-unstyled mt-3 mb-0">
          <li class="mb-2">
            {" "}
            <i class="bi bi-calendar-date fa-fw pe-1"></i> People:{" "}
            <strong> 20 Members </strong>{" "}
          </li>
          <li class="mb-2">
            {" "}
            <i class="bi bi-heart fa-fw pe-1"></i> Status:{" "}
            <strong> Public </strong>{" "}
          </li>
          <li class="mb-2">
            {" "}
            <i class="bi bi-globe2 fa-fw pe-1"></i>{" "}
            <strong>www.webestica.com </strong>{" "}
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}

export default About;
