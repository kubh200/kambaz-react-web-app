import { FaPlus } from "react-icons/fa6";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import AssignmentEditor from "./Editor";
import { FaSearch } from "react-icons/fa";

export default function AssignmentsControl({
  assignmentTitle,
  setAssignmentTitle,
  assignmentDescription,
  setAssignmentDescription,
  points,
  setPoints,
  dueDate,
  setDueDate,
  availableFrom,
  setAvailableFrom,
  availableUntil,
  setAvailableUntil,
  addAssignment
}: {
  assignmentTitle: string;
  setAssignmentTitle: (title: string) => void;
  assignmentDescription: string;
  setAssignmentDescription: (desc: string) => void;
  points: string;
  setPoints: (p: string) => void;
  dueDate: string;
  setDueDate: (dd: string) => void;
  availableFrom: string;
  setAvailableFrom: (val: string) => void;
  availableUntil: string;
  setAvailableUntil: (val: string) => void;
  addAssignment: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Example check for faculty
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <Container className="d-flex align-items-center justify-content-between my-3">
      <InputGroup style={{ maxWidth: "250px" }}>
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
        <FormControl 
          type="text" 
          placeholder="Search..." 
          aria-label="Search"
        />
      </InputGroup>

      <div className="text-nowrap">
        <Button 
          variant="secondary" 
          size="lg" 
          className="me-2"
          id="wd-view-progress"
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </Button>

        {/* <Button 
          variant="danger" 
          size="lg" 
          id="wd-add-assignment-btn"
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </Button> */}
        {/* Button: only show if user is FACULTY */}
        {isFaculty && (
          <Button variant="danger" size="lg" id="wd-add-assignment-btn" onClick={handleShow}>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        )}

        {/* The modal editor: also only render if faculty */}
        {isFaculty && (
          <AssignmentEditor
            show={show}
            handleClose={handleClose}
            dialogTitle="Add Assignment"
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
            addAssignment={addAssignment}
          />
        )}
      </div>
    </Container>
  );
}
