import { LOGIN_SUCCESS, LOGOUT, LOAD_USER } from "../types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case LOAD_USER:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: data,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
