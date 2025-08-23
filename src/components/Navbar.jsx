import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { MdOutlineOfflineBolt } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -18px;
    right: -8px;
    background: linear-gradient(to bottom, #31ffc8fb, #2e42a7d2);
    color: white;
  }
`;

function MyNavbar() {
  const user = "routeParameter";
  const cartProductsLength = useSelector((state) => state.Cart.length);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="md"
      sticky="top"
      className="navbar mb-3"
      expanded={expanded}
      onToggle={(isOpen) => setExpanded(isOpen)}
    >
      <Container fluid>
        <Navbar.Brand className="navbar-brand">
          <MdOutlineOfflineBolt className="brand-icon" />
          Prodexa
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-md"
          className="navbar-toggle"
        />

        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          className="offcanvas-md"
          backdrop="true" // makes sure backdrop covers screen
          scroll={false} // disables body scroll when open
        >
          <Offcanvas.Header closeButton className="offcanvas-header">
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              <MdOutlineOfflineBolt className="offcanvas-brand-icon" />
              Prodexa
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="offcanvas-body">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                as={Link}
                to="/"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/login/${user}`}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/counter"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Counter
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/products"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Products
              </Nav.Link>
            </Nav>

            <Link to="/cart" onClick={() => setExpanded(false)}>
              <IconButton className="cart-btn">
                <ShoppingCartIcon fontSize="medium" />
                <CartBadge
                  badgeContent={cartProductsLength}
                  color="primary"
                  overlap="circular"
                />
              </IconButton>
            </Link>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
