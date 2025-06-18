import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/fbconfig";
import { addDoc } from "firebase/firestore";

export const fetchProjects = createAsyncThunk("fetchprojects", async () => {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return error.message;
  }
});

export const addProject = createAsyncThunk("addProject", async (newProject) => {
  const createdAt = new Date().toISOString();
  const newProjectWithTimeStamp = {
    ...newProject,
    createdAt,
  };
  const docRef = await addDoc(
    collection(db, "projects"),
    newProjectWithTimeStamp,
  );

  // Add notification
  await addDoc(collection(db, "notifications"), {
    content: `Added a new project.`,
    user: newProjectWithTimeStamp.author,
    createdAt: new Date().toISOString(),
  });

  return { id: docRef.id, ...newProjectWithTimeStamp };
});

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
