// import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";
// import { v4 as uuidv4 } from "uuid";
// const initialState = {
//     assignments: assignments,
// };
// const assignmentsSlice = createSlice({
//   name: "assignments",
//   initialState,
//   reducers: {
//     addAssignment: (state, { payload: assignment }) => {
//       const newassignment: any = {
//         _id: uuidv4(),
//         lessons: [],
//         title: assignment.title,
//         course: assignment.course,
//         description: assignment.description,
//         points: assignment.points,
//         dueDate: assignment.dueDate,
//         availableFrom: assignment.availableFrom,
//         availableUntil: assignment.availableUntil,
//       };
//       state.assignments = [...state.assignments, newassignment] as any;
//     },
//     deleteAssignment: (state, { payload: assignmentId }) => {
//       state.assignments = state.assignments.filter(
//         (m: any) => m._id !== assignmentId);
//     },
//     updateAssignment: (state, { payload: assignment }) => {
//       state.assignments = state.assignments.map((m: any) =>
//         m._id === assignment._id ? assignment : m
//       ) as any;
//     },
//     editAssignment: (state, { payload: assignmentId }) => {
//       state.assignments = state.assignments.map((m: any) =>
//         m._id === assignmentId ? { ...m, editing: true } : m
//       ) as any;
//     },
//   },
// });
// export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
// assignmentsSlice.actions;
// export default assignmentsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
  editing?: boolean;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // ✅ SET all assignments (after fetching from server)
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },

    // ✅ ADD a new assignment
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },

    // ✅ UPDATE an existing assignment
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },

    // ✅ DELETE an assignment by ID
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },

    // ✅ Toggle edit mode on an assignment
    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload
          ? { ...assignment, editing: true }
          : assignment
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
