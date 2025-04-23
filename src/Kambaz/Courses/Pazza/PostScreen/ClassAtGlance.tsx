// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import * as client from "../../client";
// import { FaCheckCircle } from "react-icons/fa";

// export default function ClassAtGlance() {
//   const { posts } = useSelector((state: any) => state.pazzaReducer);
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { cid } = useParams();
//   const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);

//   useEffect(() => {
//     const loadUsers = async () => {
//       if (!cid) return;
//       try {
//         const users = await client.findUsersForCourse(cid);
//         setEnrolledUsers(users.filter((u: any) => u !== null && u._id));
//       } catch (err) {
//         console.error("Error loading enrolled users", err);
//       }
//     };
//     loadUsers();
//   }, [cid]);

//   const totalPosts = posts.length;
//   const unreadPosts = posts.filter((p: any) => !p.views.includes(currentUser?._id)).length;
//   const unansweredPosts = posts.filter((p: any) => p.type === "QUESTION" && p.answers.length === 0).length;

//   const instructorResponses = posts.reduce(
//     (count: number, p: any) =>
//       count + (p.answers?.filter((a: any) => a.authorRole === "FACULTY").length || 0),
//     0
//   );
  
//   const studentResponses = posts.reduce(
//     (count: number, p: any) =>
//       count + (p.answers?.filter((a: any) => a.authorRole === "STUDENT").length || 0),
//     0
//   );
//   console.log("Sample post:", posts[0])

//   return (
//     <div className="container mt-4">
//       <h3>Class at a Glance</h3>
//       <p className="text-muted">Updated just now. <a href="#">Reload</a></p>

//       <div className="row g-3">
//         <div className="col-6 col-md-4">
//           <div className="alert alert-success d-flex align-items-center" role="alert">
//             <FaCheckCircle className="me-2" />
//             {unreadPosts === 0 ? "no unread posts" : `${unreadPosts} unread posts`}
//           </div>
//         </div>

//         <div className="col-6 col-md-4">
//           <div className="alert alert-success d-flex align-items-center" role="alert">
//             <FaCheckCircle className="me-2" />
//             {unansweredPosts === 0 ? "no unanswered questions" : `${unansweredPosts} unanswered posts`}
//           </div>
//         </div>

//         <div className="col-6 col-md-4">
//           <div className="card p-3">
//             <strong>{totalPosts}</strong>
//             <div className="text-muted">total posts</div>
//           </div>
//         </div>

//         <div className="col-6 col-md-4">
//           <div className="card p-3">
//             <strong>{instructorResponses}</strong>
//             <div className="text-muted">instructor responses</div>
//           </div>
//         </div>

//         <div className="col-6 col-md-4">
//           <div className="card p-3">
//             <strong>{studentResponses}</strong>
//             <div className="text-muted">student responses</div>
//           </div>
//         </div>

//         <div className="col-6 col-md-4">
//           <div className="card p-3">
//             <strong>{enrolledUsers.length}</strong>
//             <div className="text-muted">students enrolled</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as client from "../client";
import { FaCheckCircle } from "react-icons/fa";

export default function ClassAtGlance() {
  const { posts } = useSelector((state: any) => state.pazzaReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);
  const [instructorResponses, setInstructorResponses] = useState(0);
  const [studentResponses, setStudentResponses] = useState(0);

  useEffect(() => {
    const loadUsers = async () => {
      if (!cid) return;
      try {
        const users = await client.fetchCourseUsers(cid);
        // setEnrolledUsers(users.filter((u: any) => u !== null && u._id));
        setEnrolledUsers(users.filter((u: any) => u?.role === "STUDENT"));
      } catch (err) {
        console.error("Error loading enrolled users", err);
      }
    };
    loadUsers();
  }, [cid]);

  useEffect(() => {
    const loadResponses = async () => {
      if (!cid) return;
      try {
        const answersPerPost = await Promise.all(
          posts.map((post: any) => client.fetchAnswersForPost(post._id))
        );

        const allAnswers = answersPerPost.flat();

        const instructorCount = allAnswers.filter(
          (a: any) => a.authorRole === "FACULTY" || a.authorRole === "TA"
        ).length;

        const studentCount = allAnswers.filter(
          (a: any) => a.authorRole === "STUDENT"
        ).length;

        setInstructorResponses(instructorCount);
        setStudentResponses(studentCount);
      } catch (err) {
        console.error("Error loading answers", err);
      }
    };

    loadResponses();
  }, [cid, posts]);

  const totalPosts = posts.length;
  const unreadPosts = posts.filter((p: any) => !p.views.includes(currentUser?._id)).length;
  const unansweredPosts = posts.filter((p: any) => p.type === "QUESTION" && p.answers.length === 0).length;

  return (
    <div className="container mt-4">
      <h3>Class at a Glance</h3>
      <p className="text-muted">Updated just now. <a href="#">Reload</a></p>

      <div className="row g-3">
        <div className="col-6 col-md-4">
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <FaCheckCircle className="me-2" />
            {unreadPosts === 0 ? "no unread posts" : `${unreadPosts} unread posts`}
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <FaCheckCircle className="me-2" />
            {unansweredPosts === 0 ? "no unanswered questions" : `${unansweredPosts} unanswered posts`}
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="card p-3">
            <strong>{totalPosts}</strong>
            <div className="text-muted">total posts</div>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="card p-3">
            <strong>{instructorResponses}</strong>
            <div className="text-muted">instructor responses</div>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="card p-3">
            <strong>{studentResponses}</strong>
            <div className="text-muted">student responses</div>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <div className="card p-3">
            <strong>{enrolledUsers.length}</strong>
            <div className="text-muted">students enrolled</div>
          </div>
        </div>
      </div>
    </div>
  );
}
