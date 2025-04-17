"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Form } from "react-bootstrap"
import { FaCheck, FaTimes, FaReply, FaEdit, FaTrash } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"
import {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  createReply,
  updateReply,
  deleteReply,
  toggleDiscussionResolved,
} from "../reducer"

interface FollowupDiscussionProps {
  postId: string
}

export default function FollowupDiscussion({ postId }: FollowupDiscussionProps) {
  const dispatch = useDispatch()
  const { discussions } = useSelector((state: any) => state.pazzaReducer)
  const { currentUser } = useSelector((state: any) => state.accountReducer)

  const [newDiscussion, setNewDiscussion] = useState("")
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({})
  const [editingDiscussion, setEditingDiscussion] = useState<string | null>(null)
  const [editingReply, setEditingReply] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Filter discussions for this post
  const postDiscussions = discussions.filter((d: any) => d.post === postId)

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.trim()) return

    const discussion = {
      post: postId,
      author: currentUser._id,
      authorName: `${currentUser.firstName} ${currentUser.lastName}`,
      authorRole: currentUser.role,
      content: newDiscussion,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolved: false,
      replies: [],
    }

    try {
      await dispatch(createDiscussion(discussion) as any)
      setNewDiscussion("")
    } catch (error) {
      console.error("Error creating discussion:", error)
    }
  }

  const handleToggleResolved = async (discussionId: string, resolved: boolean) => {
    try {
      await dispatch(toggleDiscussionResolved({ discussionId, resolved }) as any)
    } catch (error) {
      console.error("Error toggling resolved status:", error)
    }
  }

  const handleEditDiscussion = (discussion: any) => {
    setEditingDiscussion(discussion._id)
    setEditText(discussion.content)
  }

  const handleSaveDiscussionEdit = async (discussionId: string) => {
    try {
      await dispatch(
        updateDiscussion({
          discussionId,
          content: editText,
          updatedAt: new Date().toISOString(),
        }) as any,
      )
      setEditingDiscussion(null)
    } catch (error) {
      console.error("Error updating discussion:", error)
    }
  }

  const handleDeleteDiscussion = async (discussionId: string) => {
    if (window.confirm("Are you sure you want to delete this discussion?")) {
      try {
        await dispatch(deleteDiscussion(discussionId) as any)
      } catch (error) {
        console.error("Error deleting discussion:", error)
      }
    }
  }

  const handleCreateReply = async (discussionId: string) => {
    const replyText = replyTexts[discussionId]
    if (!replyText || !replyText.trim()) return

    const reply = {
      discussion: discussionId,
      author: currentUser._id,
      authorName: `${currentUser.firstName} ${currentUser.lastName}`,
      authorRole: currentUser.role,
      content: replyText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentReply: null,
    }

    try {
      await dispatch(createReply(reply) as any)
      setReplyTexts((prev) => ({ ...prev, [discussionId]: "" }))
    } catch (error) {
      console.error("Error creating reply:", error)
    }
  }

  const handleEditReply = (reply: any) => {
    setEditingReply(reply._id)
    setEditText(reply.content)
  }

  const handleSaveReplyEdit = async (replyId: string, discussionId: string) => {
    try {
      await dispatch(
        updateReply({
          replyId,
          discussionId,
          content: editText,
          updatedAt: new Date().toISOString(),
        }) as any,
      )
      setEditingReply(null)
    } catch (error) {
      console.error("Error updating reply:", error)
    }
  }

  const handleDeleteReply = async (replyId: string, discussionId: string) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      try {
        await dispatch(deleteReply({ replyId, discussionId }) as any)
      } catch (error) {
        console.error("Error deleting reply:", error)
      }
    }
  }

  const canModify = (authorId: string) => {
    return currentUser._id === authorId || currentUser.role === "FACULTY"
  }

  return (
    <div className="pazza-followup-discussions">
      {postDiscussions.map((discussion: any) => (
        <div key={discussion._id} className="pazza-discussion">
          <div className="pazza-discussion-header">
            <div className="pazza-discussion-meta">
              <span className="pazza-discussion-author">
                {discussion.authorName || "User"} ({discussion.authorRole === "FACULTY" ? "Instructor" : "Student"})
              </span>
              <span className="pazza-discussion-time">
                {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
              </span>
            </div>
            <div className="pazza-discussion-actions">
              <Button
                variant={discussion.resolved ? "success" : "outline-success"}
                size="sm"
                onClick={() => handleToggleResolved(discussion._id, !discussion.resolved)}
              >
                {discussion.resolved ? (
                  <>
                    <FaCheck /> Resolved
                  </>
                ) : (
                  <>
                    <FaTimes /> Unresolved
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="pazza-discussion-content">
            {editingDiscussion === discussion._id ? (
              <div className="pazza-discussion-edit">
                <Form.Control as="textarea" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <div className="pazza-edit-actions mt-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditingDiscussion(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => handleSaveDiscussionEdit(discussion._id)}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p>{discussion.content}</p>
            )}
          </div>

          {canModify(discussion.author) && editingDiscussion !== discussion._id && (
            <div className="pazza-discussion-controls">
              <Button variant="outline-primary" size="sm" onClick={() => handleEditDiscussion(discussion)}>
                <FaEdit /> Edit
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteDiscussion(discussion._id)}>
                <FaTrash /> Delete
              </Button>
            </div>
          )}

          {/* Replies */}
          <div className="pazza-replies">
            {discussion.replies.map((reply: any) => (
              <div key={reply._id} className="pazza-reply">
                <div className="pazza-reply-meta">
                  <span className="pazza-reply-author">
                    {reply.authorName || "User"} ({reply.authorRole === "FACULTY" ? "Instructor" : "Student"})
                  </span>
                  <span className="pazza-reply-time">
                    {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                  </span>
                </div>

                <div className="pazza-reply-content">
                  {editingReply === reply._id ? (
                    <div className="pazza-reply-edit">
                      <Form.Control as="textarea" value={editText} onChange={(e) => setEditText(e.target.value)} />
                      <div className="pazza-edit-actions mt-2">
                        <Button variant="secondary" size="sm" onClick={() => setEditingReply(null)}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSaveReplyEdit(reply._id, discussion._id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p>{reply.content}</p>
                  )}
                </div>

                {canModify(reply.author) && editingReply !== reply._id && (
                  <div className="pazza-reply-controls">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEditReply(reply)}>
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteReply(reply._id, discussion._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reply form */}
          <div className="pazza-reply-form">
            <Form.Control
              as="textarea"
              placeholder="Reply to this discussion..."
              value={replyTexts[discussion._id] || ""}
              onChange={(e) => setReplyTexts((prev) => ({ ...prev, [discussion._id]: e.target.value }))}
            />
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={() => handleCreateReply(discussion._id)}
              disabled={!replyTexts[discussion._id] || !replyTexts[discussion._id].trim()}
            >
              <FaReply /> Reply
            </Button>
          </div>
        </div>
      ))}

      {/* New discussion form */}
      <div className="pazza-new-discussion">
        <h4>Start a new followup discussion</h4>
        <Form.Control
          as="textarea"
          placeholder="Type your discussion here..."
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={handleCreateDiscussion} disabled={!newDiscussion.trim()}>
          Post Discussion
        </Button>
      </div>
    </div>
  )
}

