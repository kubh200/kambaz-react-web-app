import { useRef, useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import ReactQuill from "react-quill";
import { formatDistanceToNow } from "date-fns";
import * as client from "../client";

interface AnswerDiscussionsProps {
  answerId: string;
  currentUser: any;
}

interface Discussion {
  _id: string;
  post: string;
  answer: string;
  author: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  resolved: boolean;
  replies: Reply[];
}

interface Reply {
  _id: string;
  discussion: string;
  author: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentReply: string | null;
}

export default function AnswerDiscussions({ answerId, currentUser }: AnswerDiscussionsProps) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [editingDiscussionId, setEditingDiscussionId] = useState<string | null>(null);
  const [editingDiscussionContent, setEditingDiscussionContent] = useState("");
  const [replyContent, setReplyContent] = useState<{ [id: string]: string }>({});
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyContent, setEditingReplyContent] = useState<string>("");
  const [showEditor, setShowEditor] = useState(false);
  const quillRef = useRef<any>(null);
  const isInstructor = ["FACULTY", "TA"].includes(currentUser.role);
  // const [showReplyEditor, setShowReplyEditor] = useState<{ [id: string]: boolean }>({});
  const [showReplyEditor, setShowReplyEditor] = useState<{ [id: string]: boolean }>({});
  const refreshDiscussions = async () => {
    const fetched: Discussion[] = await client.fetchDiscussionsForAnswer(answerId);
    setDiscussions(fetched.map((d: Discussion) => ({ ...d, replies: d.replies || [] })));
  };

  useEffect(() => {
    const fetch = async () => {
      const fetched: Discussion[] = await client.fetchDiscussionsForAnswer(answerId);
      setDiscussions(fetched.map(d => ({ ...d, replies: d.replies || [] })));
    };
    fetch();
  }, [answerId]);

  useEffect(() => {
    if (showEditor && quillRef.current) {
      quillRef.current.focus();
    }
  }, [showEditor])

  const handleCreateDiscussion = async () => {
    const newDisc = await client.createDiscussion(
      answerId,
      {
        author: currentUser._id,
        authorName: currentUser.firstName + " "+ currentUser.lastName,
        authorRole: currentUser.role,
        content: newDiscussionContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        resolved: false,
      }
    );
    setDiscussions([...discussions, { ...newDisc, replies: [] }]);
    setNewDiscussionContent("");
  };

  const handleEditDiscussion = (disc: Discussion) => {
    setEditingDiscussionId(disc._id);
    setEditingDiscussionContent(disc.content);
  };

  const handleSaveDiscussionEdit = async () => {
    if (!editingDiscussionId) return;
    const updated = await client.updateDiscussion(editingDiscussionId, {
      content: editingDiscussionContent,
      updatedAt: new Date().toISOString()
    });
    setDiscussions(discussions.map(d => d._id === editingDiscussionId ? { ...d, content: updated.content } : d));
    setEditingDiscussionId(null);
    setEditingDiscussionContent("");
  };

  const handleDeleteDiscussion = async (id: string) => {
    await client.deleteDiscussion(id);
    setDiscussions(discussions.filter(d => d._id !== id));
  };

  const handleToggleResolved = async (disc: Discussion) => {
    const updated = await client.toggleDiscussionResolved({
      discussionId: disc._id,
      resolved: !disc.resolved
    });
    setDiscussions(discussions.map(d => d._id === updated._id ? { ...d, resolved: updated.resolved } : d));
  };

  const handleCreateReply = async (discussionId: string) => {
    const content = replyContent[discussionId];
    await client.createReply(discussionId, {
      // discussion: discussionId,
      author: currentUser._id,
      authorName: currentUser.firstName + " "+ currentUser.lastName,
      authorRole: currentUser.role,
      content,
      parentReply: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    // setDiscussions(discussions.map(d => d._id === discussionId ? { ...d, replies: [...d.replies, reply] } : d));
    await refreshDiscussions(); // ← Update the UI from server
    setReplyContent({ ...replyContent, [discussionId]: "" });
    setShowReplyEditor(prev => ({ ...prev, [discussionId]: false }));
  };

  const handleEditReply = (reply: Reply) => {
    setEditingReplyId(reply._id);
    setEditingReplyContent(reply.content);
  };

  const handleSaveReplyEdit = async (reply: Reply) => {
    await client.updateReply(reply._id, {
      content: editingReplyContent,
      updatedAt: new Date().toISOString()
    });
  
    // setDiscussions(discussions.map(d =>
    //   d._id === reply.discussion
    //     ? {
    //         ...d,
    //         replies: d.replies.map(r =>
    //           r._id === reply._id ? { ...r, content: updated.content, updatedAt: updated.updatedAt } : r
    //         )
    //       }
    //     : d
    // ));
    await refreshDiscussions(); // ← Update the UI from server
    setEditingReplyId(null);
    setEditingReplyContent("");
  };

  const handleDeleteReply = async (reply: Reply) => {
    await client.deleteReply(reply._id);  // 🔧 just pass the ID directly
    // setDiscussions(discussions.map(d =>
    //   d._id === reply.discussion
    //     ? { ...d, replies: d.replies.filter(r => r._id !== reply._id) }
    //     : d
    // ));
    await refreshDiscussions(); // ← Update the UI from server
  };

  return (
    <div className="mt-3">
      <h6>Follow-up Discussions</h6>

      {discussions.map(disc => (
        <div key={disc._id} className="border rounded p-3 mb-2">
          <div className="d-flex justify-content-between">
            <strong>{disc.authorName}</strong>
            <small>{formatDistanceToNow(new Date(disc.createdAt), { addSuffix: true })}</small>
          </div>

          {editingDiscussionId === disc._id ? (
            <>
              <ReactQuill value={editingDiscussionContent} onChange={setEditingDiscussionContent} />
              <div className="mt-2">
                <Button size="sm" onClick={handleSaveDiscussionEdit}>Save</Button>
                <Button size="sm" variant="secondary" onClick={() => setEditingDiscussionId(null)}>Cancel</Button>
              </div>
            </>
          ) : (
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: disc.content }} />
          )}

          <div className="d-flex justify-content-between mt-2">
            <Button
              size="sm"
              variant={disc.resolved ? "success" : "outline-secondary"}
              onClick={() => handleToggleResolved(disc)}
            >
              {disc.resolved ? "Resolved" : "Mark as Resolved"}
            </Button>

            {(disc.author === currentUser._id || isInstructor) && (
              <Dropdown>
                <Dropdown.Toggle size="sm" variant="link">Actions</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEditDiscussion(disc)}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDeleteDiscussion(disc._id)} className="text-danger">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          {/* Replies */}
          <div className="mt-3 ms-3">
            {disc.replies.map(reply => (
              <div key={reply._id} className="border-start ps-3 mb-2">
                <div className="d-flex justify-content-between">
                  <span><strong>{reply.authorName}</strong></span>
                  <small>{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</small>
                </div>

                {editingReplyId === reply._id ? (
                  <>
                    <ReactQuill value={editingReplyContent} onChange={setEditingReplyContent} />
                    <div className="mt-2">
                      <Button size="sm" onClick={() => handleSaveReplyEdit(reply)}>Save</Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditingReplyId(null)}>Cancel</Button>
                    </div>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: reply.content }} />
                )}

                {(reply.author === currentUser._id || isInstructor) && (
                  <Dropdown className="mt-1">
                    <Dropdown.Toggle size="sm" variant="link">Actions</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditReply(reply)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteReply(reply)} className="text-danger">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            ))}

            {/* <ReactQuill
              value={replyContent[disc._id] || ""}
              onChange={(val) => setReplyContent({ ...replyContent, [disc._id]: val })}
            />
            <Button className="mt-2" size="sm" onClick={() => handleCreateReply(disc._id)}>Reply</Button> */}
            {!showReplyEditor[disc._id] ? (
              <div
                className="border rounded p-3 text-muted mt-2"
                style={{ cursor: "text" }}
                onClick={() =>
                  setShowReplyEditor((prev) => ({ ...prev, [disc._id]: true }))
                }
              >
                Click here to reply...
              </div>
            ) : (
              <>
                <ReactQuill
                  value={replyContent[disc._id] || ""}
                  onChange={(val) => setReplyContent({ ...replyContent, [disc._id]: val })}
                />
                <div className="mt-2 d-flex gap-2">
                  <Button
                    size="sm"
                    onClick={async () => {
                      await handleCreateReply(disc._id);
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => {
                      setReplyContent({ ...replyContent, [disc._id]: "" });
                      setShowReplyEditor((prev) => ({ ...prev, [disc._id]: false }));
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Start new discussion */}
      <div className="mt-3">
        <h6>Start a new follow-up discussion</h6>

        {!showEditor ? (
          <div
            className="border rounded p-3 text-muted"
            style={{ cursor: "text" }}
            onClick={() => setShowEditor(true)}
          >
            Click here to start typing...
          </div>
        ) : (
          <>
            <ReactQuill
              ref={quillRef}
              value={newDiscussionContent}
              onChange={setNewDiscussionContent}
            />
            <div className="mt-2 d-flex gap-2">
              <Button
                size="sm"
                onClick={async () => {
                  await handleCreateDiscussion(); // assumes this is defined already
                  setShowEditor(false);          // 👈 hide editor
                  setNewDiscussionContent("");   // 👈 clear content
                }}
              >
                Submit
              </Button>
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => {
                  setNewDiscussionContent("");
                  setShowEditor(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
