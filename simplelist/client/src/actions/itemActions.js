//this is where we make request to backend
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from'./types';

export const getItems = () => {
  return {
    type: GET_ITEMS //this is the action
  };
};
