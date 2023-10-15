"use client";
import { createContext, useContext, useReducer } from "react";
import { TOOGLE_NAVBAR } from "./actions.js";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import reducer from "./reducer.js";

const AppContext = createContext();

const initialState = {
  userData: {},
  isUserDataSet: false,
  navBarIsOpen: false,
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

  //   const getUserData = async () => {
  //     const userStore = localStorage.getItem("user");
  //     const uid = JSON.parse(userStore).uid;
  //     try {
  //       onSnapshot(doc(db, "Users", uid), (doc) => {
  //         if (doc.metadata.fromCache) {
  //           Notification.displayInfo({
  //             message: "Error",
  //             description: "No Internet Connection, Refresh Page!",
  //           });
  //           return;
  //         }
  //         if (!doc.data()) {
  //           Notification.displayInfo({
  //             message: "Error",
  //             description: "Something went wrong somewhere, Please try again!",
  //           });
  //         } else {
  //           console.log("Current data: ", doc.data());
  //           dispatch({
  //             type: SET_USER_DATA,
  //             payload: {
  //               userData: doc.data(),
  //             },
  //           });
  //           dispatch({
  //             type: SET_USER_DATA_STATE,
  //             payload: {
  //               isUserDataSet: true,
  //             },
  //           });
  //         }
  //       });
  //     } catch (e) {
  //       Notification.displayInfo({
  //         message: "Error",
  //         description: e.code || e.message,
  //       });
  //     }
  //   };

  //   const updateUserData = async (data) => {
  //     try {
  //       const res = await setDoc(doc(userCollectionRef, state.userData.id), data);
  //       return res;
  //     } catch (e) {
  //       Notification.displayInfo({
  //         message: "Error",
  //         description: e.code || e.message,
  //       });
  //       return e;
  //     }
  //   };

  return (
    <AppContext.Provider
      value={{
        ...state,
        toogleNavBar,
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
