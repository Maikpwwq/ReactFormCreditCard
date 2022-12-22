import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./states/people";

export default configureStore({
  reducer: {
    people: peopleSlice,
  },
});
