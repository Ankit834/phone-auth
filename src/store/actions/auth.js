import { LOGIN_SUCCESS, LOGOUT, LOAD_USER } from "../types";
import firebase, { database } from "../../firebase";
import { setAlert } from "./alert";

export const CheckUserByPhone = async (phoneNumber) => {
  const snapshot = await database
    .collection("users")
    .where("phone", "==", phoneNumber)
    .get();
  if (snapshot.docs.length) {
    return true;
  } else {
    return false;
  }
};

export const RegisterUser = (userData) => (dispatch) => {
  database
    .collection("users")
    .add(userData)
    .then((data) => {
      const docRef = data.id;
      dispatch(setAlert("Registered Successfully", "success"));
      dispatch({
        type: LOGIN_SUCCESS,
        data: { ...userData, docRef },
      });
    });
};

export const LoadUser = (phoneNumber) => async (dispatch) => {
  const query = await database
    .collection("users")
    .where("phone", "==", phoneNumber)
    .get();

  if (query.docs[0]) {
    const snapshot = query.docs[0];
    const docRef = query.docs[0].id;
    const userData = { ...snapshot.data(), docRef };
    userData.lastSignIn = userData.lastSignIn.toDate();
    dispatch({
      type: LOAD_USER,
      data: userData,
    });
  }
};

export const logoutUser = (docRef) => async (dispatch) => {
  var userRef = database.collection("users").doc(docRef);
  await userRef
    .update({
      lastSignIn: new Date(),
    })
    .then(() => {
      console.log("Updated last Sign In");
    });
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT,
      });
    })
    .catch((error) => {
      dispatch(setAlert("Logout Failed", "danger"));
    });
};
