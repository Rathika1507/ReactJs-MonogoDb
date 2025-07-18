import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Search from "./Search";
import { Button, ButtonGroup, ButtonToolbar, Dropdown } from 'react-bootstrap';

export default function Header({ cartItems }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignIn = () => {
    navigate("/Auth");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName = user && (user.username || user.name || user.email);

  return (
    <nav className="navbar row sticky-top">
      <div className="col-12 col-md-3 ps-2">
        <div className="navbar-brand">
          <Link to="/Home">
            <img
              width="90px"
              style={{
                marginLeft: "40px",
                marginTop: "10px",
                marginRight: "150px",
                display: "block"
              }}
              src="/images/products/Logo-updated.PNG"
              alt="Cart Logo"
            />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-5 mt-2 mt-md-0 ps-1">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex justify-content-start">
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Button
                variant="outline-primary"
                style={{
                  borderRadius: "16px",
                  padding: "4px 14px",
                  fontWeight: "bold",
                  backgroundColor: "#007bff",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(0,123,255,0.15)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: "90px",
                  justifyContent: "center",
                  fontSize: "0.95rem"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.016-2l-.984-2h16.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5h-1.5l-3.6-7.59c-.18-.36-.54-.59-.93-.59h-9.57c-.55 0-1 .45-1 1s.45 1 1 1h8.84l2.76 5.8h-12.6c-.41 0-.75.34-.75.75s.34.75.75.75h1.25l1.1 2.22c.18.36.54.58.93.58h11.5c.55 0 1-.45 1-1s-.45-1-1-1h-11.16z" />
                </svg>
                <span style={{ marginLeft: "6px" }}>Cart</span>
                <span
                  style={{
                    background: "#ffc107",
                    color: "#212529",
                    borderRadius: "50%",
                    padding: "2px 8px",
                    fontSize: "0.95em",
                    fontWeight: "bold",
                    marginLeft: "8px",
                    minWidth: "28px",
                    textAlign: "center"
                  }}
                >
                  {cartItems.length}
                </span>
              </Button>
            </Link>
          </ButtonGroup>

          <Dropdown
            show={showProfileMenu}
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <Dropdown.Toggle
              variant="outline-success pe-5"
              id="dropdown-basic"
              style={{
                borderRadius: "16px",
                padding: "4px 14px",
                fontWeight: "bold",
                backgroundColor: "#28a745",
                color: "white",
                boxShadow: "0 2px 8px rgba(40,167,69,0.15)",
                minWidth: "90px",
                justifyContent: "center",
                fontSize: "0.95rem",
                transition: "0.3s"
              }}
              onClick={() => {
                if (!user) handleSignIn();
              }}
            >
              {displayName
                ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
                : "Sign In"}
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-info text-white">
              <Dropdown.Item as={Link} to="/orders">My Orders</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
      </div>
    </nav>
  );
}
