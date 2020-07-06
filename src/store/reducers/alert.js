import { SET_ALERT, REMOVE_ALERT } from "../types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, alert } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, alert];
    case REMOVE_ALERT:
      return state.filter((alrt) => alrt.id !== alert);
    default:
      return state;
  }
}
