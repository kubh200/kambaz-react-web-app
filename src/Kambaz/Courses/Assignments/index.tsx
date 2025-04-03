import { useParams } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup } from "react-bootstrap";
import AssignmentControlButton from "./AssignmentControlButton";
import AssignmentControl from "./AssignmentControl";
import { LuNotebookPen } from "react-icons/lu";
import LessonControlButtons from "./LessonControlButtons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, addAssignment, deleteAssignment, updateAssignment} from "./reducer";
import AssignmentEditor from "./Editor";
import * as assignmentClient from "./client";
export default function Assignments() {
  const { cid} = useParams(); 
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [points, setPoints] = useState("100");
  const [dueDate, setDueDate] = useState("2025-05-13T23:59");
  const [availableFrom, setAvailableFrom] = useState("2025-05-06T12:00");
  const [availableUntil, setAvailableUntil] = useState("2025-05-20T11:59");

  const [showEditor, setShowEditor] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  

  // A function that dispatches "addAssignment"
  // const handleAddAssignment  = () => {
  //   dispatch(
  //     addAssignment({
  //       title: assignmentTitle,
  //       description: assignmentDescription,
  //       points: Number(points),
  //       dueDate,
  //       availableFrom,
  //       availableUntil,
  //       course: cid,
  //     })
  //   );
  //   resetForm();
  // };

  const handleAddAssignment = async () => {
    try {
      if (!cid) return;
      const newAssignment = {
        title: assignmentTitle,
        description: assignmentDescription,
        points: Number(points),
        dueDate,
        availableFrom,
        availableUntil,
      };
      const created = await assignmentClient.createAssignment(cid, newAssignment);
      dispatch(addAssignment(created));
      resetForm();
    } catch (e) {
      console.error("❌ Failed to add assignment:", e);
    }
  };

  const fetchAssignments = async () => {
    try {
      if (!cid) return;
      const data = await assignmentClient.fetchAssignments(cid);
      dispatch(setAssignments(data));
    } catch (e) {
      console.error("❌ Error loading assignments:", e);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

   // Helper to reset form fields to default values
   const resetForm = () => {
    setAssignmentTitle("");
    setAssignmentDescription("");
    setPoints("100");
    setDueDate("2025-05-13T23:59");
    setAvailableFrom("2025-05-06T12:00");
    setAvailableUntil("2025-05-20T11:59");
  };

  // // 4) Filter assignments by the current course
  // const assignmentsForCourse = assignments.filter(
  //   (assignment: any) => assignment.course === cid
  // );

  // When an assignment is clicked, open the editor and pre-populate with its data
  const openEditor = (assignment: any) => {
    setSelectedAssignment(assignment);
    setAssignmentTitle(assignment.title);
    setAssignmentDescription(assignment.description);
    setPoints(assignment.points.toString());
    setDueDate(assignment.dueDate);
    setAvailableFrom(assignment.availableFrom);
    setAvailableUntil(assignment.availableUntil);
    setShowEditor(true);
  };

  // Close the editor modal
  const closeEditor = () => {
    setShowEditor(false);
    setSelectedAssignment(null);
    resetForm();
  };

  // Handler for saving the edited assignment
  // const handleUpdateAssignment = () => {
  //   dispatch(
  //     updateAssignment({
  //       ...selectedAssignment,
  //       title: assignmentTitle,
  //       description: assignmentDescription,
  //       points: Number(points),
  //       dueDate,
  //       availableFrom,
  //       availableUntil,
  //     })
  //   );
  //   closeEditor();
  // };

  const handleUpdateAssignment = async () => {
    try {
      const updated = {
        ...selectedAssignment,
        title: assignmentTitle,
        description: assignmentDescription,
        points: Number(points),
        dueDate,
        availableFrom,
        availableUntil,
      };
      const saved = await assignmentClient.updateAssignment(updated);
      dispatch(updateAssignment(saved));
      closeEditor();
    } catch (e) {
      console.error("❌ Failed to update assignment:", e);
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await assignmentClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (e) {
      console.error("❌ Failed to delete assignment:", e);
    }
  };

  // const handleDeleteAssignment = (assignmentId: string) => {
  //   dispatch(deleteAssignment(assignmentId));
  // };
  return (
    <div>
      <AssignmentControl
        assignmentTitle={assignmentTitle}
        setAssignmentTitle={setAssignmentTitle}
        assignmentDescription={assignmentDescription}
        setAssignmentDescription={setAssignmentDescription}
        points={points}
        setPoints={setPoints}
        dueDate={dueDate}
        setDueDate={setDueDate}
        availableFrom={availableFrom}
        setAvailableFrom={setAvailableFrom}
        availableUntil={availableUntil}
        setAvailableUntil={setAvailableUntil}
        addAssignment={handleAddAssignment}
      />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentControlButton />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.length > 0 ? (
              assignments.filter((assignment: any) => assignment.course === cid).map((assignment : any) => (
                <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1 d-flex align-items-start">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                    <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
                    <div>
                      {/* <h5 className="mb-1">
                        <Link
                          to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                          className="text-dark text-decoration-none">
                          {assignment.title}
                        </Link>
                      </h5> */}
                      <h5 className="mb-1">
                        <span
                          className="text-dark text-decoration-none"
                          style={{ cursor: "pointer" }}
                          onClick={() => openEditor(assignment)}
                        >
                          {assignment.title}
                        </span>
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
                    <LessonControlButtons assignmentId={assignment._id}
                      deleteAssignment={handleDeleteAssignment}/>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center mt-3">No assignments found for this course.</p>
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      {/* Editor Modal: displays original assignment info for editing */}
      {isFaculty && showEditor && selectedAssignment && (
        <AssignmentEditor
          show={showEditor}
          handleClose={closeEditor}
          dialogTitle={selectedAssignment.title}
          assignmentTitle={assignmentTitle}
          setAssignmentTitle={setAssignmentTitle}
          assignmentDescription={assignmentDescription}
          setAssignmentDescription={setAssignmentDescription}
          points={points}
          setPoints={setPoints}
          dueDate={dueDate}
          setDueDate={setDueDate}
          availableFrom={availableFrom}
          setAvailableFrom={setAvailableFrom}
          availableUntil={availableUntil}
          setAvailableUntil={setAvailableUntil}
          addAssignment={handleUpdateAssignment}
        />
      )}
    </div>
  );
}

