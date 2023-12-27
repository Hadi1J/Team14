import React from "react";
import { Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Group.css";
import apple from "./13.svg";
import A from "./images/01 (1).jpg";
import B from "./images/02.jpg";
import C from "./images/03.jpg";
import D from "./images/04.jpg";
import E from "./images/05.jpg";
import F from "./images/06.jpg";
import G from "./images/07.jpg";
import H from "./images/08.jpg";
import I from "./images/09.jpg";
import J from "./images/10.jpg";

function UnderlineExample() {
  return (
    <Nav
      variant="underline"
      defaultActiveKey="/home"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Nav.Item>
        <Nav.Link href="/home">Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">
          Connections
          <span class="badge bg-success bg-opacity-10 text-success small">
            {" "}
            230
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Media</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-4">Videos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-5">Events</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

function Group() {
  return (
    <Card className="text-center" style={{ width: "100%" }}>
      <Card.Body style={{ marginBottom: "20px" }}>
        <div class="d-md-flex flex-wrap align-items-start text-center text-md-start">
          <div class="mb-2">
            <div class="avatar avatar-xl">
              <img
                class="avatar-img border-0"
                src={apple}
                alt=""
                style={{ width: "82px", height: "82px" }}
              />
            </div>
          </div>

          <div class="ms-md-4 mt-3">
            <div className="titleapple " style={{ fontSize: "30px" }}>
              Apple Education{" "}
            </div>
            <ul class="nav nav-divider justify-content-center justify-content-md-start">
              <li class="nav-item"> Private group </li>
              <li class="nav-item"></li>
              <li class="nav-item"> 28.3K members </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center justify-content-md-start align-items-center mt-3 ms-lg-auto">
            <button
              type="button"
              class="btn btn-success "
              style={{ backgroundColor: "lightblue" }}
            >
              <i
                className="bi bi-person-check-fill pe-1"
                style={{ color: "blue" }}
              >
                Joined
              </i>{" "}
            </button>
            <button className="btn btn-link me-2">
              <i className="fa-solid fa-plus pe-1"></i> Invite
            </button>
            <div className="dropdown">
              <button
                className="icon-sm btn btn-link btn-dark"
                type="button"
                id="groupAction"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="groupAction"
              ></ul>
            </div>
          </div>
        </div>

        <div className="avatars">
          <ul className="avatar-group list-unstyled d-flex flex-wrap justify-content-center justify-content-md-start align-items-center mb-0 mt-3">
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={A}
                alt="John Doe's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={B}
                alt="Jane Smith's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={C}
                alt="Alex Johnson's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={D}
                alt="Emily Davis's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={E}
                alt="Michael Lee's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={F}
                alt="Olivia Brown's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={G}
                alt="Daniel White's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={H}
                alt="Sophia Miller's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={I}
                alt="William Taylor's avatar"
              />
            </li>
            <li className="avatar avatar-xs">
              <img
                className="avatar-img rounded-circle"
                width={40}
                height={40}
                src={J}
                alt="Ella Harris's avatar"
              />
            </li>
            <li className="avatar avatar-xs me-2">
              <div className="avatar-img rounded-circle bg-primary">
                <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                  +19
                </span>
              </div>
            </li>
            <li className="small text-center">
              Carolyn Ortiz, Frances Guerrero, and 20 others joined the group
            </li>
          </ul>
        </div>
      </Card.Body>

      <Card.Footer className="text-muted p-0">
        <UnderlineExample />
      </Card.Footer>
    </Card>
  );
}

export default Group;
