"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Dropdown } from "react-bootstrap"
import { Editor } from "@tinymce/tinymce-react"
import { formatDistanceToNow } from "date-fns"
import { FaEye, FaEdit } from "react-icons/fa"
import { updatePost, deletePost, createAnswer, updateAnswer, deleteAnswer } from "../reducer"
import FollowupDiscussion from "../commponents/FollowupDiscussion"

export default function ViewPost() {
  const dispatch = useDispatch()
  const { selectedPost, posts, folders } = useSelector((state: any) => state.pazzaReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer)

  const [post, setPost] = useState<any>(null)
  const [studentAnswers, setStudentAnswers] = useState<any[]>([])
  const [instructorAnswers, setInstructorAnswers] = useState<any[]>([])
  const [newAnswer, setNewAnswer] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")

  // Find the current post and its answers
  useEffect(() => {
    if (selectedPost && posts.length > 0) {
      const currentPost = posts.find((p: any) => p._id === selectedPost)
      if (currentPost) {
        setPost(currentPost)

        // Separate student and instructor answers
        const sAnswers = currentPost.answers.filter((a: any) => a.authorRole !== "FACULTY")
        const iAnswers = currentPost.answers.filter((a: any) => a.authorRole === "FACULTY")

        setStudentAnswers(sAnswers)
        setInstructorAnswers(iAnswers)
      }
    }
  }, [selectedPost, posts])

  if (!post) {
    return <div>Loading...</div>
  }

  const handleEditPost = () => {
    setIsEditing(true)
    setEditedContent(post.details)
  }

  const handleSaveEdit = async () => {
    try {
      await dispatch(
        updatePost({
          ...post,
          details: editedContent,
          updatedAt: new Date().toISOString(),
        }) as any,
      )
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deletePost(post._id) as any)
      } catch (error) {
        console.error("Error deleting post:", error)
      }
    }
  }

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return

    const answer = {
      post: post._id,
      author: currentUser._id,
      authorRole: currentUser.role,
      content: newAnswer,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      await dispatch(createAnswer(answer) as any)
      setNewAnswer("")
    } catch (error) {
      console.error("Error creating answer:", error)
    }
  }

  const handleEditAnswer = async (answer: any, newContent: string) => {
    try {
      await dispatch(
        updateAnswer({
          ...answer,
          content: newContent,
          updatedAt: new Date().toISOString(),
        }) as any,
      )
    } catch (error) {
      console.error("Error updating answer:", error)
    }
  }

  const handleDeleteAnswer = async (answerId: string) => {
    if (window.confirm("Are you sure you want to delete this answer?")) {
      try {
        await dispatch(deleteAnswer(answerId) as any)
      } catch (error) {
        console.error("Error deleting answer:", error)
      }
    }
  }

  const canEdit = currentUser._id === post.author || currentUser.role === "FACULTY"
  const isInstructor = currentUser.role === "FACULTY"
  const isStudent = currentUser.role !== "FACULTY"
  const postFolders = folders.filter((f: any) => post.folders.includes(f._id))
  const createdAt = new Date(post.createdAt)
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

  return (
    <div className="pazza-view-post">
      <div className="pazza-post-header">
        <h2>{post.summary}</h2>
        <div className="pazza-post-meta">
          <span className="pazza-post-views">
            <FaEye /> {post.views.length} views
          </span>
          <span className="pazza-post-folders">
            {postFolders.map((folder: any) => (
              <span key={folder._id} className="pazza-post-folder">
                {folder.name}
              </span>
            ))}
          </span>
          <span className="pazza-post-author">
            Posted by {post.authorName || "User"} ({post.authorRole === "FACULTY" ? "Instructor" : "Student"})
          </span>
          <span className="pazza-post-time">{timeAgo}</span>
        </div>
      </div>

      <div className="pazza-post-content">
        {isEditing ? (
          <div className="pazza-post-edit">
            <Editor
              apiKey="your-tinymce-api-key"
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
              value={editedContent}
              onEditorChange={setEditedContent}
            />
            <div className="pazza-edit-actions">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveEdit}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post.details }} />
        )}
      </div>

      {canEdit && !isEditing && (
        <div className="pazza-post-actions">
          <Button variant="outline-primary" size="sm" onClick={handleEditPost}>
            <FaEdit /> Edit
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-actions">
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleEditPost}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={handleDeletePost} className="text-danger">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      {post.type === "QUESTION" && (
        <>
          {studentAnswers.length > 0 && (
            <div className="pazza-answers-section">
              <h3>Student's Answers</h3>
              {studentAnswers.map((answer: any) => (
                <div key={answer._id} className="pazza-answer">
                  <div className="pazza-answer-meta">
                    <span className="pazza-answer-author">{answer.authorName || "Student"}</span>
                    <span className="pazza-answer-time">
                      {formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="pazza-answer-content" dangerouslySetInnerHTML={{ __html: answer.content }} />
                  {(currentUser._id === answer.author || isInstructor) && (
                    <div className="pazza-answer-actions">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          // Implement edit answer functionality
                          const newContent = prompt("Edit your answer:", answer.content)
                          if (newContent) {
                            handleEditAnswer(answer, newContent)
                          }
                        }}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" id={`dropdown-actions-${answer._id}`}>
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              const newContent = prompt("Edit your answer:", answer.content)
                              if (newContent) {
                                handleEditAnswer(answer, newContent)
                              }
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteAnswer(answer._id)} className="text-danger">
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {instructorAnswers.length > 0 && (
            <div className="pazza-answers-section">
              <h3>Instructor's Answers</h3>
              {instructorAnswers.map((answer: any) => (
                <div key={answer._id} className="pazza-answer instructor-answer">
                  <div className="pazza-answer-meta">
                    <span className="pazza-answer-author">{answer.authorName || "Instructor"}</span>
                    <span className="pazza-answer-time">
                      {formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="pazza-answer-content" dangerouslySetInnerHTML={{ __html: answer.content }} />
                  {(currentUser._id === answer.author || isInstructor) && (
                    <div className="pazza-answer-actions">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          const newContent = prompt("Edit your answer:", answer.content)
                          if (newContent) {
                            handleEditAnswer(answer, newContent)
                          }
                        }}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" id={`dropdown-actions-${answer._id}`}>
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              const newContent = prompt("Edit your answer:", answer.content)
                              if (newContent) {
                                handleEditAnswer(answer, newContent)
                              }
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteAnswer(answer._id)} className="text-danger">
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Answer input section */}
          {((isStudent && studentAnswers.length === 0) || (isInstructor && instructorAnswers.length === 0)) && (
            <div className="pazza-new-answer">
              <h3>{isInstructor ? "Post an Instructor Answer" : "Post an Answer"}</h3>
              <Editor
                apiKey="your-tinymce-api-key"
                init={{
                  height: 200,
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
                value={newAnswer}
                onEditorChange={setNewAnswer}
              />
              <Button variant="primary" className="mt-2" onClick={handleSubmitAnswer} disabled={!newAnswer.trim()}>
                Submit Answer
              </Button>
            </div>
          )}
        </>
      )}

      <div className="pazza-followup-section">
        <h3>Follow-up Discussion</h3>
        <FollowupDiscussion postId={post._id} />
      </div>
    </div>
  )
}

