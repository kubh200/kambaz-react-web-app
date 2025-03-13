// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useParams, Link } from "react-router-dom";
// import * as db from "../../Database";

// export default function AssignmentEditor() {
//   const { cid, aid } = useParams(); // Get course & assignment IDs from URL
//   const assignment = db.assignments.find((a) => a._id === aid); // Find assignment in database

//   if (!assignment) {
//     return <h2 className="text-center text-danger">Assignment Not Found</h2>;
//   }

//   return (
//     <div className="container py-3" id="wd-assignments-editor">
//       <h2>{assignment.title}</h2>
//       <Form>
//         {/* Assignment Name */}
//         <Form.Group className="mb-3" controlId="wd-name">
//           <Form.Label>Assignment Name</Form.Label>
//           <Form.Control type="text" defaultValue={assignment.title} />
//         </Form.Group>

//         {/* Description */}
//         <Form.Group className="mb-4" controlId="wd-description">
//           <Form.Control as="textarea" rows={5} defaultValue={assignment.description || "No description provided."} />
//         </Form.Group>

//         {/* Points */}
//         <Form.Group as={Row} className="mb-3" controlId="wd-points">
//           <Form.Label column sm={3} className="text-end">
//             Points
//           </Form.Label>
//           <Col sm={9}>
//             <Form.Control defaultValue={assignment.points || 100} />
//           </Col>
//         </Form.Group>

//         {/* Due & Availability Dates */}
//         <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
//           <Form.Label column sm={3} className="text-end">
//             Due Date
//           </Form.Label>
//           <Col sm={9}>
//             <Form.Control type="datetime-local" defaultValue={assignment.dueDate || "2024-05-13T23:59"} />
//           </Col>
//         </Form.Group>

//         <Row>
//           <Col sm={6}>
//             <Form.Group controlId="wd-available-from" className="mb-3">
//               <Form.Label>Available from</Form.Label>
//               <Form.Control type="datetime-local" defaultValue={assignment.availableFrom || "2024-05-06T12:00"} />
//             </Form.Group>
//           </Col>
//           <Col sm={6}>
//             <Form.Group controlId="wd-available-until" className="mb-3">
//               <Form.Label>Until</Form.Label>
//               <Form.Control type="datetime-local" defaultValue={assignment.availableUntil || "2024-05-20T11:59"} />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Buttons */}
//         <div className="d-flex justify-content-end mt-4">
//           <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
//             <Button variant="secondary" className="me-2">Cancel</Button>
//           </Link>
//           <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
//             <Button variant="danger">Save</Button>
//           </Link>
//         </div>
//       </Form>
//     </div>
//   );
// }
import { Modal, FormControl, Button, Form, Row, Col } from "react-bootstrap";

export default function AssignmentEditor({
  show,
  handleClose,
  dialogTitle,
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
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
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
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Title */}
        <Form.Label>Assignment Title</Form.Label>
        <FormControl
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          className="mb-3"
        />

        {/* Description */}
        <Form.Label>Description</Form.Label>
        <FormControl
          as="textarea"
          rows={4}
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          className="mb-3"
        />

        {/* Points */}
        <Form.Label>Points</Form.Label>
        <FormControl
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="mb-3"
        />

        {/* Due Date */}
        <Form.Label>Due Date</Form.Label>
        <FormControl
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mb-3"
        />

        {/* Availability */}
        <Row>
          <Col>
            <Form.Label>Available From</Form.Label>
            <FormControl
              type="datetime-local"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              className="mb-3"
            />
          </Col>
          <Col>
            <Form.Label>Available Until</Form.Label>
            <FormControl
              type="datetime-local"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
              className="mb-3"
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            // Invoke parent's addAssignment logic
            addAssignment();
            // Close modal
            handleClose();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
