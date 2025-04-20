import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams, useLocation} from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as courseClient from "./client";
import Pazza from "./Pazza"
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const CoursePeople = () => {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
  
    useEffect(() => {
      if (!cid) return;
      const loadUsers = async () => {
        try {
          const data = await courseClient.findUsersForCourse(cid);
          setUsers(data.filter((u: any) => u !== null && u._id));
        } catch (err) {
          console.error(`Failed to load users for course ${cid}:`, err);
        }
      };
      loadUsers();
    }, [cid]);
  
    return <PeopleTable users={users} />;
  };
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      
      <Row>
        <Col md={2} className="d-none d-md-block">
          <CourseNavigation />
        </Col>

        <Col md={8}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            {/* <Route path="Assignments/:aid" element={<AssignmentEditor />} /> */}
            <Route path="Pazza/*" element={<Pazza />} />
            <Route path="People" element={<CoursePeople />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}