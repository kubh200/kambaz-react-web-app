// "use client"
// import { useSelector, useDispatch } from "react-redux"
// import { setSelectedFolder } from "./reducer"

// export default function FolderFilters() {
//   const dispatch = useDispatch()
//   const { folders, selectedFolder } = useSelector((state: any) => state.pazzaReducer)

//   const handleFolderClick = (folderId: string) => {
//     dispatch(setSelectedFolder(folderId === selectedFolder ? null : folderId))
//   }

//   return (
//     <div className="pazza-folder-filters">
//       <div className="pazza-folder-filters-inner">
//         <span className="pazza-folder-filter disabled">Live Q&A</span>
//         <span className="pazza-folder-filter disabled">Drafts</span>
//         <div className="pazza-folder-divider"></div>
//         {folders.map((folder: any) => (
//           <span
//             key={folder._id}
//             className={`pazza-folder-filter ${selectedFolder === folder._id ? "active" : ""}`}
//             onClick={() => handleFolderClick(folder._id)}
//           >
//             {folder.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

// "use client"
// import { useSelector, useDispatch } from "react-redux"
// import { setSelectedFolder } from "./reducer"

// export default function FolderFilters() {
//   const dispatch = useDispatch()
//   const { folders, selectedFolder } = useSelector((state: any) => state.pazzaReducer)

//   const handleFolderClick = (folderId: string) => {
//     dispatch(setSelectedFolder(folderId === selectedFolder ? null : folderId))
//   }

//   // Default folders that appear in Piazza
//   const defaultFolders = [
//     { id: "live_qa", name: "LIVE Q&A", disabled: true },
//     { id: "drafts", name: "Drafts", disabled: true },
//     { id: "hw1", name: "Hw1", disabled: false },
//     { id: "drafts", name: "Drafts", disabled: true },
//   ]

//   return (
//     <div className="pazza-folder-filters">
//       <div className="pazza-folder-filters-inner">
//         {defaultFolders.map((folder) => (
//           <span key={folder.id} className={`pazza-folder-filter ${folder.disabled ? "disabled" : ""}`}>
//             {folder.name}
//           </span>
//         ))}
//         <div className="pazza-folder-divider"></div>
//         {folders.map((folder: any) => (
//           <span
//             key={folder._id}
//             className={`pazza-folder-filter ${selectedFolder === folder._id ? "active" : ""}`}
//             onClick={() => handleFolderClick(folder._id)}
//           >
//             {folder.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }
// import { useSelector, useDispatch } from "react-redux"
// import { setSelectedFolder } from "./reducer"

// export default function FolderFilters() {
//   const dispatch = useDispatch()
//   const { folders, selectedFolder } = useSelector((state: any) => state.pazzaReducer)

//   const handleFolderClick = (folderId: string | null) => {
//     dispatch(setSelectedFolder(folderId))
//   }

//   // Default folders that appear in Piazza
//   const defaultFolders = [
//     { id: null, name: "All Posts", disabled: false },
//     { id: "live_qa", name: "LIVE Q&A", disabled: true },
//     { id: "drafts", name: "Drafts", disabled: true },
//   ]

//   return (
//     <div className="pazza-folder-filters">
//       <div className="pazza-folder-filters-inner">
//         {defaultFolders.map((folder) => (
//           <span
//             key={folder.id}
//             className={`pazza-folder-filter 
//               ${folder.disabled ? "disabled" : ""} 
//               ${selectedFolder === folder.id ? "active" : ""}`}
//             onClick={() => !folder.disabled && handleFolderClick(folder.id)}
//           >
//             {folder.name}
//           </span>
//         ))}
//         <div className="pazza-folder-divider"></div>
//         {folders.map((folder: any) => (
//           <span
//             key={folder._id}
//             className={`pazza-folder-filter ${selectedFolder === folder._id ? "active" : ""}`}
//             onClick={() => handleFolderClick(folder._id)}
//           >
//             {folder.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }
// import { useSelector, useDispatch } from "react-redux"
// import { setSelectedFolder } from "./reducer"
// import { ButtonGroup, Button } from "react-bootstrap"

// export default function FolderFilters() {
//   const dispatch = useDispatch()
//   const { folders, selectedFolder } = useSelector((state: any) => state.pazzaReducer)

//   const handleFolderClick = (folderId: string | null) => {
//     dispatch(setSelectedFolder(folderId))
//   }

//   // Default folders that appear in Piazza
//   const defaultFolders = [
//     { id: "live_qa", name: "LIVE Q&A", disabled: true },
//     { id: "drafts", name: "Drafts", disabled: true },
//   ]

//   return (
//     <div className="folder-filters bg-light border-bottom py-2 px-3 sticky-top" 
//          style={{ zIndex: 90, top: "40px" }}>
//       <ButtonGroup className="flex-wrap gap-1">
//         {defaultFolders.map((folder) => (
//           <Button
//             key={folder.id}
//             variant="outline-dark"
//             size="sm"
//             disabled={folder.disabled}
//             className={`text-nowrap ${selectedFolder === folder.id ? "active" : ""}`}
//           >
//             {folder.name}
//           </Button>
//         ))}
        
//         {folders.map((folder: any) => (
//           <Button
//             key={folder._id}
//             variant="outline-dark"
//             size="sm"
//             className={`text-nowrap ${selectedFolder === folder._id ? "active" : ""}`}
//             onClick={() => handleFolderClick(folder._id)}
//           >
//             {folder.name}
//           </Button>
//         ))}
//       </ButtonGroup>
//     </div>
//   )
// }
import { useSelector, useDispatch } from "react-redux"
import { setSelectedFolder } from "./reducer"
import { ButtonGroup, Button } from "react-bootstrap"

export default function FolderFilters() {
  const dispatch = useDispatch()
  const { selectedFolder } = useSelector((state: any) => state.pazzaReducer)

  const handleFolderClick = (folderId: string | null) => {
    dispatch(setSelectedFolder(folderId))
  }

  // All folders from the image
  const folders = [
    { id: "live_qa", name: "LIVE Q&A", disabled: true },
    { id: "drafts", name: "Drafts", disabled: true },
    { id: "inv1", name: "Inv1" },
    { id: "inv2", name: "Inv2" },
    { id: "inv3", name: "Inv3" },
    { id: "inv4", name: "Inv4" },
    { id: "inv5", name: "Inv5" },
    { id: "inv6", name: "Inv6" },
    { id: "project", name: "project" },
    { id: "exam", name: "exam" },
    { id: "logistics", name: "logistics" },
    { id: "other", name: "other" },
    { id: "office_hours", name: "office hours" },
  ]

  return (
    <div className="folder-filters bg-light border-bottom py-2 px-3 sticky-top" 
         style={{ zIndex: 90, top: "40px" }}>
      <ButtonGroup className="flex-wrap gap-1">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant="outline-dark"
            size="sm"
            disabled={folder.disabled}
            className={`text-nowrap ${selectedFolder === folder.id ? "active" : ""}`}
            onClick={() => !folder.disabled && handleFolderClick(folder.id)}
          >
            {folder.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}