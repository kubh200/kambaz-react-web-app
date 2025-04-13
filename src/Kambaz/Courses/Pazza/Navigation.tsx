// "use client"

// import { Link, useLocation } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"

// interface PazzaNavigationProps {
//   courseName: string
// }

// export default function PazzaNavigation({ courseName }: PazzaNavigationProps) {
//   const { cid } = useParams()
//   const location = useLocation()
//   const { currentUser } = useSelector((state: any) => state.accountReducer)
//   const isFaculty = currentUser?.role === "FACULTY"

//   const isActive = (path: string) => {
//     return location.pathname.includes(path) ? "active" : ""
//   }

//   return (
//     <div className="pazza-navigation">
//       <div className="pazza-nav-left">
//         <div className="pazza-logo">pazza</div>
//         <div className="pazza-course-name">{courseName}</div>
//       </div>
//       <div className="pazza-nav-center">
//         <Link
//           to={`/Kambaz/Courses/${cid}/Pazza`}
//           className={`pazza-nav-link ${isActive("/Pazza") && !isActive("/ManageClass") ? "active" : ""}`}
//         >
//           Q&A
//         </Link>
//         <span className="pazza-nav-link disabled">Resources</span>
//         <span className="pazza-nav-link disabled">Statistics</span>
//         {isFaculty && (
//           <Link
//             to={`/Kambaz/Courses/${cid}/Pazza/ManageClass`}
//             className={`pazza-nav-link ${isActive("/ManageClass") ? "active" : ""}`}
//           >
//             Manage Class
//           </Link>
//         )}
//       </div>
//       <div className="pazza-nav-right">
//         <div className="pazza-user-name">
//           {currentUser?.firstName} {currentUser?.lastName}
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { Link, useLocation } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { FaCog } from "react-icons/fa"

// interface PazzaNavigationProps {
//   courseName: string
// }

// export default function PazzaNavigation({ courseName }: PazzaNavigationProps) {
//   const { cid } = useParams()
//   const location = useLocation()
//   const { currentUser } = useSelector((state: any) => state.accountReducer)
//   const isFaculty = currentUser?.role === "FACULTY"

//   const isActive = (path: string) => {
//     return location.pathname.includes(path) ? "active" : ""
//   }

//   return (
//     <div className="pazza-navigation">
//       <div className="pazza-nav-left">
//         <div className="pazza-logo">piazza</div>
//         <div className="pazza-course-name">{courseName}</div>
//       </div>
//       <div className="pazza-nav-center">
//         <Link
//           to={`/Kambaz/Courses/${cid}/Pazza`}
//           className={`pazza-nav-link ${isActive("/Pazza") && !isActive("/ManageClass") ? "active" : ""}`}
//         >
//           Q&A
//         </Link>
//         <span className="pazza-nav-link">Resources</span>
//         <span className="pazza-nav-link">Statistics</span>
//         {isFaculty && (
//           <Link
//             to={`/Kambaz/Courses/${cid}/Pazza/ManageClass`}
//             className={`pazza-nav-link ${isActive("/ManageClass") ? "active" : ""}`}
//           >
//             Manage Class
//           </Link>
//         )}
//       </div>
//       <div className="pazza-nav-right">
//         <div className="pazza-user-name">
//           {currentUser?.firstName} {currentUser?.lastName}
//         </div>
//         <FaCog className="pazza-settings-icon" style={{ marginLeft: "10px", cursor: "pointer" }} />
//       </div>
//     </div>
//   )
// }
// "use client"

// import { Link, useLocation } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
// import { FaUser } from "react-icons/fa"

// export default function PazzaNavigation() {
//   const { cid } = useParams()
//   const location = useLocation()
//   const { currentUser } = useSelector((state: any) => state.accountReducer)
//   const { courses } = useSelector((state: any) => state.coursesReducer)
//   const isFaculty = currentUser?.role === "FACULTY"

//   // Find the current course
//   const currentCourse = courses.find((c: any) => c._id === cid)
//   // const courseName = currentCourse?.name || "Course"
//   const courseID = currentCourse?._id || "Course"

//   const isActive = (path: string) => {
//     return location.pathname.includes(path) ? "active" : ""
//   }

//   return (
//     <div className="pazza-navigation">
//       <div className="pazza-nav-left">
//         <div className="pazza-logo">pazza</div>
//       </div>
//       <div className="pazza-nav-center">
//         <div className="pazza-course-name">{courseID}</div>
//         <Link
//           to={`/Kambaz/Courses/${cid}/Pazza`}
//           className={`pazza-nav-link ${isActive("/Pazza") && !isActive("/ManageClass") ? "active" : ""}`}
//         >
//           Q&A
//         </Link>
//         <span className="pazza-nav-link ">Resources</span>
//         <span className="pazza-nav-link ">Statistics</span>
//         {isFaculty && (
//           <Link
//             to={`/Kambaz/Courses/${cid}/Pazza/ManageClass`}
//             className={`pazza-nav-link ${isActive("/ManageClass") ? "active" : ""}`}
//           >
//             Manage Class
//           </Link>
//         )}
//       </div>
//       <div className="pazza-nav-right">
//         <FaUser className="pazza-user-icon" />
//         <div className="pazza-user-name">
//           {currentUser?.firstName} {currentUser?.lastName}
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { Navbar, Nav, Container } from "react-bootstrap"

export default function PazzaNavigation() {
  const { cid } = useParams()
  const location = useLocation()
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  const { courses } = useSelector((state: any) => state.coursesReducer)
  const isFaculty = currentUser?.role === "FACULTY"

  // Find the current course
  const currentCourse = courses.find((c: any) => c._id === cid)
  const courseID = currentCourse?._id || "Course"

  const isActive = (path: string) => {
    return location.pathname.includes(path) ? "active" : ""
  }

  return (
    <Navbar
      bg="primary"
      variant="dark"
      className="py-1"
      style={{ backgroundColor: "#2970a6", height: "40px" }}
    >
      <Container fluid className="px-3 d-flex justify-content-between">
        {/* Left Side - Brand */}
        <Navbar.Brand className="me-2 p-0">
          <span className="fw-bold">pazza</span>
        </Navbar.Brand>

        {/* Center Content */}
        <div className="d-flex align-items-center flex-grow-1 justify-content-center">
          <div className="d-flex align-items-center gap-4">
            <span className="text-white">{courseID}</span>
            <div className="d-flex align-items-center gap-3">
              <Link
                to={`/Kambaz/Courses/${cid}/Pazza`}
                className={`nav-link py-1 px-2 ${
                  isActive("/Pazza") && !isActive("/ManageClass") 
                  ? "fw-bold border-bottom border-white" 
                  : "text-white-50"
                }`}
              >
                Q&A
              </Link>
              <Nav.Link className="py-1 px-2 text-white-50">Resources</Nav.Link>
              <Nav.Link className="py-1 px-2 text-white-50">Statistics</Nav.Link>
              {isFaculty && (
                <Link
                  to={`/Kambaz/Courses/${cid}/Pazza/ManageClass`}
                  className={`nav-link py-1 px-2 ${
                    isActive("/ManageClass") 
                    ? "fw-bold border-bottom border-white" 
                    : "text-white-50"
                  }`}
                >
                  Manage Class
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - User Info */}
        <div className="d-flex align-items-center">
          <div
            className="bg-white rounded d-flex align-items-center justify-content-center me-2"
            style={{ width: "24px", height: "24px" }}
          >
            <FaUser className="text-primary" />
          </div>
          <span className="text-white">
            {currentUser?.firstName} {currentUser?.lastName}
          </span>
        </div>
      </Container>
    </Navbar>
  )
}