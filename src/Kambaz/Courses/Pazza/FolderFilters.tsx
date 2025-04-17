// import { useSelector, useDispatch } from "react-redux"
// import { setSelectedFolder } from "./reducer"
// import { ButtonGroup, Button } from "react-bootstrap"

// export default function FolderFilters() {
//   const dispatch = useDispatch()
//   const { selectedFolder } = useSelector((state: any) => state.pazzaReducer)

//   const handleFolderClick = (folderId: string | null) => {
//     dispatch(setSelectedFolder(folderId))
//   }

//   // All folders from the image
//   const folders = [
//     { id: "live_qa", name: "LIVE Q&A", disabled: true },
//     { id: "drafts", name: "Drafts", disabled: true },
//     { id: "inv1", name: "Inv1" },
//     { id: "inv2", name: "Inv2" },
//     { id: "inv3", name: "Inv3" },
//     { id: "inv4", name: "Inv4" },
//     { id: "inv5", name: "Inv5" },
//     { id: "inv6", name: "Inv6" },
//     { id: "project", name: "project" },
//     { id: "exam", name: "exam" },
//     { id: "logistics", name: "logistics" },
//     { id: "other", name: "other" },
//     { id: "office_hours", name: "office hours" },
//   ]

//   return (
//     <div className="folder-filters bg-light border-bottom py-2 px-3 sticky-top" 
//          style={{ zIndex: 90, top: "40px" }}>
//       <ButtonGroup className="flex-wrap gap-1">
//         {folders.map((folder) => (
//           <Button
//             key={folder.id}
//             variant="outline-dark"
//             size="sm"
//             disabled={folder.disabled}
//             className={`text-nowrap ${selectedFolder === folder.id ? "active" : ""}`}
//             onClick={() => !folder.disabled && handleFolderClick(folder.id)}
//           >
//             {folder.name}
//           </Button>
//         ))}
//       </ButtonGroup>
//     </div>
//   )
// }


// import { useSelector, useDispatch } from "react-redux";
// import { setSelectedFolder } from "./reducer";
// import { ButtonGroup, Button } from "react-bootstrap";

// export default function FolderFilters() {
//   const dispatch = useDispatch();
//   const { selectedFolder, folders } = useSelector((state: any) => state.pazzaReducer);
//   console.log("folders from redux:", folders);

//   const handleFolderClick = (folderId: string) => {
//     if (selectedFolder === folderId) {
//       dispatch(setSelectedFolder(null)); // Deselect to show all posts
//     } else {
//       dispatch(setSelectedFolder(folderId));
//     }
//   };

//   return (
//     <div
//       className="folder-filters bg-light border-bottom py-2 px-3 sticky-top"
//       style={{ zIndex: 90, top: "40px" }}
//     >
//       <ButtonGroup className="flex-wrap gap-1">
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
//   );
// }


import { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Button } from "react-bootstrap";

export default function FolderFilters({ onSelectFolder }: { onSelectFolder: (folderId: string | null) => void }) {
  const { folders } = useSelector((state: any) => state.pazzaReducer);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleFolderClick = (folderId: string) => {
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
      onSelectFolder(null); // Notify parent to show all posts
    } else {
      setSelectedFolder(folderId);
      onSelectFolder(folderId); // Notify parent to filter posts
    }
  };

  return (
    <div
      className="folder-filters bg-light border-bottom py-2 px-3 sticky-top"
      style={{ zIndex: 90, top: "40px" }}
    >
      <ButtonGroup className="flex-wrap gap-1">
        {folders.map((folder: any) => (
          <Button
            key={folder._id}
            variant="outline-dark"
            size="sm"
            className={`text-nowrap ${selectedFolder === folder._id ? "active" : ""}`}
            onClick={() => handleFolderClick(folder._id)}
          >
            {folder.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}