import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Mystore = createContext();

let mycartItem;

const validate = () => {
  try {
    return (mycartItem = JSON.parse(Cookies.get("cartItems")));
  } catch (ex) {
    return ex.response;
  }
};

const initialState = {
  cart: {
    cartItems: Cookies.get("cartItems")
      ? validate() === undefined
        ? []
        : mycartItem
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;

      const isExist = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      const cartItems = !isExist
        ? [...state.cart.cartItems, newItem]
        : [...state.cart.cartItems];

      Cookies.set("cartItems", JSON.stringify(cartItems), {
        sameSite: "strict",
        secure: true,
      });
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "REMOVE_CART_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "INCREASE_PRODUCT_QUANTITY": {

      const cartItem = state.cart.cartItems.find(
        (item) => item.id === action.payload.id
      );

      Cookies.set("cartItems", JSON.stringify([...state.cart.cartItems]));
      return { ...state, cart: { ...state.cart, cartItem } };
    }

    case "DECREASE_PRODUCT_QUANTITY": {
      const cartItem = state.cart.cartItems.find(
        (item) => item.id === action.payload.id
      );

      Cookies.set("cartItems", JSON.stringify([...state.cart.cartItems]));
      return { ...state, cart: { ...state.cart, cartItem } };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Mystore.Provider value={value}>{props.children}</Mystore.Provider>;
}
