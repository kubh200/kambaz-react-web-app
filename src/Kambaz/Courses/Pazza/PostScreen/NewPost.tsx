"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Form, Button, Tab, Tabs } from "react-bootstrap"
import { Editor } from "@tinymce/tinymce-react"
import { createPost, setIsCreatingNewPost, setSelectedPost } from "../reducer"
import * as client from "../client"

export default function NewPost() {
  const dispatch = useDispatch()
  const { cid } = useParams()
  const { folders } = useSelector((state: any) => state.pazzaReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  const [users, setUsers] = useState<any[]>([])

  // Form state
  const [postType, setPostType] = useState<"QUESTION" | "NOTE">("QUESTION")
  const [visibility, setVisibility] = useState<"ENTIRE_CLASS" | "SELECTED_USERS">("ENTIRE_CLASS")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedFolders, setSelectedFolders] = useState<string[]>([])
  const [summary, setSummary] = useState("")
  const [details, setDetails] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Fetch users for the course
  useEffect(() => {
    const fetchUsers = async () => {
      if (cid) {
        try {
          const usersData = await client.fetchCourseUsers(cid)
          setUsers(usersData)
        } catch (error) {
          console.error("Error fetching users:", error)
        }
      }
    }
    fetchUsers()
  }, [cid])

  const handleCancel = () => {
    dispatch(setIsCreatingNewPost(false))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!summary.trim()) {
      newErrors.summary = "Summary is required"
    } else if (summary.length > 100) {
      newErrors.summary = "Summary must be 100 characters or less"
    }

    if (!details.trim()) {
      newErrors.details = "Details are required"
    }

    if (selectedFolders.length === 0) {
      newErrors.folders = "At least one folder is required"
    }

    if (visibility === "SELECTED_USERS" && selectedUsers.length === 0) {
      newErrors.users = "At least one user must be selected"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    const newPost = {
      type: postType,
      summary,
      details,
      author: currentUser._id,
      authorRole: currentUser.role,
      course: cid,
      folders: selectedFolders,
      visibility,
      visibleTo: visibility === "SELECTED_USERS" ? selectedUsers : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: [currentUser._id],
      answers: [],
    }

    try {
      const createdPost = await dispatch(createPost(newPost) as any)
      dispatch(setIsCreatingNewPost(false))
      dispatch(setSelectedPost(createdPost._id))
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  const handleFolderChange = (folderId: string) => {
    setSelectedFolders((prev) => (prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]))
  }

  const handleUserChange = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return (
    <div className="pazza-new-post">
      <h2>New Post</h2>

      <Tabs activeKey={postType} onSelect={(k) => setPostType(k as "QUESTION" | "NOTE")} className="mb-3">
        <Tab eventKey="QUESTION" title="Question" />
        <Tab eventKey="NOTE" title="Note" />
      </Tabs>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Post to</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="visibility-entire-class"
              label="Entire Class"
              name="visibility"
              checked={visibility === "ENTIRE_CLASS"}
              onChange={() => setVisibility("ENTIRE_CLASS")}
            />
            <Form.Check
              type="radio"
              id="visibility-selected-users"
              label="Individual Students/Instructors"
              name="visibility"
              checked={visibility === "SELECTED_USERS"}
              onChange={() => setVisibility("SELECTED_USERS")}
            />
          </div>
        </Form.Group>

        {visibility === "SELECTED_USERS" && (
          <Form.Group className="mb-3">
            <Form.Label>Select users</Form.Label>
            <div className="pazza-user-select">
              <Form.Check
                type="checkbox"
                id="user-instructors"
                label="Instructors"
                onChange={() => {
                  const instructorIds = users.filter((user) => user.role === "FACULTY").map((user) => user._id)

                  if (instructorIds.every((id) => selectedUsers.includes(id))) {
                    setSelectedUsers((prev) => prev.filter((id) => !instructorIds.includes(id)))
                  } else {
                    setSelectedUsers((prev) => [...prev, ...instructorIds.filter((id) => !prev.includes(id))])
                  }
                }}
              />

              {users.map((user) => (
                <Form.Check
                  key={user._id}
                  type="checkbox"
                  id={`user-${user._id}`}
                  label={`${user.firstName} ${user.lastName} (${user.role === "FACULTY" ? "Instructor" : "Student"})`}
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserChange(user._id)}
                />
              ))}
            </div>
            {errors.users && <div className="text-danger">{errors.users}</div>}
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Select Folder(s)</Form.Label>
          <div className="pazza-folder-select">
            {folders.map((folder: any) => (
              <Form.Check
                key={folder._id}
                type="checkbox"
                id={`folder-${folder._id}`}
                label={folder.name}
                checked={selectedFolders.includes(folder._id)}
                onChange={() => handleFolderChange(folder._id)}
              />
            ))}
          </div>
          {errors.folders && <div className="text-danger">{errors.folders}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type="text"
            placeholder="Brief summary of your question or note"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={100}
          />
          <Form.Text className="text-muted">{summary.length}/100 characters</Form.Text>
          {errors.summary && <div className="text-danger">{errors.summary}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Editor
            apiKey="your-tinymce-api-key" // You'll need to get an API key from TinyMCE
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            value={details}
            onEditorChange={setDetails}
          />
          {errors.details && <div className="text-danger">{errors.details}</div>}
        </Form.Group>

        <div className="pazza-form-actions">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {postType === "QUESTION" ? "Post My Question" : "Post My Note"}
          </Button>
        </div>
      </Form>
    </div>
  )
}

