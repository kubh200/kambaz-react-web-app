import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUser = async (userId: string, courseId: string) => {
    const { data } = await axios.post(`${ENROLLMENTS_API}`, {
      user: userId,
      course: courseId,
    });
    return data;
  };
  
  export const unenrollUser = async (userId: string, courseId: string) => {
    const { data } = await axios.delete(`${ENROLLMENTS_API}`, {
      data: { user: userId, course: courseId },
    });
    return data;
  };

export const fetchUserEnrollments = async (userId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/enrollments`);
  return data;
};
