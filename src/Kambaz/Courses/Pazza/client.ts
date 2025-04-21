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
  const response = await axiosWithCredentials.get(`${PAZZA_API}/courses/${courseId}/posts`)
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

export const fetchPostById = async (postId: string) => {
  const response = await axios.get(`${PAZZA_API}/posts/${postId}`);
  return response.data;
};

export const incrementPostView = async (postId: string) => {
  console.log("Increment view hit for post", postId); // 👈 Add this
  await axiosWithCredentials.put(`${REMOTE_SERVER}/api/pazza/posts/${postId}/view`);
};

// Answers
export const createAnswer = async (answer: any) => {
  const response = await axios.post(
    `${PAZZA_API}/posts/${answer.post}/answers`,
    answer
  )
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

// Get all answers for a given post
export const fetchAnswersForPost = async (postId: string) => {
  const response = await axios.get(`${PAZZA_API}/posts/${postId}/answers`);
  return response.data;
};

// (Optional) Get a single answer by its id
export const fetchAnswerById = async (answerId: string) => {
  const response = await axios.get(`${PAZZA_API}/answers/${answerId}`);
  return response.data;
};
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
export const fetchDiscussionsForAnswer = async (answerId: string) => {
  const { data } = await axios.get(`${PAZZA_API}/answers/${answerId}/discussions`);
  return data;
};

export const createDiscussion = async (answerId: string, discussion: any) => {
  const { data } = await axios.post(`${PAZZA_API}/answers/${answerId}/discussions`, discussion);
  return data;
};

export const updateDiscussion = async (discussionId: string, updates: any) => {
  const { data } = await axios.put(`${PAZZA_API}/discussions/${discussionId}`, updates);
  return data;
};

export const deleteDiscussion = async (discussionId: string) => {
  await axios.delete(`${PAZZA_API}/discussions/${discussionId}`);
};

export const toggleDiscussionResolved = async ({ discussionId, resolved }: { discussionId: string, resolved: boolean }) => {
  const { data } = await axios.put(`${PAZZA_API}/discussions/${discussionId}/resolved`, { resolved });
  return data;
};

// Replies
export const createReply = async (discussionId: string, reply: any) => {
  const response = await axios.post(`${PAZZA_API}/discussions/${discussionId}/replies`, reply);
  return response.data;
};

export const fetchRepliesForDiscussion = async (discussionId: string) => {
  const response = await axios.get(`${PAZZA_API}/discussions/${discussionId}/replies`);
  return response.data;
};

export const fetchReplyById = async (replyId: string) => {
  const response = await axios.get(`${PAZZA_API}/replies/${replyId}`);
  return response.data;
};

export const updateReply = async (replyId: string, reply: any) => {
  const response = await axios.put(`${PAZZA_API}/replies/${replyId}`, reply);
  return response.data;
};

export const deleteReply = async (replyId: string) => {
  const response = await axios.delete(`${PAZZA_API}/replies/${replyId}`);
  return response.data;
};
