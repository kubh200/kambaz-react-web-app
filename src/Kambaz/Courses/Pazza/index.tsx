// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import PazzaNavigation from "./Navigation"
// import FolderFilters from "./FolderFilters"
// import PostsList from "./PostList"
// import PostScreen from "./PostScreen"
// import { fetchFolders, fetchPosts } from "./reducer"
// import * as client from "./client"
// import "./pazza.css"

// export default function Pazza() {
//   const { cid } = useParams()
//   const dispatch = useDispatch()
//   const { isPostSidebarVisible } = useSelector((state: any) => state.pazzaReducer)
//   const [course, setCourse] = useState<any>(null)

//   // Fetch course details
//   useEffect(() => {
//     const fetchCourse = async () => {
//       if (cid) {
//         try {
//           const courseData = await client.fetchCourse(cid)
//           setCourse(courseData)
//         } catch (error) {
//           console.error("Error fetching course:", error)
//         }
//       }
//     }
//     fetchCourse()
//   }, [cid])

//   // Fetch posts and folders when component mounts
//   useEffect(() => {
//     if (cid) {
//       dispatch(fetchPosts(cid) as any)
//       dispatch(fetchFolders(cid) as any)
//     }
//   }, [dispatch, cid])

//   return (
//     <div className="pazza-container">
//       <PazzaNavigation courseName={course?.name || course?.number || "Course"} />
//       <div className="pazza-content">
//         <FolderFilters />
//         <div className="pazza-main-content">
//           {isPostSidebarVisible && <PostsList />}
//           <PostScreen />
//         </div>
//       </div>
//     </div>
//   )
// }
// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import PazzaNavigation from "./Navigation"
// import FolderFilters from "./FolderFilters"
// import PostsList from "./PostList"
// import PostScreen from "./PostScreen"
// import { fetchFolders, fetchPosts } from "./reducer"
// import * as client from "./client"
// import "./pazza.css"

// export default function Pazza() {
//   const { cid } = useParams()
//   const dispatch = useDispatch()
//   const { isPostSidebarVisible } = useSelector((state: any) => state.pazzaReducer)
//   const [course, setCourse] = useState<any>(null)

//   // Fetch course details
//   useEffect(() => {
//     const fetchCourse = async () => {
//       if (cid) {
//         try {
//           const courseData = await client.fetchCourse(cid)
//           setCourse(courseData)
//         } catch (error) {
//           console.error("Error fetching course:", error)
//         }
//       }
//     }
//     fetchCourse()
//   }, [cid])

//   // Fetch posts and folders when component mounts
//   useEffect(() => {
//     if (cid) {
//       dispatch(fetchPosts(cid) as any)
//       dispatch(fetchFolders(cid) as any)
//     }
//   }, [dispatch, cid])

//   return (
//     <div className="pazza-container">
//       <PazzaNavigation />
//       <div className="pazza-content">
//         <FolderFilters />
//         <div className="pazza-main-content">
//           {isPostSidebarVisible && <PostsList />}
//           <PostScreen />
//         </div>
//       </div>
//     </div>
//   )
// }
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import PazzaNavigation from "./Navigation"
import FolderFilters from "./FolderFilters"
import PostsList from "./PostList"
import PostScreen from "./PostScreen"
import { fetchFolders } from "./reducer"
import { Container, Row, Col } from "react-bootstrap"
import "./pazza.css"

export default function Pazza() {
  const { cid } = useParams()
  const dispatch = useDispatch()
  const { isPostSidebarVisible } = useSelector((state: any) => state.pazzaReducer)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showNewPost, setShowNewPost] = useState(false) // ✅ new local state

  useEffect(() => {
    if (cid) {
      // dispatch(fetchPosts(cid) as any)
      dispatch(fetchFolders(cid) as any)
      setSelectedFolder(null)
      setShowNewPost(false) // ✅ reset when course changes
    }
  }, [dispatch, cid])

  return (
    <div className="d-flex flex-column vh-100">
      <PazzaNavigation />
      <FolderFilters onSelectFolder={setSelectedFolder}/>
      
      <Container fluid className="flex-grow-1 overflow-hidden">
        <Row className="h-100 g-0">
          {isPostSidebarVisible && (
            <Col md={3} className="border-end h-100 overflow-auto">
              <PostsList 
              selectedFolder={selectedFolder}
              onNewPostClick={() => setShowNewPost(true)}/>
            </Col>
          )}
          <Col className="h-100 overflow-auto">
            <PostScreen 
              showNewPost={showNewPost}
              setShowNewPost={setShowNewPost}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}