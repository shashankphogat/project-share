import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/fbconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/fbconfig";
import { doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCred.user;

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        initials: firstName[0] + lastName[0],
        email,
        createdAt: new Date(),
      });

      // Add notification
      await addDoc(collection(db, "notifications"), {
        content: `Joined the party.`,
        user: `${firstName} ${lastName}`,
        createdAt: new Date().toISOString(),
      });

      return { uid: user.uid, email, firstName, lastName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Get profile from Firestore
      const profileDoc = await getDoc(doc(db, "users", user.uid));
      const profileData = profileDoc.data();
      return { uid: user.uid, email: user.email, ...profileData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
  return null;
});

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        },
      );
  },
});

export default authSlice.reducer;
