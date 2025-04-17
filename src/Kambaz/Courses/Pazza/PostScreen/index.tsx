import { useSelector } from "react-redux"
import ClassAtGlance from "./ClassAtGlance"
import ViewPost from "./ViewPost"
import NewPost from "./NewPost"

export default function PostScreen({
  showNewPost,
  setShowNewPost,
}: {
  showNewPost: boolean
  setShowNewPost: (val: boolean) => void
}) {
  const { selectedPost } = useSelector((state: any) => state.pazzaReducer)

  if (showNewPost) {
    return <NewPost onCancel={() => setShowNewPost(false)} />
  } else if (selectedPost) {
    return <ViewPost />
  } else {
    return <ClassAtGlance />
  }
}

// export default function PostScreen() {
//   const { selectedPost, isCreatingNewPost } = useSelector((state: any) => state.pazzaReducer)

//   // Render the appropriate component based on state
//   if (isCreatingNewPost) {
//     return <NewPost />
//   } else if (selectedPost) {
//     return <ViewPost />
//   } else {
//     return <ClassAtGlance />
//   }
// }

