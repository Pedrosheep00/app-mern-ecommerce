
import { Navbar, Nav, Container } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../img/logo_2.png'; // Ensure you have your logo image in the correct path
import './Header.css';

const Header = () => {
  return (
    <Navbar className="custom-header">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link href="/cart">
            <ShoppingCartIcon />
          </Nav.Link>
          <Nav.Link href="/search">
            <SearchIcon />
          </Nav.Link>
          <Nav.Link href="/profile">
            <AccountCircleIcon />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
