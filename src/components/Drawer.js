import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Mystore } from "../utils/MyStore";
import { formater } from "../utils/method/functions";

const Drawer = ({ incart, toogleDrawer, setToogleDrawer }) => {
  const { state, dispatch } = useContext(Mystore);
  let products = state.cart.cartItems;

  let total = 0

  const removeItemHanlder = async (data) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: data,
    });
  }; 

  const incrementHanlder = (product) => {
    product.quantity += 1
    dispatch({
      type: "INCREASE_PRODUCT_QUANTITY",
      payload:  product,
    });
  };

  const decrementHandler = (product) => {
    if(product.quantity < 2) return
    product.quantity -= 1
    dispatch({
      type: "DECREASE_PRODUCT_QUANTITY",
      payload:  product,
    });
  };

  return (
    <>
      <div
        className={`drawer ${toogleDrawer ? "draw-active" : "draw-inactive"}`}
      >
        <div className="draw-content bg-white px-3 py-4">
          <div className="d-flex justify-content-between align-items-center ">
            <span className="fw-bold fs-5">Your cart ({incart})</span>
            <FontAwesomeIcon
              className="fs-3"
              icon={faRemove}
              onClick={() => setToogleDrawer(false)}
            />
          </div>

          <div className="mt-4">
            {products.length > 0
              ? products.map((product, index) => {

                const subtotal =  product?.quantity * product?.price

                total += subtotal 
                return(
                  <figure
                    key={index}
                    className="d-flex justify-content-between"
                  >
                    <div className="d-flex flex-col gap-3">
                      <img
                        src={product?.image}
                        className="border img-sm rounded"
                        alt={product?.name}
                        width={80}
                      />
                      <div>
                        <p className="m-0 p-0"> {product?.name}</p>
                        <span className="text-muted">{product?.quantity} x &#8358;{ formater(product?.price)} </span> <br />
                        <strong className="price"> &#8358;{ formater(`${subtotal}`) }  </strong>
                      </div>
                    </div>

                    <div>
                      <button
                        className="counter-button"
                        onClick={() =>
                          decrementHandler(product)
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="counter">{product?.quantity}</span>
                      <button className="counter-button">
                        <FontAwesomeIcon
                          icon={faPlus}
                          onClick={() =>
                            incrementHanlder(product)
                          }
                        />
                      </button>
                    </div>

                    <div>
                      <FontAwesomeIcon
                        className="pointer text-danger"
                        icon={faTrash}
                        onClick={() => removeItemHanlder(product)}
                      />
                    </div>
                  </figure>
                )})
              : "No items in cart"}
          </div>
          <div className="py-3">
            <hr />
          </div>

          <div className="text-center">
            <span className="text-danger fs-5 fw-bold">Total: &#8358;{formater(total)}</span>

            <button className="btn btn-success w-100 mt-3 py-2">Checkout</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
