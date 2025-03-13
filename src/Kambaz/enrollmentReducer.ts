import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database"; // Assumes enrollments data is exported from here
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments, // initial enrollment data from the Database
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Action to enroll a user in a course.
    // Expects a payload with at least: { user: string, course: string }
    enrollCourse: (state, { payload: enrollment }) => {
      // Only add if the user is not already enrolled in that course
      if (
        !state.enrollments.some(
          (enr: any) =>
            enr.user === enrollment.user && enr.course === enrollment.course
        )
      ) {
        state.enrollments.push({
          _id: uuidv4(),
          ...enrollment,
        });
      }
    },
    // Action to unenroll a user from a course.
    // Expects payload: { user: string, course: string }
    unenrollCourse: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (enr: any) => !(enr.user === enrollment.user && enr.course === enrollment.course)
      );
    },
    // Optionally, you can update an enrollment if needed
    updateEnrollment: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.map((enr: any) =>
        enr._id === enrollment._id ? { ...enrollment } : enr
      );
    },
  },
});

export const { enrollCourse, unenrollCourse, updateEnrollment } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
