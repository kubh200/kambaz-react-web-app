// "use client"

// import { useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { useParams } from "react-router-dom"
// import { Form, Button, ListGroup } from "react-bootstrap"
// import { FaEdit, FaSave, FaTimes } from "react-icons/fa"
// import { createFolder, updateFolder, deleteFolder } from "../reducer"

// export default function ManageFolders() {
//   const dispatch = useDispatch()
//   const { cid } = useParams()
//   const { folders } = useSelector((state: any) => state.pazzaReducer)

//   const [newFolderName, setNewFolderName] = useState("")
//   const [editingFolder, setEditingFolder] = useState<string | null>(null)
//   const [editedFolderName, setEditedFolderName] = useState("")
//   const [selectedFolders, setSelectedFolders] = useState<string[]>([])

//   const handleAddFolder = async () => {
//     if (!newFolderName.trim()) return

//     try {
//       await dispatch(
//         createFolder({
//           name: newFolderName,
//           course: cid,
//         }) as any,
//       )
//       setNewFolderName("")
//     } catch (error) {
//       console.error("Error creating folder:", error)
//     }
//   }

//   const handleEditFolder = (folder: any) => {
//     setEditingFolder(folder._id)
//     setEditedFolderName(folder.name)
//   }

//   const handleSaveEdit = async (folderId: string) => {
//     if (!editedFolderName.trim()) return

//     try {
//       await dispatch(
//         updateFolder({
//           _id: folderId,
//           name: editedFolderName,
//         }) as any,
//       )
//       setEditingFolder(null)
//     } catch (error) {
//       console.error("Error updating folder:", error)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingFolder(null)
//   }

//   const handleDeleteSelected = async () => {
//     if (selectedFolders.length === 0) return

//     if (window.confirm(`Are you sure you want to delete ${selectedFolders.length} folder(s)?`)) {
//       try {
//         for (const folderId of selectedFolders) {
//           await dispatch(deleteFolder(folderId) as any)
//         }
//         setSelectedFolders([])
//       } catch (error) {
//         console.error("Error deleting folders:", error)
//       }
//     }
//   }

//   const toggleFolderSelection = (folderId: string) => {
//     setSelectedFolders((prev) => (prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]))
//   }

//   return (
//     <div className="pazza-manage-folders">
//       <h3>Configure Class Folders</h3>

//       <div className="pazza-add-folder mb-4">
//         <Form.Group className="d-flex">
//           <Form.Control
//             type="text"
//             placeholder="New folder name"
//             value={newFolderName}
//             onChange={(e) => setNewFolderName(e.target.value)}
//           />
//           <Button variant="primary" onClick={handleAddFolder} disabled={!newFolderName.trim()} className="ms-2">
//             Add Folder
//           </Button>
//         </Form.Group>
//       </div>

//       <div className="pazza-folders-list">
//         <div className="d-flex justify-content-between mb-2">
//           <h4>Current Folders</h4>
//           <Button variant="danger" onClick={handleDeleteSelected} disabled={selectedFolders.length === 0}>
//             Delete selected folders
//           </Button>
//         </div>

//         <ListGroup>
//           {folders.map((folder: any) => (
//             <ListGroup.Item key={folder._id} className="d-flex align-items-center">
//               <Form.Check
//                 type="checkbox"
//                 checked={selectedFolders.includes(folder._id)}
//                 onChange={() => toggleFolderSelection(folder._id)}
//                 className="me-3"
//               />

//               {editingFolder === folder._id ? (
//                 <>
//                   <Form.Control
//                     type="text"
//                     value={editedFolderName}
//                     onChange={(e) => setEditedFolderName(e.target.value)}
//                     className="me-2"
//                   />
//                   <Button
//                     variant="success"
//                     size="sm"
//                     onClick={() => handleSaveEdit(folder._id)}
//                     disabled={!editedFolderName.trim()}
//                   >
//                     <FaSave /> Save
//                   </Button>
//                   <Button variant="secondary" size="sm" onClick={handleCancelEdit} className="ms-1">
//                     <FaTimes /> Cancel
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <span className="flex-grow-1">{folder.name}</span>
//                   <Button variant="outline-primary" size="sm" onClick={() => handleEditFolder(folder)} className="me-1">
//                     <FaEdit /> Edit
//                   </Button>
//                 </>
//               )}
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Form, Button, ListGroup, Spinner } from "react-bootstrap"
import { FaEdit, FaSave, FaTimes } from "react-icons/fa"
import * as client from "../client" // 🧠 backend functions
import { fetchFolders } from "../reducer" // ✅ assuming fetchFolders updates pazzaReducer.folders

export default function ManageFolders() {
  const { cid } = useParams()
  const dispatch = useDispatch()
  const { folders } = useSelector((state: any) => state.pazzaReducer)

  const [loading, setLoading] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null)
  const [editedName, setEditedName] = useState("")
  const [selectedFolders, setSelectedFolders] = useState<string[]>([])

  useEffect(() => {
    if (cid) dispatch(fetchFolders(cid) as any)
  }, [cid, dispatch])

  const handleAddFolder = async () => {
    if (!newFolderName.trim() || !cid) return
    setLoading(true)
    try {
      await client.createFolder({ name: newFolderName, course: cid })
      await dispatch(fetchFolders(cid) as any)
      setNewFolderName("")
    } catch (err) {
      console.error("Error creating folder:", err)
    }
    setLoading(false)
  }

  const handleSaveEdit = async (folderId: string) => {
    if (!editedName.trim()) return
    setLoading(true)
    try {
      await client.updateFolder({ _id: folderId, name: editedName })
      await dispatch(fetchFolders(cid!) as any)
      setEditingFolderId(null)
    } catch (err) {
      console.error("Error updating folder:", err)
    }
    setLoading(false)
  }

  const handleDeleteSelected = async () => {
    if (!selectedFolders.length) return
    if (!window.confirm(`Delete ${selectedFolders.length} folder(s)?`)) return

    setLoading(true)
    try {
      for (const folderId of selectedFolders) {
        await client.deleteFolder(folderId)
      }
      await dispatch(fetchFolders(cid!) as any)
      setSelectedFolders([])
    } catch (err) {
      console.error("Error deleting folders:", err)
    }
    setLoading(false)
  }

  const toggleSelect = (folderId: string) => {
    setSelectedFolders(prev =>
      prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
    )
  }

  return (
    <div className="pazza-manage-folders">
      <h3>Configure Class Folders</h3>

      <Form className="d-flex mb-4 gap-2">
        <Form.Control
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
        />
        <Button onClick={handleAddFolder} disabled={!newFolderName.trim() || loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Add Folder"}
        </Button>
      </Form>

      <div className="d-flex justify-content-between mb-2">
        <h5>Current Folders</h5>
        <Button
          variant="danger"
          onClick={handleDeleteSelected}
          disabled={loading || selectedFolders.length === 0}
        >
          Delete Selected
        </Button>
      </div>

      <ListGroup>
        {folders.map((folder: any) => (
          <ListGroup.Item key={folder._id} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              checked={selectedFolders.includes(folder._id)}
              onChange={() => toggleSelect(folder._id)}
              className="me-3"
            />

            {editingFolderId === folder._id ? (
              <>
                <Form.Control
                  value={editedName}
                  onChange={e => setEditedName(e.target.value)}
                  className="me-2"
                />
                <Button
                  variant="success"
                  size="sm"
                  disabled={!editedName.trim()}
                  onClick={() => handleSaveEdit(folder._id)}
                >
                  <FaSave /> Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="ms-1"
                  onClick={() => setEditingFolderId(null)}
                >
                  <FaTimes /> Cancel
                </Button>
              </>
            ) : (
              <>
                <span className="flex-grow-1">{folder.name}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setEditingFolderId(folder._id)
                    setEditedName(folder.name)
                  }}
                >
                  <FaEdit /> Edit
                </Button>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

