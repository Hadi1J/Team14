import React, { useState } from "react";
/*import 'bootstrap-icons/font/bootstrap-icons.css';*/
import "./NavbarStyles.css";

const Navbar = ({ cartCount }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white"
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        marginBottom: "20px",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ marginRight: "15px" }}>
          <i
            className="bi-megaphone"
            style={{
              color: "white",
              backgroundColor: "#0085ff",
              borderRadius: "0.25rem",
              padding: "6px 8px",
            }}
          ></i>
        </a>

        <input
          type="text"
          className="form-control d-none d-lg-block"
          placeholder="Search"
          aria-label="Search"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%23757575' viewBox='0 0 16 16' width='16' height='16'><path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.095.115l3.85 3.849a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.068 1.068 0 0 0-.112-.098zm-5.742 3.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z'/></svg>\")",
            backgroundPosition: "10px 10px",
            backgroundRepeat: "no-repeat",
            paddingLeft: "30px",
            marginLeft: "15px",
            width: "250px",
          }}
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <input
            type="text"
            className="form-control d-lg-none mt-2 mb-2"
            placeholder="Search"
            aria-label="Search"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='%23757575' viewBox='0 0 16 16' width='16' height='16'><path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.095.115l3.85 3.849a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.068 1.068 0 0 0-.112-.098zm-5.742 3.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z'/></svg>\")",
              backgroundPosition: "10px 10px",
              backgroundRepeat: "no-repeat",
              paddingLeft: "30px",
            }}
          />

          <div className="d-flex align-items-center ms-auto">
            <div className="d-none d-lg-flex">
              <div className="dropdown mx-2">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Demo
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                ></ul>
              </div>
              <div className="dropdown mx-2">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pages
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton2"
                ></ul>
              </div>
              <div className="dropdown mx-2">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton3"
                ></ul>
              </div>
              <button className="btn mx-2" type="button" aria-expanded="false">
                My Network
              </button>
            </div>

            <button
              className="btn mx-2"
              style={{
                backgroundColor: "#e9ecef",
                borderRadius: "0.25rem",
                padding: "6px 8px",
              }}
            >
              <i className="bi-chat" style={{ fontSize: "1.5rem" }}></i>
            </button>
            <button
              className="btn mx-2"
              style={{
                backgroundColor: "#e9ecef",
                borderRadius: "0.25rem",
                padding: "6px 8px",
              }}
            >
              <i className="bi-gear" style={{ fontSize: "1.5rem" }}></i>
            </button>
            <button
              className="btn mx-2 position-relative"
              style={{
                backgroundColor: "#e9ecef",
                borderRadius: "0.25rem",
                padding: "6px 8px",
              }}
            >
              <i className="bi-bell" style={{ fontSize: "1.5rem" }}></i>
              <span
                className="position-absolute"
                style={{
                  top: "-5px",
                  right: "-5px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              ></span>
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#e9ecef",
                borderRadius: "0.25rem",
                padding: "6px 8px",
              }}
            >
              <i
                className="bi-person-square"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
