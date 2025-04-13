// "use client"

// import { useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { FaChevronLeft, FaPlus } from "react-icons/fa"
// import { togglePostSidebar, setSelectedPost, setIsCreatingNewPost } from "../reducer"
// import PostItem from "./PostItem"
// import { groupPostsByDateCategory } from "../utils"

// export default function PostsList() {
//   const dispatch = useDispatch()
//   const { posts, selectedPost, selectedFolder } = useSelector((state: any) => state.pazzaReducer)
//   const { currentUser } = useSelector((state: any) => state.accountReducer)
//   const [searchText, setSearchText] = useState("")

//   // Filter posts by selected folder and search text
//   const filteredPosts = posts.filter((post: any) => {
//     const folderMatch = selectedFolder ? post.folders.includes(selectedFolder) : true
//     const searchMatch = searchText
//       ? post.summary.toLowerCase().includes(searchText.toLowerCase()) ||
//         post.details.toLowerCase().includes(searchText.toLowerCase())
//       : true

//     // Check if post is visible to current user
//     const visibilityMatch =
//       post.visibility === "ENTIRE_CLASS" ||
//       (post.visibility === "SELECTED_USERS" && post.visibleTo.includes(currentUser._id))

//     return folderMatch && searchMatch && visibilityMatch
//   })

//   // Group posts by date
//   const groupedPosts = groupPostsByDateCategory(filteredPosts)

//   const handleToggleSidebar = () => {
//     dispatch(togglePostSidebar())
//   }

//   const handlePostClick = (postId: string) => {
//     dispatch(setSelectedPost(postId))
//   }

//   const handleNewPost = () => {
//     dispatch(setIsCreatingNewPost(true))
//     dispatch(setSelectedPost(null))
//   }

//   return (
//     <div className="pazza-posts-list">
//       <div className="pazza-posts-controls">
//         <div className="pazza-toggle-sidebar" onClick={handleToggleSidebar}>
//           <FaChevronLeft />
//         </div>
//         <div className="pazza-posts-filters">
//           <span className="pazza-posts-filter disabled">Unread</span>
//           <span className="pazza-posts-filter disabled">Updated</span>
//           <span className="pazza-posts-filter disabled">Unresolved</span>
//           <span className="pazza-posts-filter disabled">Following</span>
//         </div>
//       </div>
//       <div className="pazza-posts-actions">
//         <button className="pazza-new-post-btn" onClick={handleNewPost}>
//           <FaPlus /> New Post
//         </button>
//         <div className="pazza-search-container">
//           <input
//             type="text"
//             className="pazza-search-input"
//             placeholder="Search posts..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="pazza-posts-list-content">
//         {Object.entries(groupedPosts).map(([dateGroup, posts]) => (
//           <div key={dateGroup} className="pazza-posts-group">
//             <div className="pazza-posts-group-header">
//               <span>{dateGroup}</span>
//             </div>
//             <div className="pazza-posts-group-items">
//               {posts.map((post: any) => (
//                 <PostItem
//                   key={post._id}
//                   post={post}
//                   isSelected={selectedPost === post._id}
//                   onClick={() => handlePostClick(post._id)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// import { useState } from "react"
// import { useSelector } from "react-redux"
// import { Button } from "react-bootstrap"
// import { BsCaretLeft, BsCaretRight } from "react-icons/bs"
// import PostItem from "./PostItem"

// export default function PostsList() {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true)
//   const { posts, selectedFolder } = useSelector((state: any) => state.pazzaReducer)

//   const filteredPosts = selectedFolder
//     ? posts.filter((post: any) => post.folders.includes(selectedFolder))
//     : posts

//   return (
//     <div className={`border-end h-100 ${isSidebarVisible ? "d-flex flex-column" : "d-none"}`}>
//       <div className="pazza-posts-controls bg-light border-bottom p-2 d-flex align-items-center">
//         <Button 
//           variant="link" 
//           className="p-0 me-2" 
//           onClick={() => setIsSidebarVisible(!isSidebarVisible)}
//           aria-label="Toggle posts sidebar"
//         >
//           {isSidebarVisible ? (
//             <BsCaretLeft className="fs-5" />
//           ) : (
//             <BsCaretRight className="fs-5" />
//           )}
//         </Button>
//         <div className="flex-grow-1">
//           {/* Optional controls can be added here */}
//         </div>
//       </div>
      
//       <div className="overflow-auto flex-grow-1">
//         {filteredPosts.map((post: any) => (
//           <PostItem 
//             key={post._id}
//             post={post}
//             isSelected={false}
//             onClick={() => {/* Handle selection */}}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, InputGroup } from "react-bootstrap"
import { BsCaretLeft, BsCaretRight, BsPlus, BsSearch } from "react-icons/bs"
// import PostItem from "./PostItem"
import { posts as seedPosts } from "../../../Database";
import { useMemo } from "react";
import { groupPostsByDateCategory } from "../utils";
import PostsAccordion from "./PostAccordion";
import { setPosts } from "../reducer";

function useGroupedPosts(posts: any[], folder: string | null, search: string) {
  return useMemo(() => {
    // 1. filter by folder + search text
    let visible = posts;
    if (folder) visible = visible.filter(p => p.folders.includes(folder));
    if (search)
      visible = visible.filter(p =>
        p.content.toLowerCase().includes(search.toLowerCase())
      );

    // 2. turn the object { Today:[…], Yesterday:[…], … } into an array
    const obj = groupPostsByDateCategory(visible);
    return Object.entries(obj).map(([label, posts]) => ({ label, posts }));
  }, [posts, folder, search]);
}

export default function PostsList() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { posts,selectedFolder } = useSelector((state: any) => state.pazzaReducer)
  const groups = useGroupedPosts(posts, selectedFolder, searchQuery);
  const dispatch = useDispatch();

  /** Seed the store exactly once */
  useEffect(() => {
    dispatch(setPosts(seedPosts));
  }, [dispatch]);

  // const filteredPosts = selectedFolder
  //   ? posts.filter((post: any) => (
  //       post.folders.includes(selectedFolder) &&
  //       post.content.toLowerCase().includes(searchQuery.toLowerCase())
  //   ))
  //   : posts.filter((post: any) => (
  //       post.content.toLowerCase().includes(searchQuery.toLowerCase())
  //   ))

  return (
    <div className="d-flex h-100">
      {/* Always visible toggle button */}
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

      {/* Collapsible sidebar content */}
      <div 
        className={`h-100 bg-white border-end d-flex flex-column`}
        style={{ 
          width: isSidebarVisible ? "300px" : "0",
          overflow: "hidden",
          transition: "width 0.3s ease",
          position: "relative"
        }}
      >
        {/* Filter tabs row */}
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
          <Button
            variant={activeTab === "following" ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => setActiveTab("following")}
          >
            Following
          </Button>
        </div>

        <div className="d-flex align-items-center gap-2 p-2 border-bottom bg-light">
          {/* fixed‑width button */}
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center flex-shrink-0"
          >
            <BsPlus className="me-1" />
            New Post
          </Button>

          {/* search bar takes the rest of the row */}
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
        
        {/* <div className="overflow-auto flex-grow-1">
          {filteredPosts.map((post: any) => (
            <PostItem 
              key={post._id}
              post={post}
              isSelected={false}
              onClick={() => {/* Handle selection */}
              {/* }/>))} */}
        {/* </div> */} 
        {/* Posts list */}
        <div className="overflow-auto flex-grow-1">
          {groups.length === 0 ? (
            <div className="p-3 text-muted">No posts found.</div>
          ) : (
            <PostsAccordion groups={groups} />
          )}
        </div>
      </div>
    </div>
  )
}