import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector} from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { FormControl } from "react-bootstrap";
// import {
//   setEnrollments,
//   enrollCourse,
//   unenrollCourse,
// } from "./enrollmentReducer";
// import * as enrollmentClient from "./EnrollmentsClient";

interface DashboardProps {
  courses: any[];
  course: any;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  setCourse: Dispatch<SetStateAction<any>>;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard(
  {
    courses,
    course,
    enrolling,
    setEnrolling,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    updateEnrollment
  }: DashboardProps) 
  {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  // const [showAllCourses, setShowAllCourses] = useState(false);
  // const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   const fetchEnrollments = async () => {
  //     try {
  //       const data = await enrollmentClient.fetchUserEnrollments(currentUser._id); // ✅ call backend
  //       dispatch(setEnrollments(data)); // ✅ set in Redux
  //     } catch (error) {
  //       console.error("❌ Failed to load enrollments:", error);
  //     }
  //   };
  
  //   if (currentUser?._id) {
  //     fetchEnrollments();
  //   }
  // }, [currentUser, dispatch]);

  // const filteredCourses = showAllCourses
  // ? courses
  // : courses.filter((course) =>
  //     enrollments.some(
  //       (enrollment: any) =>
  //         enrollment.user === currentUser._id && enrollment.course === course._id
  //     )
  //   );
  
  // const filteredCourses = courses;
  // const handleEnrollmentToggle = (courseId: string) => {
  //   const isEnrolled = enrollments.some(
  //     (enrollment: any) =>
  //       enrollment.user === currentUser._id && enrollment.course === courseId
  //   );
  
  //   if (isEnrolled) {
  //     dispatch(unenrollCourse({ user: currentUser._id, course: courseId })); // Unenroll the user
  //   } else {
  //     dispatch(enrollCourse({ user: currentUser._id, course: courseId })); // Enroll the user
  //   }
  // };
  // const handleEnrollmentToggle = async (courseId: string) => {
  //   const isEnrolled = enrollments.some(
  //     (e: { user: any; course: string; }) => e.user === currentUser._id && e.course === courseId
  //   );
  
  //   try {
  //     if (isEnrolled) {
  //       await enrollmentClient.unenrollUser(currentUser._id, courseId);  // ❌ remove from DB
  //       dispatch(unenrollCourse({ user: currentUser._id, course: courseId })); // 🧠 update Redux
  //     } else {
  //       const newEnrollment = await enrollmentClient.enrollUser(currentUser._id, courseId); // ✅ add in DB
  //       dispatch(enrollCourse(newEnrollment)); // 🧠 update Redux
  //     }
  //   } catch (error) {
  //     console.error("❌ Enrollment toggle failed:", error);
  //   }
  // };
  const navigate = useNavigate();
  const handleCourseNavigation = (courseId: string) => {
    // const isEnrolled = enrollments.some(
    //   (enrollment: any) =>
    //     enrollment.user === currentUser._id && enrollment.course === courseId
    // );
    const course = courses.find((c) => `${c._id}` === `${courseId}`);

    console.log("🎯 Trying to navigate to:", courseId);
    console.log("📘 Course found:", course);

    // Default to false if enrolled is missing
    const isEnrolled = course?.enrolled ?? !enrolling; // Fallback: if in "My Courses" mode, assume enrolled

    console.log("✅ Enrolled (computed):", isEnrolled);
  
    if (isEnrolled || isFaculty) {
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
        {/* <Button
          onClick={() => setShowAllCourses(!showAllCourses)}
          style={{ backgroundColor: 'blue', color: 'white', float: 'right' }}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </Button> */}
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      {isFaculty && (<h5>New Course
        <Button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse} > Add </Button>
        <Button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click"> Update </Button>
      </h5>)}<br />
      {isFaculty && (<FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />)}
      {isFaculty && (<FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })}/>)}
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
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
                    {isFaculty && (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation()
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
                            event.stopPropagation()
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
                    {enrolling && (
                        <Button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }} className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
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