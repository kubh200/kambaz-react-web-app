import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import PeopleTable from "./Courses/People/Table";
import "./styles.css";
// import * as db from "./Database";
import { useState } from "react";
// import { v4 as uuidv4 } from "uuid"
import ProtectedRoute from "./Account/ProtectedRoute";
import { addCourse, deleteCourse, updateCourse } from "./Courses/reducer";
import { useDispatch, useSelector } from "react-redux";
export default function Kambaz() {
  // const [courses, setCourses] = useState<any[]>(db.courses);
  // const [course, setCourse] = useState<any>({
  //   _id: "1234", name: "New Course", number: "New Number",
  //   startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  // });
  // const addNewCourse = () => {
  //   setCourses([...courses, { ...course, _id: uuidv4() }]);
  // };
  // const deleteCourse = (courseId: any) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };
  // const updateCourse = () => {
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };
  const dispatch = useDispatch();
  // Retrieve courses from Redux store (coursesReducer)
  const courses = useSelector((state: any) => state.coursesReducer.courses);

  // Local state for the course being created or edited (ephemeral UI state)
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  // Handler for adding a new course via Redux
  const addNewCourse = () => {
    dispatch(addCourse(course));
    // Optionally reset the local course state to blank values for a new course
    setCourse({
      _id: "1234",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      description: "New Description",
    });
  };

  // Handler for deleting a course (using Redux action)
  const deleteCourseHandler = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  // Handler for updating a course via Redux
  const updateCourseHandler = () => {
    dispatch(updateCourse(course));
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
              deleteCourse={deleteCourseHandler}
              updateCourse={updateCourseHandler}/> </ProtectedRoute>} />
              
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
    </div>
  );
}
