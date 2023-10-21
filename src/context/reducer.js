import { TOOGLE_NAVBAR,SET_USER_DATA, SET_USER_DATA_STATE,SET_GENERATED_PRIVATE_KEY,
  SET_GENERATED_TAX_KEY,
  SET_GENERATED_GAS_KEY, SET_TRANSACTION_DATA, SET_PRIVATE_KEY_IS_LOADING } from "./actions";

const reducer = (state, action) => {
  if (action.type === TOOGLE_NAVBAR) {
    return {
      ...state,
      navBarIsOpen: action.payload.navBarIsOpen,
    };
  }
  if (action.type === SET_USER_DATA) {
    return {
      ...state,
      userData: action.payload.userData,
    };
  }
  if (action.type === SET_USER_DATA_STATE) {
    return {
      ...state,
      isUserDataSet: action.payload.isUserDataSet,
    };
  }
  if (action.type === SET_GENERATED_PRIVATE_KEY) {
    return {
      ...state,
      generatePrivateKey: action.payload.generatePrivateKey,
    };
  }
  if (action.type === SET_GENERATED_TAX_KEY) {
    return {
      ...state,
      generateTaxKey: action.payload.generateTaxKey,
    };
  }
  if (action.type === SET_GENERATED_GAS_KEY) {
    return {
      ...state,
      generateGasKey: action.payload.generateGasKey,
    };
  }
  if (action.type === SET_TRANSACTION_DATA) {
    return {
      ...state,
      transactionData: action.payload.transactionData,
    };
  }
  if (action.type === SET_PRIVATE_KEY_IS_LOADING) {
    return {
      ...state,
      privateKeyValidateIsLoading: action.payload.privateKeyValidateIsLoading,
    };
  }
  return state;
};

export default reducer;
