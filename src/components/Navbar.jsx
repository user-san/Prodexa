import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { MdOutlineOfflineBolt } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import "./Navbar.css";
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -18px;
    right: -8px;
    background: linear-gradient(to bottom, #31ffc8fb, #2e42a7d2);
    color: white;
  }
`;
function MyNavbar() {
  const user = "sandy";

  // const [expanded, setExpanded] = useState(false);
  // const handleNavItemClick = () => {
  //   setExpanded(false);
  // };

  return (
    <header>
      {" "}
      <Navbar
        expand="lg"
        className="navbar "
        // expanded={expanded}
        // onToggle={(isOpen) => setExpanded(isOpen)}
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Container fluid>
          <Navbar.Brand
            style={{
              cursor: "default",
              color: "#212121ff",
              fontSize: "30px",
              marginRight: "15px",
            }}
          >
            <MdOutlineOfflineBolt
              style={{
                marginRight: "10px",
                padding: "none",
                color: "#212121ff",
              }}
            />
            Prodexa
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link
                className="navLink"
                as={Link}
                to="/"
                // onClick={handleNavItemClick}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="navLink"
                as={Link}
                to={`/login/${user}`}
                // onClick={handleNavItemClick}
              >
                {/*sending parameter*/}
                Login
              </Nav.Link>
              <Nav.Link
                className="navLink"
                as={Link}
                to="/counter"
                // onClick={handleNavItemClick}
              >
                Counter
              </Nav.Link>
              <Nav.Link
                className="navLink"
                as={Link}
                to="/products"
                // onClick={handleNavItemClick}
              >
                Products
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              style={{ color: "#ffffffff", borderColor: "#ffffffff" }}
              variant="outline-dark"
              // onClick={handleNavItemClick}
            >
              Search
            </Button> */}
              <Link to="/cart">
                <IconButton className="CartBtn" onClick={() => {}}>
                  <ShoppingCartIcon fontSize="medium" />
                  <CartBadge
                    badgeContent={1}
                    color="primary"
                    overlap="circular"
                  />
                </IconButton>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default MyNavbar;
