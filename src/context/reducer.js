import { TOOGLE_NAVBAR } from "./actions";

const reducer = (state, action) => {
  if (action.type === TOOGLE_NAVBAR) {
    return {
      ...state,
      navBarIsOpen: action.payload.navBarIsOpen,
    };
  }
  return state;
};

export default reducer;
