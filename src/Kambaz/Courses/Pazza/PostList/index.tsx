import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsCaretLeft, BsCaretRight, BsPlus, BsSearch } from "react-icons/bs";
import PostsAccordion from "./PostAccordion";
import { groupPostsByDateCategory } from "../utils";
import { fetchPosts } from "../reducer";

function useGroupedPosts(posts: any[], folder: string | null, search: string) {
  return useMemo(() => {
    let visible = posts;

    if (folder) {
      visible = visible.filter(p => {
        // Check if the post has folders array and it includes the selected folder
        return p.folders && Array.isArray(p.folders) && p.folders.includes(folder);
      });
    }

    if (search) {
      visible = visible.filter(p =>
        p.summary.toLowerCase().includes(search.toLowerCase()) ||
        p.details.toLowerCase().includes(search.toLowerCase())
      );
    }

    const obj = groupPostsByDateCategory(visible);
    return Object.entries(obj).map(([label, posts]) => ({ label, posts }));
  }, [posts, folder, search]);
}

export default function PostsList({ selectedFolder, onNewPostClick }: { 
  selectedFolder: string | null; 
  onNewPostClick: () => void; 
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { posts } = useSelector((state: any) => state.pazzaReducer);

  // const groups = useGroupedPosts(posts, selectedFolder, searchQuery);
  const normalizedPosts = useMemo(() => {
    return posts.map((post: any) => ({
      ...post,
      folders: Array.isArray(post.folders)
        ? post.folders
        : post.folder
        ? [post.folder]
        : [],
    }));
  }, [posts]);
  
  const groups = useGroupedPosts(normalizedPosts, selectedFolder, searchQuery);

  useEffect(() => {
    if (cid) {
      dispatch(fetchPosts(cid) as any);
    }
  }, [cid, dispatch]);

  return (
    <div className="d-flex h-100">
      <Button 
        variant="link" 
        className="p-0 border-end bg-light align-self-start" 
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        style={{ 
          position: "sticky",
          left: 0,
          zIndex: 100,
          height: "40px"
        }}
      >
        {isSidebarVisible ? (
          <BsCaretLeft className="fs-5" />
        ) : (
          <BsCaretRight className="fs-5" />
        )}
      </Button>

      <div 
        className={`h-100 bg-white border-end d-flex flex-column`}
        style={{ 
          width: isSidebarVisible ? "300px" : "0",
          overflow: "hidden",
          transition: "width 0.3s ease",
          position: "relative"
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
            variant={activeTab === "unresolved" ? "primary" : "outline-secondary"}
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
            onClick={onNewPostClick}
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
            <PostsAccordion groups={groups} />
          )}
        </div>
      </div>
    </div>
  );
}
