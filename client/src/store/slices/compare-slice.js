import cogoToast from "cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compareItems: [],
  },
  reducers: {
    addToCompare(state, action) {
      const existingItemIndex = state.compareItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex === -1) {
        state.compareItems.push(action.payload);
        cogoToast.success("Added To compare", { position: "bottom-left" });
      } else {
        cogoToast.warn("Item already in compare list", {
          position: "bottom-left",
        });
      }
    },
    deleteFromCompare(state, action) {
      console.log(action.payload);
      state.compareItems = state.compareItems.filter(
        (item) => item._id !== action.payload
      );
      cogoToast.error("Removed From Compare", { position: "bottom-left" });
    },
  },
});

export const { addToCompare, deleteFromCompare } = compareSlice.actions;
export default compareSlice.reducer;
