// client.ts
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";

/**
 * Fetch assignments for a specific course
 */
export const fetchAssignments = async (courseId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
  return data;
};

/**
 * Create a new assignment for a specific course
 */
export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`, assignment);
  return data;
};

/**
 * Update an existing assignment by ID
 */
export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${REMOTE_SERVER}/api/assignments/${assignment._id}`, assignment);
  return data;
};

/**
 * Delete an assignment by ID
 */
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${REMOTE_SERVER}/api/assignments/${assignmentId}`);
  return data;
};
