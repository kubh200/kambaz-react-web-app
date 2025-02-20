// import { useParams, Link, Routes, Route } from "react-router-dom";
// import { BsGripVertical } from "react-icons/bs";
// import { ListGroup } from "react-bootstrap";
// import AssignmentControlButton from "./AssignmentControlButton";
// import AssignmentControl from "./AssignmentControl";
// import AssignmentEditor from "./Editor";
// import { LuNotebookPen } from "react-icons/lu";
// import LessonControlButtons from "./LessonControlButtons";
// import * as db from "../../Database";
// export default function Assignments() {
//   const { cid } = useParams();
//   const assignments = db.assignments.filter((assignment) => assignment.course === cid);
//   const [showEditor, setShowEditor] = useState(false);

//     const handleTitleClick = () => {
//       setShowEditor(true);
//     };

//     if (showEditor) {
//       return (
//         <div>
//           <AssignmentEditor />
//         </div>
//       );
//     }

//     return (
//       <div>
//         <AssignmentControl /><br /><br />
//         <ListGroup className="rounded-0" id="wd-modules">
//           <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//             <div className="wd-title p-3 ps-2 bg-secondary"> 
//               <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentControlButton />
//             </div>
//             <ListGroup className="wd-assignments rounded-0">
//               <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-star">
//                 <div className="d-flex align-items-center">
//                   <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
//                   <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
//                   <div>
//                     <h5 className="mb-1" style={{cursor: "pointer"}} onClick={handleTitleClick}> A1 </h5>
//                     <div>
//                       <span className="text-danger">Multiple Modules</span>
//                       <span className="text-muted">
//                         {" "}| <b>Not available until</b> May 6 at 12:00am 
//                         | <b>Due</b> May 13 at 11:59pm | 100 pts
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="ms-auto d-flex align-items-center flex-shrink-0">
//                   <LessonControlButtons />
//                 </div>
//               </ListGroup.Item>
//               <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-star">
//                 <div className="d-flex align-items-center">
//                   <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
//                   <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
//                   <div>
//                     <h5 className="mb-1" style={{cursor: "pointer"}} onClick={handleTitleClick}> A2 </h5>
//                     <div>
//                       <span className="text-danger">Multiple Modules</span>
//                       <span className="text-muted">
//                         {" "}| <b>Not available until</b> May 6 at 12:00am 
//                         | <b>Due</b> May 13 at 11:59pm | 100 pts
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="ms-auto d-flex align-items-center flex-shrink-0">
//                   <LessonControlButtons />
//                 </div>
//               </ListGroup.Item>
//               <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-star">
//                 <div className="d-flex align-items-center">
//                   <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
//                   <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
//                   <div>
//                     <h5 className="mb-1" style={{cursor: "pointer"}} onClick={handleTitleClick}> A3 </h5>
//                     <div>
//                       <span className="text-danger">Multiple Modules</span>
//                       <span className="text-muted">
//                         {" "}| <b>Not available until</b> May 6 at 12:00am 
//                         | <b>Due</b> May 13 at 11:59pm | 100 pts
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="ms-auto d-flex align-items-center flex-shrink-0">
//                   <LessonControlButtons />
//                 </div>
//               </ListGroup.Item>
//             </ListGroup>
//           </ListGroup.Item>
//         </ListGroup>
//       </div>
//   );}
// export default function Assignments() {
//   const { cid } = useParams(); 
//   const assignments = db.assignments.filter((assignment) => assignment.course === cid);

//   return (
//     <div>
//       <AssignmentControl />
//       <br />
//       <br />
//       <ListGroup className="rounded-0" id="wd-modules">
//         <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//           <div className="wd-title p-3 ps-2 bg-secondary">
//             <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentControlButton />
//           </div>
//           <ListGroup className="wd-assignments rounded-0">
//             {assignments.length > 0 ? (
//               assignments.map((assignment) => (
//                 <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1 d-flex align-items-start">
//                   <div className="d-flex align-items-center">
//                     <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
//                     <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
//                     <div>
//                       <h5 className="mb-1">
//                         <Link
//                           to={`/courses/${cid}/assignments/${assignment._id}`}
//                           className="text-dark text-decoration-none">
//                           {assignment.title}
//                         </Link>
//                       </h5>
//                       <div>
//                         <span className="text-danger">Multiple Modules</span>
//                         <span className="text-muted">
//                           {" "} | <b>Not available until</b> May 6 at 12:00am 
//                           | <b>Due</b> May 13 at 11:59pm | 100 pts
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="ms-auto d-flex align-items-center flex-shrink-0">
//                     <LessonControlButtons />
//                   </div>
//                 </ListGroup.Item>
//               ))
//             ) : (
//               <p className="text-center mt-3">No assignments found for this course.</p>
//             )}
//           </ListGroup>
//         </ListGroup.Item>
//       </ListGroup>

//       <Routes>
//         <Route path=":aid" element={<AssignmentEditor />} />
//       </Routes>
//     </div>
//   );
// }
import { useParams, Link } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup } from "react-bootstrap";
import AssignmentControlButton from "./AssignmentControlButton";
import AssignmentControl from "./AssignmentControl";
import { LuNotebookPen } from "react-icons/lu";
import LessonControlButtons from "./LessonControlButtons";
import * as db from "../../Database";

export default function Assignments() {
  const { cid} = useParams(); 
  const assignments = db.assignments.filter((assignment) => assignment.course === cid);
  return (
    <div>
      <AssignmentControl />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentControlButton />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1 d-flex align-items-start">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                    <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
                    <div>
                      <h5 className="mb-1">
                        <Link
                          to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                          className="text-dark text-decoration-none">
                          {assignment.title}
                        </Link>
                      </h5>
                      <div>
                        <span className="text-danger">Multiple Modules</span>
                        <span className="text-muted">
                          {" "} | <b>Not available until</b> {assignment.availableFrom}
                          | <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ms-auto d-flex align-items-center flex-shrink-0">
                    <LessonControlButtons />
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center mt-3">No assignments found for this course.</p>
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

