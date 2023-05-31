import { combineReducers } from "@reduxjs/toolkit";
import FilterUserSliceRedcer from './Reducers/FilterUsers';
// here we combine the multiple reducers
export const reducer = combineReducers({
  filteruser : FilterUserSliceRedcer
});