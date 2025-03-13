import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database"; // Replace or remove if you no longer import from Database
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: courses, // initial courses data from the Database
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        _id: uuidv4(),
        editing: false,
        // Spread the provided course properties (name, number, startDate, etc.)
        ...course,
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? { ...c, ...course, editing: false } : c
      ) as any;
    },
    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      ) as any;
    },
    cancelEditCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: false } : c
      ) as any;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse, cancelEditCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
