//this is where we make request to backend
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from'./types';
import axios from 'axios';

export const getItems = () => {
  return {
    type: GET_ITEMS //this is the action
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM, //this is the action
    payload: id
  };
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM, //this is the action
    payload: item
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
