import React from "react";
import { useContext } from "react";
import { Row, Card, Col } from "react-bootstrap";
import { products } from "../components/endpoint/data";
import { formater, strLength } from "../utils/method/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Mystore } from "../utils/MyStore";
import Drawer from "../components/Drawer";

const Products = () => {
  const { state, dispatch } = useContext(Mystore);
  let cart_products = state.cart.cartItems.length;

  const [toogleDrawer, setToogleDrawer] = React.useState(false);
  const toogleDrawerHandler = () => {
    setToogleDrawer(!toogleDrawer);
  };

  const addToCartHandler = async (data) => {
    const quantity = 1;
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...data, quantity },
    });
  };

  return (
    <>
    <Drawer
        incart={cart_products}
        toogleDrawer={toogleDrawer}
        setToogleDrawer={setToogleDrawer}
      />
      <div className="mb-3">
        <h2>Products</h2>
      </div>
      <Row>
        {products.map((product, index) => {
          return (
            <Col xs={12} sm={6} md={3} key={index} className="mb-3">
              <Card className="h-100">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="p-2"
                  height={200}
                />
                <Card.Body>
                  <h5>{product?.name}</h5>
                  <Card.Text className="small">
                    {strLength(product?.description, 100)}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5">
                      &#8358;{formater(product?.price)}
                    </span>
                    <button
                      className="btn brand-bg-color rm-border py-1 px-2"
                      onClick={() => { addToCartHandler(product); toogleDrawerHandler() }}
                    >
                      <FontAwesomeIcon className="fs-6" icon={faShoppingCart} />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Products;
