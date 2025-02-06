import { FaPlus } from "react-icons/fa6";
import { Button, Container, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function AssignmentControl() {
 return (
    <Container className="d-flex align-items-center justify-content-between my-3">
      <InputGroup style={{ maxWidth: "250px" }}>
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
        <Form.Control 
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

        <Button 
          variant="danger" 
          size="lg" 
          id="wd-add-assignment-btn"
        >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </Button>
      </div>
    </Container>
    
);}
