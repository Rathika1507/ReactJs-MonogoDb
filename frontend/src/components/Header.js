import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Search from "./Search";
import { Button, ButtonGroup, ButtonToolbar, Dropdown  } from 'react-bootstrap';

export default function Header({ cartItems }) {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar row sticky-top">
      <div className="col-12 col-md-3 ps-2">
        <div className="navbar-brand">
          <Link to="/Home">
            <img
              width="90px"
              style={{ marginLeft: "40px", marginTop: "10px", marginRight: "150px", display: "block" }}
              src="/images/products/logo.jpg"
              alt=" Cart Logo"
            />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-5 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex justify-content-center" > 
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Link to="/cart">
                <Button variant="outline-primary"
                style={{borderRadius:"20px",
                  padding:"8px 20px",
                  fontweight:"bold",
                  backgroundColor:"#007bff",
                  color:"white",
                  transition: "0.3s"
                  }}>
                🛒Cart ({cartItems.length})</Button>
            </Link>
          </ButtonGroup>
      <Dropdown>
      <Dropdown.Toggle variant="outline-success" id="dropdown-basic" 
      style={{borderRadius:"20px",
        padding:"8px 20px",
        fontweight:"bold",
        backgroundColor:"#28a745",
        color:"white",
        transition: "0.3s"
      }} onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e9f5ff";
                e.target.style.transform = "translateX(5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateX(0)";
              }}>
        My Profile
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item as={Link} to="/orders">🛍️My Order</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>🚪Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </ButtonToolbar>
      </div>
    </nav>
  );
}
