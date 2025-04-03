import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import PeopleTable from "./Courses/People/Table";
import "./styles.css";
// import * as db from "./Database";
import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid"
import ProtectedRoute from "./Account/ProtectedRoute";
// import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
export default function Kambaz() {
  // const dispatch = useDispatch();
  // Retrieve courses from Redux store (coursesReducer)
  // const courses = useSelector((state: any) => state.coursesReducer.courses);

  // Local state for the course being created or edited (ephemeral UI state)
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);


  // Handler for adding a new course via Redux
  const addNewCourse = async () => {
    try {
      console.log("🧪 Creating course with:", course); // Debug
      const newCourse = await userClient.createCourse(course);
      console.log("✅ Course created:", newCourse);
      setCourses([...courses, newCourse]);
      setCourse({
        _id: "",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
      });
    } catch (error) {
      console.error("❌ Error creating course:", error);
    }
  };

  // Handler for deleting a course (using Redux action)
  // const deleteCourseHandler = (courseId: string) => {
  //   dispatch(deleteCourse(courseId));
  // };
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    // setCourses(courses.filter((course) => course._id !== courseId));
    if (status === 200) {
      setCourses(courses.filter((course) => course._id !== courseId));
    } else {
      console.error("❌ Failed to delete course:", status);
    }
  };


  // Handler for updating a course via Redux
  // const updateCourseHandler = () => {
  //   dispatch(updateCourse(course));
  // };
  const updateCourse = async () => {
    try {
      const updated = await courseClient.updateCourse(course);
      setCourses(courses.map((c) => c._id === updated._id ? updated : c));
      setCourse({
        _id: "",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
      });
    } catch (error) {
      console.error("❌ Error updating course:", error);
    }
  };


  return (
    <div id="wd-kambaz">
      <KambazNavigation />
        <div  className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<ProtectedRoute>
              <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/> </ProtectedRoute>} />
              
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
    </div>
  );
}