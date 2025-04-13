import { Link, useParams, useLocation } from "react-router-dom";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Pazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => {
        const linkPath = `/Kambaz/Courses/${cid}/${link}`;
        return (
          <Link 
            key={index} 
            to={linkPath} 
            id={`wd-course-${link.toLowerCase()}-link`} 
            className={`list-group-item ${pathname.includes(linkPath) ? "active" : "text-danger"} border border-0`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}