// "use client"

import { formatDistanceToNow } from "date-fns"

interface PostItemProps {
  post: any
  isSelected: boolean
  onClick: () => void
}

// export default function PostItem({ post, isSelected, onClick }: PostItemProps) {
//   const truncateText = (text: string, maxLength: number) => {
//     if (text.length <= maxLength) return text
//     return text.substring(0, maxLength) + "..."
//   }

//   const createdAt = new Date(post.createdAt)
//   const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

//   return (
//     <div className={`pazza-post-item ${isSelected ? "selected" : ""}`} onClick={onClick}>
//       <div className="pazza-post-item-header">
//         <div className="pazza-post-item-title">{post.summary}</div>
//         <div className="pazza-post-item-meta">
//           <span className="pazza-post-item-author-role">
//             {post.authorRole === "FACULTY" ? "Instructor" : "Student"}
//           </span>
//         </div>
//       </div>
//       <div className="pazza-post-item-content">{truncateText(post.details.replace(/<[^>]*>/g, ""), 150)}</div>
//       <div className="pazza-post-item-footer">
//         <span className="pazza-post-item-time">{timeAgo}</span>
//       </div>
//     </div>
//   )
// }

export default function PostItem({ post, isSelected, onClick }: PostItemProps) {
  const rawDetails = post.details ?? post.content ?? "";
  const rawSummary = post.summary ?? rawDetails;

  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "…";

  const createdAt = new Date(post.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <div
      className={`pazza-post-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="pazza-post-item-header">
        <div className="pazza-post-item-title">
          {truncateText(rawSummary, 80)}
        </div>

        <div className="pazza-post-item-meta">
          <span className="pazza-post-item-author-role">
            {post.authorRole === "FACULTY" ? "Instructor" : "Student"}
          </span>
        </div>
      </div>

      <div className="pazza-post-item-content">
        {truncateText(rawDetails.replace(/<[^>]*>/g, ""), 150)}
      </div>

      <div className="pazza-post-item-footer">
        <span className="pazza-post-item-time">{timeAgo}</span>
      </div>
    </div>
  );
}
