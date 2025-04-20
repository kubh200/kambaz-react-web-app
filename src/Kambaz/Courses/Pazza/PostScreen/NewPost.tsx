"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { Form, Button, Tab, Tabs, Badge } from "react-bootstrap"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as client from "../client"
import { createPost, fetchPosts } from "../reducer"

interface Folder {
  _id: string
  name: string
  course: string
}

interface User {
  _id: string
  firstName: string
  lastName: string
  role: string
}

export default function NewPost({ onCancel }: { onCancel: () => void }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cid } = useParams()
  const { folders } = useSelector((state: any) => state.pazzaReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [userError, setUserError] = useState<string | null>(null)

  // Form state
  const [postType, setPostType] = useState<"QUESTION" | "NOTE">("QUESTION")
  const [visibility, setVisibility] = useState<"ENTIRE_CLASS" | "SELECTED_USERS">("ENTIRE_CLASS")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedFolders, setSelectedFolders] = useState<string[]>([])
  const [summary, setSummary] = useState("")
  const [details, setDetails] = useState("")
  const [sendEmail, setSendEmail] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'code-block'],
      ['clean']
    ]
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!cid || visibility !== "SELECTED_USERS") return
      
      console.log("Starting to fetch users")
      setIsLoadingUsers(true)
      setUserError(null)
      try {
        console.log("Fetching users for course:", cid)
        const userData = await client.fetchCourseUsers(cid)
        console.log("Received user data:", userData)
        
        if (Array.isArray(userData)) {
          setUsers(userData)
          console.log("Users set successfully")
        } else {
          console.error("Invalid user data format:", userData)
          throw new Error("Invalid user data received")
        }
      } catch (error) {
        console.error("Error in fetchData:", error)
        setUserError("Failed to load users. Please try again.")
        setVisibility("ENTIRE_CLASS")
        setSelectedUsers([])
      } finally {
        setIsLoadingUsers(false)
        console.log("Fetch operation completed")
      }
    }

    if (visibility === "SELECTED_USERS") {
      console.log("Visibility changed to SELECTED_USERS, fetching users")
      fetchData()
    }
  }, [cid, visibility])

  const handleFolderToggle = (folderId: string) => {
    setSelectedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    )
  }

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!summary.trim()) newErrors.summary = "Summary is required"
    if (!details.trim()) newErrors.details = "Details are required"
    if (selectedFolders.length === 0) newErrors.folders = "Select at least one folder"
    if (visibility === "SELECTED_USERS" && selectedUsers.length === 0)
      newErrors.users = "Select at least one user"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      const newPost = {
        type: postType,
        summary,
        details,
        author: currentUser.firstName + " " + currentUser.lastName,
        authorRole: currentUser.role,
        course: cid,
        folders: selectedFolders,
        visibility,
        visibleTo: visibility === "SELECTED_USERS" ? selectedUsers : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // views: [],
        answers: [],
      }

      await dispatch(createPost(newPost) as any)
      if (cid) {
        await dispatch(fetchPosts(cid) as any)
      }
      onCancel() // Close the new post screen
    } catch (error) {
      console.error("Error creating post:", error)
      setErrors({ submit: "Failed to create post. Please try again." })
    }
  }

  const handleManageFolders = () => {
    navigate(`/Kambaz/courses/${cid}/pazza/manage-folders`)
  }

  const handleVisibilityChange = (newVisibility: "ENTIRE_CLASS" | "SELECTED_USERS") => {
    console.log("Visibility change requested:", newVisibility)
    
    if (newVisibility === "SELECTED_USERS" && !users.length) {
      console.log("Switching to SELECTED_USERS, no users loaded yet")
      setVisibility(newVisibility)
    } else if (newVisibility === "ENTIRE_CLASS") {
      console.log("Switching back to ENTIRE_CLASS")
      setVisibility(newVisibility)
      setSelectedUsers([])
      setUserError(null)
    } else {
      console.log("Setting visibility to:", newVisibility)
      setVisibility(newVisibility)
    }
  }

  // Add debug render logging
  console.log("Rendering NewPost with state:", {
    visibility,
    usersCount: users.length,
    isLoadingUsers,
    hasError: !!userError
  })

  return (
    <div className="p-4">
      <Tabs activeKey={postType} onSelect={(k) => setPostType(k as "QUESTION" | "NOTE")} className="mb-3">
        <Tab eventKey="QUESTION" title="Question" />
        <Tab eventKey="NOTE" title="Note" />
      </Tabs>

      <Form>
        <Form.Group>
          <Form.Label>Post To*</Form.Label>
          <div className="d-flex gap-3">
            <Form.Check
              inline
              type="radio"
              id="entire-class"
              label="Entire Class"
              checked={visibility === "ENTIRE_CLASS"}
              onChange={() => handleVisibilityChange("ENTIRE_CLASS")}
            />
            <Form.Check
              inline
              type="radio"
              id="selected-users"
              label="Individual Student(s)/Instructor(s)"
              checked={visibility === "SELECTED_USERS"}
              onChange={() => handleVisibilityChange("SELECTED_USERS")}
            />
          </div>
        </Form.Group>

        {visibility === "SELECTED_USERS" && (
          <Form.Group className="mb-3">
            <Form.Label>Select Users</Form.Label>

            {users.filter(user => user && user._id && user.firstName && user.lastName).length === 0 ? (
              <div className="text-muted">No users available.</div>
              ) : (
              <div className="d-flex flex-wrap gap-2">
                {users
                  .filter((user) => user && user._id && user.firstName && user.lastName)
                  .map((user) => {
                    const label = `${user.firstName} ${user.lastName} (${user.role})`;
                    return (
                      <Form.Check
                        key={user._id}
                        type="checkbox"
                        label={label}
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleUserToggle(user._id)}
                      />
                    );
                  })}
              </div>
            )}
            {errors.users && <div className="text-danger">{errors.users}</div>}
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Select Folder(s)*</Form.Label>
          <div>
            <div className="d-flex flex-wrap gap-2 mb-1">
              {folders.map((folder: Folder) => (
                <Badge
                  key={folder._id}
                  bg={selectedFolders.includes(folder._id) ? "primary" : "secondary"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFolderToggle(folder._id)}
                >
                  {folder.name}
                </Badge>
              ))}
            </div>
            <div>
              <Button 
                variant="link" 
                className="p-0 text-decoration-none" 
                onClick={handleManageFolders}
                style={{ fontSize: '0.875rem' }}
              >
                Manage and reorder folders
              </Button>
            </div>
          </div>
          {errors.folders && <div className="text-danger">{errors.folders}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Summary*</Form.Label>
          <Form.Control
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter a one line summary, 100 characters or less"
            maxLength={100}
          />
          <Form.Text>{summary.length}/100 characters</Form.Text>
          {errors.summary && <div className="text-danger">{errors.summary}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Details*</Form.Label>
          <div className="border rounded">
            <ReactQuill
              theme="snow"
              value={details}
              onChange={setDetails}
              modules={modules}
              className="bg-white"
              style={{ height: '300px' }}
            />
          </div>
          {errors.details && <div className="text-danger">{errors.details}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Send email notifications immediately"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
          />
        </Form.Group>

        {errors.submit && <div className="text-danger mb-3">{errors.submit}</div>}

        <div className="d-flex gap-2">
          <Button variant="primary" onClick={handleSubmit}>
            Post My {postType === "QUESTION" ? "Question" : "Note"}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}