// "use client"

// import { useSelector } from "react-redux"
// // import { useParams } from "react-router-dom"

// export default function ClassAtGlance() {
//   const { posts } = useSelector((state: any) => state.pazzaReducer)
//   const { currentUser } = useSelector((state: any) => state.accountReducer)
// //   const { cid } = useParams()

//   // Calculate statistics
//   const totalPosts = posts.length

//   const unreadPosts = posts.filter((post: any) => !post.views.includes(currentUser._id)).length

//   const unansweredPosts = posts.filter((post: any) => post.type === "QUESTION" && post.answers.length === 0).length

//   const instructorResponses = posts.reduce((count: number, post: any) => {
//     return count + post.answers.filter((answer: any) => answer.authorRole === "FACULTY").length
//   }, 0)

//   const studentResponses = posts.reduce((count: number, post: any) => {
//     return count + post.answers.filter((answer: any) => answer.authorRole !== "FACULTY").length
//   }, 0)

//   // Get enrolled students count (this would need to be fetched from the API)
//   const enrolledStudents = 25 // Placeholder value

//   return (
//     <div className="pazza-class-glance">
//       <h2>Class at a Glance</h2>

//       <div className="pazza-stats-container">
//         <div className="pazza-stat-card">
//           <div className="pazza-stat-value">{unreadPosts > 0 ? unreadPosts : "No"}</div>
//           <div className="pazza-stat-label">unread posts</div>
//         </div>

//         <div className="pazza-stat-card">
//           <div className="pazza-stat-value">{unansweredPosts > 0 ? unansweredPosts : "No"}</div>
//           <div className="pazza-stat-label">unanswered posts</div>
//         </div>

//         <div className="pazza-stat-card">
//           <div className="pazza-stat-value">{totalPosts}</div>
//           <div className="pazza-stat-label">total posts</div>
//         </div>

//         <div className="pazza-stat-card">
//           <div className="pazza-stat-value">{instructorResponses}</div>
//           <div className="pazza-stat-label">instructor responses</div>
//         </div>

//         <div className="pazza-stat-card">
//           <div className="pazza-stat-value">{studentResponses}</div>
//           <div className="pazza-stat-label">student responses</div>
//         </div>

//         <div className="pazza-stat-card">
//           <div className="pazza-stat-value">{enrolledStudents}</div>
//           <div className="pazza-stat-label">students enrolled</div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

export default function ClassAtGlance() {
  const { posts } = useSelector((state: any) => state.pazzaReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  const { cid } = useParams()
  const [showAiNotice, setShowAiNotice] = useState(true)

  // Calculate statistics
  const totalPosts = posts.length
  const unreadPosts = posts.filter((post: any) => !post.views.includes(currentUser?._id)).length
  const unansweredPosts = posts.filter((post: any) => post.type === "QUESTION" && post.answers.length === 0).length
  const unansweredFollowups = posts.reduce((count: number, post: any) => {
    const unansweredDiscussions = post.discussions?.filter((d: any) => !d.resolved)?.length || 0
    return count + unansweredDiscussions
  }, 0)

  const instructorResponses = posts.reduce((count: number, post: any) => {
    return count + (post.answers?.filter((answer: any) => answer.authorRole === "FACULTY")?.length || 0)
  }, 0)

  const studentResponses = posts.reduce((count: number, post: any) => {
    return count + (post.answers?.filter((answer: any) => answer.authorRole !== "FACULTY")?.length || 0)
  }, 0)

  // Get enrolled students count (this would need to be fetched from the API)
  const enrolledStudents = 108
  const totalEstimated = 100

  return (
    <div className="pazza-class-glance">
      <h2>Class at a Glance</h2>
      <div className="pazza-updated-info">
        Updated 10 seconds ago. <span className="pazza-reload-link">Reload</span>
      </div>

      <div className="pazza-stats-container">
        <div className="pazza-stat-row">
          <div className="pazza-stat-icon success">
            <FaCheckCircle />
          </div>
          <div className="pazza-stat-label">no unread posts</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-icon success">
            <FaCheckCircle />
          </div>
          <div className="pazza-stat-label">no unanswered questions</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-icon success">
            <FaCheckCircle />
          </div>
          <div className="pazza-stat-label">no unanswered followups</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-value">license status</div>
          <div className="pazza-stat-label">active instructor license</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-value">90</div>
          <div className="pazza-stat-label">total contributions</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-value">0</div>
          <div className="pazza-stat-label">instructor responses</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-value">0</div>
          <div className="pazza-stat-label">students' responses</div>
        </div>

        <div className="pazza-stat-row">
          <div className="pazza-stat-value">0ms</div>
          <div className="pazza-stat-label">avg. response time</div>
        </div>
      </div>

      <div className="pazza-enrollment-section">
        <div className="pazza-enrollment-header">
          <div className="pazza-enrollment-title">Student Enrollment</div>
          <div className="pazza-enrollment-edit">Edit</div>
        </div>
        <div className="pazza-enrollment-count">
          {enrolledStudents} enrolled out of {totalEstimated} (estimated)
        </div>
      </div>

      {showAiNotice && (
        <div className="pazza-ai-notice">
          <div className="pazza-ai-close" onClick={() => setShowAiNotice(false)}>
            <IoClose />
          </div>
          <h3>Introducing AI-Generated Summaries for Followups and Folders</h3>
          <p>Dear Instructor,</p>
          <p>
            We are pleased to introduce an optional AI-powered summarization feature to help your students get more out
            of discussions, especially in larger classes. This feature is disabled by default and per your institution's
            policies, you can enable using this button, a summary of the following comments will appear for everyone
            that can view the post. An updated summary can be generated once new followup comments are made.
          </p>
        </div>
      )}
    </div>
  )
}
