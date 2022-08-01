import React, { useContext } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Mystore } from "../../utils/MyStore";
import Drawer from "../Drawer";

const Header = () => {
  const { state } = useContext(Mystore);
  let cart_products = state.cart.cartItems.length;

  const [toogleDrawer, setToogleDrawer] = React.useState(false);
  const toogleDrawerHandler = () => {
    setToogleDrawer(!toogleDrawer);
  };

  return (
    <>
      <Drawer
        incart={cart_products}
        toogleDrawer={toogleDrawer}
        setToogleDrawer={setToogleDrawer}
      />
      <Navbar
        bg="white"
        expand="xl"
        fixed="top"
        className="z-index shadow w-100"
      >
        <Container>
          <span className="navbar-brand">
            <img src="/images/lhlogo.png" alt="logo" width={210} height={50} />
          </span>

          <Nav className="ms-auto">
            <div
              className="position-relative fw-bold pointer"
              onClick={toogleDrawerHandler}
            >
              <FontAwesomeIcon className="fs-5" icon={faShoppingBasket} />
              <span
                className="position-absolute badge rounded-circle bg-danger small"
                style={{ right: "2.5rem", top: "-.5rem", fontSize: "8px" }}
              >
                {cart_products}
              </span>  Cart
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
