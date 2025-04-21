// PostsList.tsx
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BsCaretLeft, BsCaretRight, BsPlus, BsSearch } from "react-icons/bs"
import PostsAccordion from "./PostAccordion"
import { groupPostsByDateCategory } from "../utils"
import { fetchPosts, setSelectedPost } from "../reducer"


function useGroupedPosts(posts: any[], folder: string | null, search: string) {
  return useMemo(() => {
    let visible = posts

    if (folder) {
      visible = visible.filter(p =>
        Array.isArray(p.folders) && p.folders.includes(folder)
      )
    }
    if (search) {
      const q = search.toLowerCase()
      visible = visible.filter(
        p =>
          p.summary.toLowerCase().includes(q) ||
          p.details.toLowerCase().includes(q)
      )
    }

    const obj = groupPostsByDateCategory(visible)
    return Object.entries(obj).map(([label, posts]) => ({ label, posts }))
  }, [posts, folder, search])
}

export default function PostsList({
  selectedFolder,
  onNewPostClick,
}: {
  selectedFolder: string | null
  onNewPostClick: () => void
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()
  const { cid } = useParams<{ cid: string }>()
  // const { cid, postId } = useParams<{ cid: string; postId?: string }>();
  // const { posts, selectedPost } = useSelector((s: any) => s.pazzaReducer)
  const { posts } = useSelector((s: any) => s.pazzaReducer);
  const navigate = useNavigate()
  const location = useLocation();
  const match = location.pathname.match(/\/posts\/([^/]+)/);
  const postId = match ? match[1] : null;
  // normalize legacy `post.folder` → `post.folders`
  const normalizedPosts = useMemo(
    () =>
      posts.map((post: any) => ({
        ...post,
        folders: Array.isArray(post.folders)
          ? post.folders
          : post.folder
          ? [post.folder]
          : [],
      })),
    [posts]
  )

  const groups = useGroupedPosts(normalizedPosts, selectedFolder, searchQuery)

  useEffect(() => {
    if (cid) dispatch(fetchPosts(cid) as any)
  }, [cid, dispatch])
  // useEffect(() => {
  //   if (!postId) {
  //     dispatch(setSelectedPost(null));
  //   }
  // }, [postId, dispatch]);

  const handlePostClick = (postId: string) => {
    // dispatch(setSelectedPost(postId))
    navigate(`/Kambaz/Courses/${cid}/Pazza/posts/${postId}`)
  }

  const handleNewPostClick = () => {
    dispatch(setSelectedPost(null)); // Clear selected post in Redux
    navigate(`/Kambaz/Courses/${cid}/Pazza`); // Navigate to base Pazza screen
    onNewPostClick(); // Optional: toggle composer if needed
  };

  console.log("Current route postId:", postId);

  return (
    <div className="d-flex h-100">
      {/* toggle sidebar */}
      <Button
        variant="link"
        className="p-0 border-end bg-light align-self-start"
        onClick={() => setIsSidebarVisible(v => !v)}
        style={{ position: "sticky", left: 0, zIndex: 100, height: 40 }}
      >
        {isSidebarVisible ? (
          <BsCaretLeft className="fs-5" />
        ) : (
          <BsCaretRight className="fs-5" />
        )}
      </Button>

      <div
        className="h-100 bg-white border-end d-flex flex-column"
        style={{
          width: isSidebarVisible ? 300 : 0,
          overflow: "hidden",
          transition: "width 0.3s ease",
          position: "relative",
        }}
      >
        <div className="pazza-posts-controls bg-light border-bottom p-2 d-flex gap-1">
          <Button
            variant={activeTab === "unread" ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </Button>
          <Button
            variant={activeTab === "updated" ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setActiveTab("updated")}
          >
            Updated
          </Button>
          <Button
            variant={
              activeTab === "unresolved" ? "primary" : "outline-secondary"
            }
            size="sm"
            onClick={() => setActiveTab("unresolved")}
          >
            Unresolved
          </Button>
        </div>

        <div className="d-flex align-items-center gap-2 p-2 border-bottom bg-light">
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center flex-shrink-0"
            onClick={handleNewPostClick}
          >
            <BsPlus className="me-1" />
            New Post
          </Button>

          <InputGroup size="sm" className="flex-grow-1">
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search posts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="overflow-auto flex-grow-1">
          {groups.length === 0 ? (
            <div className="p-3 text-muted">No posts found.</div>
          ) : (
            <PostsAccordion
              groups={groups}
              selectedPost={postId ?? null}
              onPostClick={handlePostClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}
