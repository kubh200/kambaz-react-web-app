import { Link, useNavigate } from "react-router-dom";
import * as db from "./Database";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { FormControl } from "react-bootstrap";
import { enrollCourse, unenrollCourse } from "./enrollmentReducer";
import { Navigate} from "react-router-dom"
interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: Dispatch<SetStateAction<any>>;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard(
  {
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
  }: DashboardProps) 
  {
  // Retrieve current user from Redux accountReducer
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = db;
  const isFaculty = currentUser?.role === "FACULTY";
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch()
  const filteredCourses = showAllCourses
    ? courses // Show all courses
    : courses.filter((course) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id && enrollment.course === course._id
        )
      );
  const handleEnrollmentToggle = (courseId: string) => {
    const isEnrolled = enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  
    if (isEnrolled) {
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId })); // Unenroll the user
    } else {
      dispatch(enrollCourse({ user: currentUser._id, course: courseId })); // Enroll the user
    }
  };
  const navigate = useNavigate();
  const handleCourseNavigation = (courseId: string) => {
    const isEnrolled = enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  
    if (isEnrolled) {
      navigate(`/Kambaz/Courses/${courseId}/Home`); // Navigate without refresh
      // <Navigate to="/Kambaz/Courses/${courseId}/Home" />
    } else {
      alert("You are not enrolled in this course.");
    }
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* Enrollments Button */}
        <Button
          onClick={() => setShowAllCourses(!showAllCourses)}
          style={{ backgroundColor: 'blue', color: 'white', float: 'right' }}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </Button>
      {isFaculty && (<h5>New Course
        <Button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse} > Add </Button>
        <Button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click"> Update </Button>
      </h5>)}<br />
      {isFaculty && (<FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />)}
      {isFaculty && (<FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })}/>)}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses
          // .filter((course: any) =>
          //   enrollments.some(
          //     (enrollment) =>
          //       enrollment.user === currentUser._id &&
          //       enrollment.course === course._id
          //      ))      
          .map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {/* <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" > */}
                <div onClick={() => handleCourseNavigation(course._id)} className="wd-dashboard-course-link text-decoration-none text-dark"
                  style={{ cursor: "pointer" }}> 
                  <Card.Img src="/images/react-js-banner-big-1.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>
                    {/* <Button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
                    </Button>
                    <Button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </Button> */}
                    {isFaculty && (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                        <Button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </Card.Body>
                      {/* </Link> */}
                </div>
                {!isFaculty && (
                  <div className="text-center mb-2">
                    {enrollments.some(
                      (enrollment: any) =>
                        enrollment.user === currentUser._id &&
                        enrollment.course === course._id
                    ) ? (
                      <Button
                        variant="danger"
                        onClick={() => handleEnrollmentToggle(course._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleEnrollmentToggle(course._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
);}

// import { Link } from "react-router-dom";
// import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { addCourse, updateCourse, deleteCourse } from "./Courses/reducer";
// import { enrollCourse, unenrollCourse } from "./enrollmentReducer";

// interface DashboardProps {
//   courses: any[];
//   course: any;
//   setCourse: React.Dispatch<React.SetStateAction<any>>;
//   addNewCourse: () => void;
//   deleteCourse: (courseId: string) => void;
//   updateCourse: () => void;
// }

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: DashboardProps) {
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   // Enrollments state is assumed to be stored as { enrollments: [...] } in enrollmentsReducer
//   const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  
//   // Everyone sees the Enrollments toggle button.
//   const [showAll, setShowAll] = useState(false);

//   // Determine if the current user is enrolled in a given course.
//   const isEnrolled = (courseId: string) =>
//     enrollments.some(
//       (enr: any) => enr.user === currentUser._id && enr.course === courseId
//     );

//   // Enroll/Unenroll handlers (for non-faculty)
//   const handleEnroll = (courseId: string) => {
//     dispatch(enrollCourse({ user: currentUser._id, course: courseId }));
//   };

//   const handleUnenroll = (courseId: string) => {
//     dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
//   };

//   // For non-faculty users, if showAll is false, only show courses they’re enrolled in.
//   const coursesToDisplay =
//     currentUser?.role !== "FACULTY" && !showAll
//       ? courses.filter((c: any) => isEnrolled(c._id))
//       : courses;

//   return (
//     <div id="wd-dashboard">
//       <div style={{ position: "relative" }}>
//         <h1 id="wd-dashboard-title">Dashboard</h1>
//         <Button
//           variant="info"
//           style={{ position: "absolute", right: 0, top: 0 }}
//           onClick={() => setShowAll((prev) => !prev)}
//         >
//           {showAll ? "Show Enrolled Only" : "Show All Courses"}
//         </Button>
//       </div>
//       <hr />
//       {currentUser?.role === "FACULTY" && (
//         <>
//           <h5>
//             New Course
//             <Button
//               className="btn btn-primary float-end"
//               id="wd-add-new-course-click"
//               onClick={addNewCourse}
//             >
//               Add
//             </Button>
//             <Button
//               className="btn btn-warning float-end me-2"
//               id="wd-update-course-click"
//               onClick={updateCourse}
//             >
//               Update
//             </Button>
//           </h5>
//           <br />
//           <FormControl
//             value={course.name}
//             className="mb-2"
//             placeholder="Course Name"
//             onChange={(e) =>
//               setCourse({ ...course, name: e.target.value })
//             }
//           />
//           <FormControl
//             as="textarea"
//             value={course.description}
//             rows={3}
//             placeholder="Course Description"
//             onChange={(e) =>
//               setCourse({ ...course, description: e.target.value })
//             }
//           />
//         </>
//       )}
//       <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({coursesToDisplay.length})
//       </h2>
//       <hr />
//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {coursesToDisplay.map((c: any) => (
//             <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
//               <Card>
//                 <Link
//                   to={`/Kambaz/Courses/${c._id}/Home`}
//                   className="wd-dashboard-course-link text-decoration-none text-dark"
//                 >
//                   <Card.Img
//                     src="/images/react-js-banner-big-1.jpg"
//                     variant="top"
//                     width="100%"
//                     height={160}
//                   />
//                   <Card.Body className="card-body">
//                     <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                       {c.name}
//                     </Card.Title>
//                     <Card.Text
//                       className="wd-dashboard-course-description overflow-hidden"
//                       style={{ height: "100px" }}
//                     >
//                       {c.description}
//                     </Card.Text>
//                     <Button variant="primary">Go</Button>
//                   </Card.Body>
//                 </Link>
//                 {/* Enroll/Unenroll buttons for all users */}
//                 <div className="p-2">
//                   {isEnrolled(c._id) ? (
//                     <Button variant="danger" onClick={() => handleUnenroll(c._id)}>
//                       Unenroll
//                     </Button>
//                   ) : (
//                     <Button variant="success" onClick={() => handleEnroll(c._id)}>
//                       Enroll
//                     </Button>
//                   )}
//                 </div>
//                 {/* Faculty-only controls */}
//                 {currentUser?.role === "FACULTY" && (
//                   <div className="ms-auto d-flex align-items-center flex-shrink-0">
//                     <Button
//                       onClick={(event) => {
//                         event.preventDefault();
//                         deleteCourse(c._id);
//                       }}
//                       className="btn btn-danger float-end"
//                       id="wd-delete-course-click"
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       id="wd-edit-course-click"
//                       onClick={(event) => {
//                         event.preventDefault();
//                         setCourse(c);
//                       }}
//                       className="btn btn-warning me-2 float-end"
//                     >
//                       Edit
//                     </Button>
//                   </div>
//                 )}
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// }
