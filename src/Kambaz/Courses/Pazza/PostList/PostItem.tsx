// // "use client"

// import { formatDistanceToNow } from "date-fns"
// import { ListGroup } from "react-bootstrap"

// interface PostItemProps {
//   post: any
//   isSelected: boolean
//   onClick: () => void
// }

// export default function PostItem({
//   post,
//   isSelected,
//   onClick,
// }: PostItemProps) {
//   const rawDetails = post.details ?? post.content ?? ""
//   const rawSummary = post.summary ?? rawDetails

//   const truncateText = (text: string, max: number) =>
//     text.length <= max ? text : text.slice(0, max) + "…"

//   const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

//   return (
//     <ListGroup.Item
//       action
//       active={isSelected}
//       onClick={onClick}
//       className="py-2"
//     >
//       <div className="d-flex justify-content-between">
//         <strong>{truncateText(rawSummary, 80)}</strong>
//         <small className="text-white-50">{timeAgo}</small>
//       </div>
//       <div className="small text-truncate mt-1">
//         {truncateText(rawDetails.replace(/<[^>]*>/g, ""), 120)}
//       </div>
//     </ListGroup.Item>
//   )
// }
// export default function PostItem({ post, isSelected, onClick }: PostItemProps) {
//   const rawDetails = post.details ?? post.content ?? "";
//   const rawSummary = post.summary ?? rawDetails;

//   const truncateText = (text: string, maxLength: number) =>
//     text.length <= maxLength ? text : text.substring(0, maxLength) + "…";

//   const createdAt = new Date(post.createdAt);
//   const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

//   return (
//     <div
//       className={`pazza-post-item ${isSelected ? "selected" : ""}`}
//       onClick={onClick}
//     >
//       <div className="pazza-post-item-header">
//         <div className="pazza-post-item-title">
//           {truncateText(rawSummary, 80)}
//         </div>

//         <div className="pazza-post-item-meta">
//           <span className="pazza-post-item-author-role">
//             {post.authorRole === "FACULTY" ? "Instructor" : "Student"}
//           </span>
//         </div>
//       </div>

//       <div className="pazza-post-item-content">
//         {truncateText(rawDetails.replace(/<[^>]*>/g, ""), 150)}
//       </div>

//       <div className="pazza-post-item-footer">
//         <span className="pazza-post-item-time">{timeAgo}</span>
//       </div>
//     </div>
//   );
// }
// PostItem.tsx
import { formatDistanceToNow } from "date-fns"
import { ListGroup } from "react-bootstrap"

interface PostItemProps {
  post: any
  isSelected: boolean
  onClick: () => void
}

export default function PostItem({
  post,
  isSelected,
  onClick,
}: PostItemProps) {
  console.log("Rendering PostItem", post._id, "Selected:", isSelected);
  const rawDetails = post.details ?? post.content ?? ""
  const rawSummary = post.summary ?? rawDetails

  const truncateText = (text: string, max: number) =>
    text.length <= max ? text : text.slice(0, max) + "…"

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <ListGroup.Item
      action
      onClick={onClick}
      // permanently apply Bootstrap's primary background & white text when selected
      className={`py-2 ${isSelected ? "bg-primary text-white" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between">
        <strong>{truncateText(rawSummary, 80)}</strong>
        <small className={isSelected ? "text-light" : "text-muted"}>
          {timeAgo}
        </small>
      </div>
      <div className="small text-truncate mt-1">
        {truncateText(rawDetails.replace(/<[^>]*>/g, ""), 120)}
      </div>
    </ListGroup.Item>
  )
}
