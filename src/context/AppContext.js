"use client";
import { createContext, useContext, useReducer } from "react";
import {
  TOOGLE_NAVBAR,
  SET_USER_DATA,
  SET_USER_DATA_STATE,
  SET_GENERATED_PRIVATE_KEY,
  SET_GENERATED_TAX_KEY,
  SET_GENERATED_GAS_KEY,
  SET_TRANSACTION_DATA,
  SET_PRIVATE_KEY_IS_LOADING,
} from "./actions.js";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Notification from "../components/Notification";
import reducer from "./reducer.js";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";
const userCollectionRef = collection(db, "Users");
const transactionCollectionRef = collection(db, "Transactions");

const AppContext = createContext();

const initialState = {
  userData: {},
  isUserDataSet: false,
  navBarIsOpen: false,
  generatePrivateKey: "",
  generateTaxKey: "",
  generateGasKey: "",
  transactionData: {},
  transactionStep: 1,
  privateKeyValidateIsLoading: false,
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  const pathname = usePathname();

  const toogleNavBar = () => {
    if (pathname.includes("admin")) {
      dispatch({
        type: TOOGLE_NAVBAR,
        payload: {
          navBarIsOpen: !state.navBarIsOpen,
        },
      });
    }
  };

  const getUserData = async () => {
    try {
      const userStore = localStorage.getItem("user");
      if (!userStore) {
        throw new Error("No User Found");
      }
      const uid = JSON.parse(userStore)?.uid;
      onSnapshot(doc(db, "Users", uid), (doc) => {
        if (doc.metadata.fromCache) {
          Notification.displayInfo({
            message: "Error",
            description: "No Internet Connection, Refresh Page!",
          });
          return;
        }
        if (!doc.data()) {
          Notification.displayInfo({
            message: "Error",
            description: "Something went wrong somewhere, Please try again!",
          });
        } else {
          console.log(doc.data());
          dispatch({
            type: SET_USER_DATA,
            payload: {
              userData: doc.data(),
            },
          });
          dispatch({
            type: SET_USER_DATA_STATE,
            payload: {
              isUserDataSet: true,
            },
          });
        }
      });
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      if (e.message === "No User Found") {
        router.replace("/auth");
      }
    }
  };

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const checkIfKeyAlreadyExist = (arr, key) => {
    const keys = arr.filter((keyObj) => {
      return keyObj.value === key;
    });

    if (keys.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  const generatePrivateCode = () => {
    let number = `PRIVATE${generateString(3).toUpperCase()}`;
    for (let i = 0; i <= 9; i++) {
      let random = Math.floor(Math.random() * 10);
      number += random.toString();
    }
    let ifKeyExists = checkIfKeyAlreadyExist(
      state?.userData?.private_keys,
      number
    );
    if (ifKeyExists) {
      generatePrivateCode();
    } else {
      dispatch({
        type: SET_GENERATED_PRIVATE_KEY,
        payload: {
          generatePrivateKey: number,
        },
      });
      return number;
    }
  };

  const createPrivateKeys = async () => {
    try {
      if (state.userData.id) {
        const newKey = generatePrivateCode();
        const uid = state.userData.id;

        let oldPrivateKeys = state?.userData?.private_keys;
        oldPrivateKeys.push({
          createdAt: new Date(),
          key: newKey,
          userId: uid,
          status: false,
        });

        const updateUserRes = await updateUserData({
          ...state.userData,
          private_keys: oldPrivateKeys,
        });
        if (updateUserRes === "success") {
          Notification.displayInfo({
            message: "Success",
            description: "Code generated Successfully",
          });
        }
      } else {
        throw new Error("Please try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  const deleteUserPrivateKey = async (key) => {
    try {
      if (state.userData.id) {
        let oldPrivateKeys = state?.userData?.private_keys;
        let arrWithoutDeletedKey = oldPrivateKeys.filter((keyObj) => {
          return keyObj.key !== key;
        });

        const updateUserRes = await updateUserData({
          ...state.userData,
          private_keys: arrWithoutDeletedKey,
        });
        if (updateUserRes === "success") {
          Notification.displayInfo({
            message: "Success",
            description: "Code Deleted Successfully",
          });
        }
      } else {
        throw new Error("Please try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  //gass

  const generateGasCode = () => {
    let number = `GAS${generateString(3).toUpperCase()}`;
    for (let i = 0; i <= 9; i++) {
      let random = Math.floor(Math.random() * 10);
      number += random.toString();
    }
    let ifKeyExists = checkIfKeyAlreadyExist(
      state?.userData?.gas_codes,
      number
    );
    if (ifKeyExists) {
      generateGasCode();
    } else {
      dispatch({
        type: SET_GENERATED_GAS_KEY,
        payload: {
          generateGasKey: number,
        },
      });
      return number;
    }
  };

  const createGasKeys = async () => {
    try {
      if (state.userData.id) {
        const newKey = generateGasCode();
        const uid = state.userData.id;

        let oldPrivateKeys = state?.userData?.gas_codes;
        oldPrivateKeys.push({
          createdAt: new Date(),
          key: newKey,
          userId: uid,
          status: false,
        });

        const updateUserRes = await updateUserData({
          ...state.userData,
          gas_codes: oldPrivateKeys,
        });
        if (updateUserRes === "success") {
          Notification.displayInfo({
            message: "Success",
            description: "Code generated Successfully",
          });
        }
      } else {
        throw new Error("Please try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  const deleteUserGasKey = async (key) => {
    try {
      if (state.userData.id) {
        let oldGasKeys = state?.userData?.gas_codes;
        let arrWithoutDeletedKey = oldGasKeys.filter((keyObj) => {
          return keyObj.key !== key;
        });

        const updateUserRes = await updateUserData({
          ...state.userData,
          gas_codes: arrWithoutDeletedKey,
        });
        if (updateUserRes === "success") {
          Notification.displayInfo({
            message: "Success",
            description: "Code Deleted Successfully",
          });
        }
      } else {
        throw new Error("Please try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  //taxxxxxx

  const generateTaxCode = () => {
    let number = `TAX${generateString(3).toUpperCase()}`;
    for (let i = 0; i <= 9; i++) {
      let random = Math.floor(Math.random() * 10);
      number += random.toString();
    }
    let ifKeyExists = checkIfKeyAlreadyExist(
      state?.userData?.tax_codes,
      number
    );
    if (ifKeyExists) {
      generateTaxCode();
    } else {
      dispatch({
        type: SET_GENERATED_TAX_KEY,
        payload: {
          generateTaxKey: number,
        },
      });
      return number;
    }
  };

  const createTaxKeys = async () => {
    try {
      if (state.userData.id) {
        const newKey = generateTaxCode();
        const uid = state.userData.id;

        let oldTaxKeys = state?.userData?.tax_codes;
        oldTaxKeys.push({
          createdAt: new Date(),
          key: newKey,
          userId: uid,
          status: false,
        });

        const updateUserRes = await updateUserData({
          ...state.userData,
          tax_codes: oldTaxKeys,
        });
        if (updateUserRes === "success") {
          Notification.displayInfo({
            message: "Success",
            description: "Code generated Successfully",
          });
        }
      } else {
        throw new Error("Please try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  const deleteUserTaxKey = async (key) => {
    try {
      if (state.userData.id) {
        let oldTaxKeys = state?.userData?.tax_codes;
        let arrWithoutDeletedKey = oldTaxKeys.filter((keyObj) => {
          return keyObj.key !== key;
        });

        const updateUserRes = await updateUserData({
          ...state.userData,
          tax_codes: arrWithoutDeletedKey,
        });
        if (updateUserRes === "success") {
          Notification.displayInfo({
            message: "Success",
            description: "Code Deleted Successfully",
          });
        }
      } else {
        throw new Error("Please try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
    }
  };

  const createTransaction = async (value, tnx_id) => {
    try {
      const res = await setDoc(doc(transactionCollectionRef, tnx_id), {
        id: tnx_id,
        step: 1,
        userId: state.userData.id,
        ...value,
      });
      return "success";
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };

  const updateUserData = async (data) => {
    try {
      const res = await setDoc(doc(userCollectionRef, state.userData.id), data);
      return "success";
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };
  const updateTransactionData = async (data) => {
    try {
      const res = await setDoc(
        doc(transactionCollectionRef, state.transactionData.id),
        data
      );
      return "success";
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };

  const getTransaction = async (id) => {
    try {
      onSnapshot(doc(db, "Transactions", id), (Sdoc) => {
        if (Sdoc.metadata.fromCache) {
          Notification.displayInfo({
            message: "Error",
            description: "No Internet Connection, Refresh Page!",
          });
          return;
        }
        if (!Sdoc.data()) {
          Notification.displayInfo({
            message: "Error",
            description: "Something went wrong somewhere, Please try again!",
          });
        } else {
          dispatch({
            type: SET_TRANSACTION_DATA,
            payload: {
              transactionData: Sdoc.data(),
            },
          });

          onSnapshot(doc(db, "Users", Sdoc.data()?.userId), (Tdoc) => {
            if (Tdoc.metadata.fromCache) {
              Notification.displayInfo({
                message: "Error",
                description: "No Internet Connection, Refresh Page!",
              });
              return;
            }
            if (!Tdoc.data()) {
              Notification.displayInfo({
                message: "Error",
                description:
                  "Something went wrong somewhere, Please try again!",
              });
            } else {
              dispatch({
                type: SET_USER_DATA,
                payload: {
                  userData: Tdoc.data(),
                },
              });
              dispatch({
                type: SET_USER_DATA_STATE,
                payload: {
                  isUserDataSet: true,
                },
              });
            }
          });
        }
      });
    } catch (e) {
      return e;
    }
  };

  const runPrivateKeyLoader = (bool) => {
    if (bool) {
      localStorage.setItem("validationStep", true);
    } else {
      localStorage.removeItem("validationStep");
    }

    dispatch({
      type: SET_PRIVATE_KEY_IS_LOADING,
      payload: {
        privateKeyValidateIsLoading: bool,
      },
    });
  };

  const ValidatePrivateKey = async (key) => {
    try {
      console.log(state.userData);
      if (state.userData.id) {
        const uid = state.userData.id;

        let oldPrivateKeys = state?.userData?.private_keys;
        let currentPrivateKey = oldPrivateKeys.filter((keyObj) => {
          return keyObj.key === key;
        });
        let arrWithoutKey = oldPrivateKeys.filter((keyObj) => {
          return keyObj.key !== key;
        });

        if (currentPrivateKey.length === 0) {
          throw new Error("Invalid Private Key!");
        } else if (currentPrivateKey[0].status === true) {
          throw new Error("Key Has Already Been Used!");
        } else {
          let realKeyObj = currentPrivateKey[0];
          arrWithoutKey.push({
            ...realKeyObj,
            status: true,
          });
          localStorage.setItem("validationStep", true);
          runPrivateKeyLoader(true);
          const updateUserRes = await updateUserData({
            ...state.userData,
            private_keys: arrWithoutKey,
          });
        }
      } else {
        throw new Error("Please refresh and try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };
  const ValidateGasFee = async (key) => {
    try {
      if (state.userData.id) {
        const uid = state.userData.id;

        let oldGasCode = state?.userData?.gas_codes;
        let currentGasFee = oldGasCode.filter((keyObj) => {
          return keyObj.key === key;
        });
        let arrWithoutKey = oldGasCode.filter((keyObj) => {
          return keyObj.key !== key;
        });

        if (currentGasFee.length === 0) {
          throw new Error("Invalid Gas Code!");
        } else if (currentGasFee[0].status === true) {
          throw new Error("Code Has Already Been Used!");
        } else {
          let realKeyObj = currentGasFee[0];
          arrWithoutKey.push({
            ...realKeyObj,
            status: true,
          });
          localStorage.setItem("validationStep", true);
          runPrivateKeyLoader(true);
          const updateUserRes = await updateUserData({
            ...state.userData,
            gas_codes: arrWithoutKey,
          });
        }
      } else {
        throw new Error("Please refresh and try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };
  const ValidateTaxFee = async (key) => {
    try {
      if (state.userData.id) {
        const uid = state.userData.id;

        let oldTaxCode = state?.userData?.tax_codes;
        let currentTaxFee = oldTaxCode.filter((keyObj) => {
          return keyObj.key === key;
        });
        let arrWithoutKey = oldTaxCode.filter((keyObj) => {
          return keyObj.key !== key;
        });

        if (currentTaxFee.length === 0) {
          throw new Error("Invalid Tax Code!");
        } else if (currentTaxFee[0].status === true) {
          throw new Error("Code Has Already Been Used!");
        } else {
          let realKeyObj = currentTaxFee[0];
          arrWithoutKey.push({
            ...realKeyObj,
            status: true,
          });
          localStorage.setItem("validationStep", true);
          runPrivateKeyLoader(true);
          const updateUserRes = await updateUserData({
            ...state.userData,
            tax_codes: arrWithoutKey,
          });
        }
      } else {
        throw new Error("Please refresh and try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };
  const finishStep = async () => {
    try {
      if (state.userData.id) {
        const updateTransactionRes = await updateTransactionData({
          ...state.transactionData,
          step: state.transactionData.step + 1,
        });
        runPrivateKeyLoader(false);
      } else {
        throw new Error("Please refresh and try again!");
      }
    } catch (e) {
      Notification.displayInfo({
        message: "Error",
        description: e.code || e.message,
      });
      return e;
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toogleNavBar,
        getUserData,
        createPrivateKeys,
        deleteUserPrivateKey,
        createGasKeys,
        deleteUserGasKey,
        generateTaxCode,
        createTaxKeys,
        deleteUserTaxKey,
        createTransaction,
        getTransaction,
        ValidatePrivateKey,
        ValidateGasFee,
        ValidateTaxFee,
        runPrivateKeyLoader,
        finishStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, initialState, useAppContext, ContextProvider };
