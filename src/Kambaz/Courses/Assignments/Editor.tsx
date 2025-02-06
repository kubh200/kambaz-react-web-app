import { Form, Button, Row, Col } from "react-bootstrap";
export default function AssignmentEditor() {
    return (
    <div className="container py-3" id="wd-assignments-editor">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue={`The assignment is available online. Submit a link to the landing page of your web application running on Netlify. The landing page should include the following:
          Your full name and section
          Links to each of the lab assignments
          Link to the Kanbas application
          Links to all relevant source code repositories
The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={9}>
            <Form.Control defaultValue={100} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="Assignment">
              <option value="Assignment">Assignment</option>
              <option value="Quizzes">Quizzes</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={9}>
            <Form.Select defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={3} className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <div className="p-3 border rounded">
              <Form.Select defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No Submission">No Submission</option>
              </Form.Select>

              <h6 className="mt-3">Online Entry Options</h6>

              <Form.Check id="wd-text-entry" label="Text Entry" />
              <Form.Check id="wd-website-url" label="Website URL" defaultChecked />
              <Form.Check id="wd-media-recordings" label="Media Recordings" />
              <Form.Check id="wd-student-annotation" label="Student Annotation" />
              <Form.Check id="wd-file-upload" label="File Uploads" />
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className="text-end">
            Assign
          </Form.Label>
          <Col sm={9}>
            <div className="p-3 border rounded">
              <Form.Group controlId="wd-assign-to" className="mb-3">
                <Form.Label>Assign to</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Form.Group>

              <Form.Group controlId="wd-due-date" className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control type="datetime-local" defaultValue="2024-05-13T23:59" />
              </Form.Group>

              <Row>
                <Col sm={6}>
                  <Form.Group controlId="wd-available-from" className="mb-3">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control type="datetime-local" defaultValue="2024-05-06T12:00" />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="wd-available-until" className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control type="datetime-local" defaultValue="2024-05-20T11:59" />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>
        
        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <Button 
            variant="secondary" 
            className="me-2" 
            onClick={() => alert("Cancel clicked")}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => alert("Save clicked")}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
);}
