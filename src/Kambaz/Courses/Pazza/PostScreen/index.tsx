import { useSelector } from "react-redux"
import ClassAtGlance from "./ClassAtGlance"
import ViewPost from "./ViewPost"
import NewPost from "./NewPost"

export default function PostScreen() {
  const { selectedPost, isCreatingNewPost } = useSelector((state: any) => state.pazzaReducer)

  // Render the appropriate component based on state
  if (isCreatingNewPost) {
    return <NewPost />
  } else if (selectedPost) {
    return <ViewPost />
  } else {
    return <ClassAtGlance />
  }
}

