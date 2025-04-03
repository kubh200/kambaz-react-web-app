import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },

    enrollCourse: (state, action: PayloadAction<Enrollment>) => {
      const alreadyEnrolled = state.enrollments.some(
        (e) =>
          e.user === action.payload.user && e.course === action.payload.course
      );
    
      if (!alreadyEnrolled) {
        const { user, course } = action.payload;
        const newEnrollment: Enrollment = {
          _id: action.payload._id ?? uuidv4(), 
          user,
          course,
        };
        state.enrollments.push(newEnrollment);
      }
    },

    unenrollCourse: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(e.user === action.payload.user && e.course === action.payload.course)
      );
    },

    updateEnrollment: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.map((e) =>
        e._id === action.payload._id ? { ...action.payload } : e
      );
    },
  },
});

export const {
  setEnrollments,
  enrollCourse,
  unenrollCourse,
  updateEnrollment,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
