import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "./slices/authListenerSlice";
import { auth } from "./config/fbconfig";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "./config/fbconfig";

export const setupAuthListener = (store) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = (await getDoc(doc(db, "users", user.uid))).data();
      store.dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        }),
      );
    } else {
      store.dispatch(clearUser());
    }
  });
};
