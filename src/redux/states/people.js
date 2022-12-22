import { getLocalStorage, setLocalStorage } from "../../utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    holderName: "",
    cardNumber: "",
    validThru: "",
    cvv: "",
  },
];

export const peopleSlice = createSlice({
  name: "people",
  initialState: getLocalStorage("people")
    ? JSON.parse(getLocalStorage("people"))
    : initialState,
  reducers: {
    addPeople: (state, action) => {
      let local = [];
      local.push(getLocalStorage("people"));
      local.push(action.payload);
      setLocalStorage("people", local);
      return action.payload;
    },
  },
});

export const { addPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
