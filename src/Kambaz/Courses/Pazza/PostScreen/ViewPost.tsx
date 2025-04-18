import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Dropdown, Form } from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import type { Answer, Post, Folder } from "../reducer"
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  deletePost,
  updatePost
} from "../reducer"
import { formatDistanceToNow } from "date-fns"
import * as client from "../client" // 🔧 Added for fetching answers

export default function ViewPost({ onReplyClick }: { onReplyClick: () => void }) {
  const dispatch = useDispatch()
  const { selectedPost, posts, folders } = useSelector((s: any) => s.pazzaReducer)
  const { currentUser } = useSelector((s: any) => s.accountReducer)

  const [post, setPost] = useState<Post | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([]) // 🔧 Added to hold answers
  const [isEditingPost, setIsEditingPost] = useState(false)
  const [editedSummary, setEditedSummary] = useState("")
  const [editedDetails, setEditedDetails] = useState("")
  const [studentEditorOpen, setStudentEditorOpen] = useState(false)
  const [instructorEditorOpen, setInstructorEditorOpen] = useState(false)
  const [composerContent, setComposerContent] = useState("")
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null)
  const [errors, setErrors] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (selectedPost) {
        const found = posts.find((p: Post) => p._id === selectedPost)
        setPost(found || null)
        if (found) {
          setEditedSummary(found.summary)
          setEditedDetails(found.details)
        }
        const fetchedAnswers = await client.fetchAnswersForPost(selectedPost) // 🔧 Fetch answers
        setAnswers(fetchedAnswers) // 🔧 Store them
      }
    }
    load()
  }, [selectedPost, posts]) // 🔧 Modified effect to fetch answers

  if (!post) return <div>Loading…</div>

  const isInstructor = ["FACULTY", "TA"].includes(currentUser.role)
  const isStudent = currentUser.role === "STUDENT"
  const isAuthor = currentUser._id === post.author

  const createdAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
  const postFolders = folders.filter((f: Folder) => post.folders.includes(f._id))

  const studentAnswers: Answer[] = answers.filter(a => a.authorRole === "STUDENT") // 🔧 Replaced post.answers
  const instructorAnswers: Answer[] = answers.filter(a => ["FACULTY", "TA"].includes(a.authorRole)) // 🔧 Replaced post.answers

  const handleSaveEdit = async () => {
    await dispatch(updatePost({
      ...post,
      summary: editedSummary,
      details: editedDetails,
      updatedAt: new Date().toISOString()
    }) as any)
    setIsEditingPost(false)
  }

  const handleSubmit = async () => {
    if (!composerContent.trim()) return setErrors("Answer cannot be empty")
    setErrors(null)

    if (editingAnswerId) {
      await dispatch(updateAnswer({ _id: editingAnswerId, content: composerContent }) as any)
      setEditingAnswerId(null)

      const refreshedAnswers = await client.fetchAnswersForPost(post._id)
      setAnswers(refreshedAnswers)
    } else {
        await dispatch(createAnswer({
        post: post._id,
        author: currentUser._id,
        authorRole: currentUser.role,
        authorName: currentUser.fullName,
        content: composerContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }) as any)

      // 🔧 Refresh the answer list after submission
      const newAnswers = await client.fetchAnswersForPost(post._id)
      setAnswers(newAnswers)
    }

    setComposerContent("")
    setStudentEditorOpen(false)
    setInstructorEditorOpen(false)
  }

  const handleEditAnswer = (ans: Answer) => {
    setEditingAnswerId(ans._id)
    setComposerContent(ans.content)
    // onReplyClick()
    if (ans.authorRole === "STUDENT") {
      setStudentEditorOpen(true); // 🔓 open student editor
    } else {
      setInstructorEditorOpen(true); // 🔓 open instructor editor
    }
  }

  const handleDeleteAnswer = async (answerId: string) => {
    await dispatch(deleteAnswer(answerId) as any)
    const updatedAnswers = await client.fetchAnswersForPost(post!._id) // 🔁 Refresh
    setAnswers(updatedAnswers)
  }

  return (
    <div className="p-4">
      {/* Post Detail */}
      <div className="mb-4 border-bottom pb-3">
        {isEditingPost ? (
          <>
            <Form.Control className="mb-2" value={editedSummary} onChange={(e) => setEditedSummary(e.target.value)} />
            <ReactQuill value={editedDetails} onChange={setEditedDetails} className="mb-2" />
            <div className="d-flex gap-2">
              <Button size="sm" onClick={handleSaveEdit}>Save</Button>
              <Button size="sm" variant="secondary" onClick={() => setIsEditingPost(false)}>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <div>
                <h2 className="fw-bold">{post.summary}</h2>
                <div className="text-muted mb-2">Posted {createdAgo}</div>
              </div>
              {(isAuthor || isInstructor) && (
                <div className="d-flex align-items-start gap-2">
                  <Button variant="outline-primary" size="sm" onClick={() => setIsEditingPost(true)}>Edit</Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">Actions</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setIsEditingPost(true)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => dispatch(deletePost(post._id) as any)} className="text-danger">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.details }} />
          </>
        )}
      </div>

      {/* Section 2: Student Answer */}
      {post.type === "QUESTION" && (
        <div className="mb-4">
          <h5>Student Answer</h5>

          {studentAnswers.length === 0 ? (
            isInstructor ? (
              <div className="text-muted">No student answers yet.</div>
            ) : (
              !studentEditorOpen && (
                <div
                  className="border rounded p-3 text-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setStudentEditorOpen(true)}
                >
                  Click here to add the student answer...
                </div>
              )
            )
          ) : (
            <>
              {studentAnswers.map(a => (
                <div key={a._id} className="border rounded p-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <strong>{a.authorName}</strong>
                    <small>{formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}</small>
                  </div>
                  <div className="mt-2" dangerouslySetInnerHTML={{ __html: a.content }} />
                  {(currentUser._id === a.author || isInstructor) && (
                    <Dropdown className="mt-2">
                      <Dropdown.Toggle variant="link" size="sm">Actions</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEditAnswer(a)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteAnswer(a._id)} className="text-danger">
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              ))}

              {/* Always allow students to add another answer */}
              {isStudent && !studentEditorOpen && (
                <div
                  className="border rounded p-3 text-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setStudentEditorOpen(true)}
                >
                  Add a student answer...
                </div>
              )}
            </>
          )}

          {/* Editor */}
          {isStudent && studentEditorOpen && (
            <>
              <ReactQuill theme="snow" value={composerContent} onChange={setComposerContent} />
              {errors && <div className="text-danger mt-2">{errors}</div>}
              <div className="mt-2">
                <Button size="sm" onClick={handleSubmit} className="me-2">Submit</Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => {
                    setComposerContent('');
                    setStudentEditorOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Section 3: Instructor Answer */}
      {post.type === "QUESTION" && (
        <div>
          <h5>Instructor Answer</h5>

          {instructorAnswers.length === 0 ? (
            isInstructor ? (
              !instructorEditorOpen && (
                <div
                  className="border rounded p-3 text-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setInstructorEditorOpen(true)}
                >
                  Click here to add the instructor answer...
                </div>
              )
            ) : (
              <div className="text-muted">No instructor answers yet.</div>
            )
          ) : (
            <>
              {instructorAnswers.map(a => (
                <div key={a._id} className="border rounded p-3 mb-2 bg-light">
                  <div className="d-flex justify-content-between">
                    <strong>{a.authorName}</strong>
                    <small>{formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}</small>
                  </div>
                  <div className="mt-2" dangerouslySetInnerHTML={{ __html: a.content }} />
                  {isInstructor && (
                    <Dropdown className="mt-2">
                      <Dropdown.Toggle variant="link" size="sm">Actions</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEditAnswer(a)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteAnswer(a._id)} className="text-danger">
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              ))}

              {/* Always allow instructors to add another answer */}
              {isInstructor && !instructorEditorOpen && (
                <div
                  className="border rounded p-3 text-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setInstructorEditorOpen(true)}
                >
                  Add an instructor answer...
                </div>
              )}
            </>
          )}

          {isInstructor && instructorEditorOpen && (
            <>
              <ReactQuill theme="snow" value={composerContent} onChange={setComposerContent} />
              {errors && <div className="text-danger mt-2">{errors}</div>}
              <div className="mt-2">
                <Button size="sm" onClick={handleSubmit} className="me-2">Submit</Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => {
                    setComposerContent('');
                    setInstructorEditorOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
