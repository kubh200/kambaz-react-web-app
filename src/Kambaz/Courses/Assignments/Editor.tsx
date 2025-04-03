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
