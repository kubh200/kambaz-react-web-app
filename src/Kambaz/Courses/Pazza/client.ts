import axios from "axios"
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER
const PAZZA_API = `${REMOTE_SERVER}/api/pazza`

// Fetch course details
export const fetchCourse = async (courseId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}`)
  return response.data
}

// Fetch users enrolled in a course
export const fetchCourseUsers = async (courseId: string) => {
  try {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/users`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Users response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching course users:", error);
    throw error;
  }
}

// Posts
export const fetchPosts = async (courseId: string) => {
  const response = await axios.get(`${PAZZA_API}/courses/${courseId}/posts`)
  return response.data
}

export const createPost = async (post: any) => {
  const response = await axios.post(`${PAZZA_API}/posts`, post)
  return response.data
}

export const updatePost = async (post: any) => {
  const response = await axios.put(`${PAZZA_API}/posts/${post._id}`, post)
  return response.data
}

export const deletePost = async (postId: string) => {
  const response = await axios.delete(`${PAZZA_API}/posts/${postId}`)
  return response.data
}

// Answers
export const createAnswer = async (answer: any) => {
  const response = await axios.post(`${PAZZA_API}/answers`, answer)
  return response.data
}

export const updateAnswer = async (answer: any) => {
  const response = await axios.put(`${PAZZA_API}/answers/${answer._id}`, answer)
  return response.data
}

export const deleteAnswer = async (answerId: string) => {
  const response = await axios.delete(`${PAZZA_API}/answers/${answerId}`)
  return response.data
}

// Folders
export const fetchFolders = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${PAZZA_API}/courses/${courseId}/folders`)
  return response.data
}
// export const fetchFolders = async (courseId: string) => {
//   console.log("📦 Mock fetchFolders triggered for", courseId);

//   return [
//     { _id: `${courseId}_hw1`, name: "hw1", course: courseId },
//     { _id: `${courseId}_hw2`, name: "hw2", course: courseId },
//     { _id: `${courseId}_project`, name: "project", course: courseId },
//     { _id: `${courseId}_logistics`, name: "logistics", course: courseId },
//     { _id: `${courseId}_office`, name: "office_hours", course: courseId },
//   ];
// };

export const createFolder = async (folder: any) => {
  const response = await axiosWithCredentials.post(`${PAZZA_API}/folders`, folder)
  return response.data
}

export const updateFolder = async (folder: any) => {
  const response = await axiosWithCredentials.put(`${PAZZA_API}/folders/${folder._id}`, folder)
  return response.data
}

export const deleteFolder = async (folderId: string) => {
  const response = await axiosWithCredentials.delete(`${PAZZA_API}/folders/${folderId}`)
  return response.data
}

// Discussions
export const createDiscussion = async (discussion: any) => {
  const response = await axios.post(`${PAZZA_API}/discussions`, discussion)
  return response.data
}

export const updateDiscussion = async (discussion: any) => {
  const response = await axios.put(`${PAZZA_API}/discussions/${discussion.discussionId}`, discussion)
  return response.data
}

export const deleteDiscussion = async (discussionId: string) => {
  const response = await axios.delete(`${PAZZA_API}/discussions/${discussionId}`)
  return response.data
}

export const toggleDiscussionResolved = async (data: { discussionId: string; resolved: boolean }) => {
  const response = await axios.put(`${PAZZA_API}/discussions/${data.discussionId}/resolved`, {
    resolved: data.resolved,
  })
  return response.data
}

// Replies
export const createReply = async (reply: any) => {
  const response = await axios.post(`${PAZZA_API}/discussions/${reply.discussion}/replies`, reply)
  return response.data
}

export const updateReply = async (data: {
  replyId: string
  discussionId: string
  content: string
  updatedAt: string
}) => {
  const response = await axios.put(`${PAZZA_API}/discussions/${data.discussionId}/replies/${data.replyId}`, data)
  return response.data
}

export const deleteReply = async (data: { replyId: string; discussionId: string }) => {
  const response = await axios.delete(`${PAZZA_API}/discussions/${data.discussionId}/replies/${data.replyId}`)
  return response.data
}

