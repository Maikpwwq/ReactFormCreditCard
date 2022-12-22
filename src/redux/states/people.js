import { getLocalStorage, setLocalStorage } from "../../utilities";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
  holderName: "",
  cardNumber: "",
  validThru: "",
  cvv: "",
};

export const peopleSlice = createSlice({
  name: "people",
  initialState: getLocalStorage("people")
    ? JSON.parse(getLocalStorage("people"))
    : initialState,
  reducers: {
    addPeople: (state, action) => {
      if (!Array.isArray(current(state))) {
        const snapCard = [{ ...action.payload }];       
        setLocalStorage("people", snapCard);
        return snapCard;
      }
      const arrayCards = [];
      current(state).map((x) => arrayCards.push(x));
      arrayCards.push(action.payload);
      setLocalStorage("people", arrayCards);
      return arrayCards;
    },
  },
});

export const { addPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
