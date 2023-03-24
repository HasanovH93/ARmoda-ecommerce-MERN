import { v4 as uuidv4 } from "uuid";
import cogoToast from "cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      let existingCartItem = null;

      // Find the existing cart item
      state.cartItems.forEach((item) => {
        if (
          item._id === product._id &&
          ((!item.selectedProductColor && !product.selectedProductColor) ||
            (item.selectedProductColor &&
              item.selectedProductColor === product.selectedProductColor)) &&
          ((!item.selectedProductSize && !product.selectedProductSize) ||
            (item.selectedProductSize &&
              item.selectedProductSize === product.selectedProductSize))
        ) {
          existingCartItem = item;
        }
      });

      if (!existingCartItem) {
        // If the cart item does not exist, add it to the cart
        state.cartItems.push({
          ...product,
          quantity: product.quantity ? product.quantity : 1,
          cartItemId: uuidv4(),
        });
      } else {
        // If the cart item exists, update its quantity
        state.cartItems = state.cartItems.map((item) => {
          if (item.cartItemId === existingCartItem.cartItemId) {
            return {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1,
            };
          }
          return item;
        });
      }

      cogoToast.success("Added To Cart", { position: "bottom-left" });
    },
    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload
      );
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    },
    decreaseQuantity(state, action) {
      const product = action.payload;
      if (product.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== product.cartItemId
        );
        cogoToast.error("Removed From Cart", { position: "bottom-left" });
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        cogoToast.warn("Item Decremented From Cart", {
          position: "bottom-left",
        });
      }
    },
    deleteAllFromCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  deleteAllFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
