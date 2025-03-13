import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
interface AssignmentControlButtonsProps {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}
export default function LessonControlButtons({
  assignmentId,
  deleteAssignment,
}: AssignmentControlButtonsProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteAssignment(assignmentId);
    }
  };
  return (
    <div className="float-end">
      {isFaculty && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}