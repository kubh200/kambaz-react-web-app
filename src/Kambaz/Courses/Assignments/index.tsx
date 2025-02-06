import { useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup } from "react-bootstrap";
import AssignmentControlButton from "./AssignmentControlButton";
import AssignmentControl from "./AssignmentControl";
import { LuNotebookPen } from "react-icons/lu";
import LessonControlButtons from "./LessonControlButtons";
import AssignmentEditor from "./Editor";
export default function Assignments() {
  const [showEditor, setShowEditor] = useState(false);

    const handleTitleClick = () => {
      setShowEditor(true);
    };

    if (showEditor) {
      return (
        <div>
          <AssignmentEditor />
        </div>
      );
    }

    return (
      <div>
        <AssignmentControl /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentControlButton />
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-star">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                  <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
                  <div>
                    <h5 className="mb-1" style={{cursor: "pointer"}} onClick={handleTitleClick}> A1 </h5>
                    <div>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="text-muted">
                        {" "}| <b>Not available until</b> May 6 at 12:00am 
                        | <b>Due</b> May 13 at 11:59pm | 100 pts
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ms-auto d-flex align-items-center flex-shrink-0">
                  <LessonControlButtons />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-star">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                  <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
                  <div>
                    <h5 className="mb-1" style={{cursor: "pointer"}} onClick={handleTitleClick}> A2 </h5>
                    <div>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="text-muted">
                        {" "}| <b>Not available until</b> May 6 at 12:00am 
                        | <b>Due</b> May 13 at 11:59pm | 100 pts
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ms-auto d-flex align-items-center flex-shrink-0">
                  <LessonControlButtons />
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-star">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                  <LuNotebookPen className="me-2 fs-3 flex-shrink-0" />
                  <div>
                    <h5 className="mb-1" style={{cursor: "pointer"}} onClick={handleTitleClick}> A3 </h5>
                    <div>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="text-muted">
                        {" "}| <b>Not available until</b> May 6 at 12:00am 
                        | <b>Due</b> May 13 at 11:59pm | 100 pts
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ms-auto d-flex align-items-center flex-shrink-0">
                  <LessonControlButtons />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
  );}
  