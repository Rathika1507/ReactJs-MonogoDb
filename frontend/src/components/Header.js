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
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/Home">
            <img width="150px" src="/images/products/logo.jpg" alt=" Cart Logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-5 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center"> 
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Link to="/cart">
              <Button variant="primary">Cart ({cartItems.length})</Button>
            </Link>
          </ButtonGroup>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        My Profile
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">My Order</Dropdown.Item>
        <Dropdown.Item href="/">Logout</Dropdown.Item>
               </Dropdown.Menu>
    </Dropdown>
          </ButtonToolbar>
      </div>
    </nav>
  );
}
