import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import PeopleTable from "./Courses/People/Table";
import "./styles.css";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
export default function Kambaz() {

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


  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    // if (status === 200) {
    //   setCourses(courses.filter((course) => course._id !== courseId));
    // } else {
    //   console.error("❌ Failed to delete course:", status);
    // }
    setCourses(courses.filter((course) => course._id !== courseId));
  };


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