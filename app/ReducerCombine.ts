import { combineReducers } from "@reduxjs/toolkit";
import FilterUserSliceRedcer from './Reducers/FilterUsers';
import FilterBlogSliceRedcer from './Reducers/FilterBlog';
// here we combine the multiple reducers
export const reducer = combineReducers({
  filteruser : FilterUserSliceRedcer,
  filterBlogs :  FilterBlogSliceRedcer,
});