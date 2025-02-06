import Modules from "../Modules";
import { Container, Row, Col } from "react-bootstrap";
import CourseStatus from "./status";
export default function Home() {
  return (
    <Container>
      <Row>
        {/* Main Content - Modules */}
        <Col xs={12} md={8} lg={6} className="flex-fill">
          <Modules />
        </Col>
        <Col lg={2} className="d-none d-xl-block">
          <CourseStatus />
        </Col>
      </Row>
    </Container>
);}
