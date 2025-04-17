import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import * as client from "./client"

// Define interfaces for our data models
interface Post {
  _id: string
  summary: string
  details: string
  type: string;
  author: string
  authorRole: string
  authorName?: string
  course: string
  folders: string[]
  visibility: string
  visibleTo: string[]
  createdAt: string
  updatedAt: string
  views: string[]
  answers: Answer[]
}

interface Answer {
  _id: string
  post: string
  author: string
  authorName?: string
  authorRole: string
  content: string
  createdAt: string
  updatedAt: string
}

interface Folder {
  _id: string
  name: string
  course: string
}

interface Discussion {
  _id: string
  post: string
  author: string
  authorName: string
  authorRole: string
  content: string
  createdAt: string
  updatedAt: string
  resolved: boolean
  replies: Reply[]
}

interface Reply {
  _id: string
  discussion: string
  author: string
  authorName: string
  authorRole: string
  content: string
  createdAt: string
  updatedAt: string
  parentReply: string | null
}

// Define the state interface
interface PazzaState {
  posts: Post[]
  folders: Folder[]
  discussions: Discussion[]
  selectedPost: string | null
  selectedFolder: string | null
  isPostSidebarVisible: boolean
  isCreatingNewPost: boolean
  loading: boolean
  error: string | null
}

// Async thunks
export const fetchPosts = createAsyncThunk<Post[], string>("pazza/fetchPosts", async (courseId: string) => {
  const response = await client.fetchPosts(courseId)
  return response
})

export const createPost = createAsyncThunk<Post, any>("pazza/createPost", async (post: any) => {
  const response = await client.createPost(post)
  return response
})

export const updatePost = createAsyncThunk<Post, any>("pazza/updatePost", async (post: any) => {
  const response = await client.updatePost(post)
  return response
})

export const deletePost = createAsyncThunk<string, string>("pazza/deletePost", async (postId: string) => {
  await client.deletePost(postId)
  return postId
})

export const createAnswer = createAsyncThunk<Answer, any>("pazza/createAnswer", async (answer: any) => {
  const response = await client.createAnswer(answer)
  return response
})

export const updateAnswer = createAsyncThunk<Answer, any>("pazza/updateAnswer", async (answer: any) => {
  const response = await client.updateAnswer(answer)
  return response
})

export const deleteAnswer = createAsyncThunk<string, string>("pazza/deleteAnswer", async (answerId: string) => {
  await client.deleteAnswer(answerId)
  return answerId
})

export const fetchFolders = createAsyncThunk<Folder[], string>("pazza/fetchFolders", async (courseId: string) => {
  const response = await client.fetchFolders(courseId)
  return response
})

export const createFolder = createAsyncThunk<Folder, any>("pazza/createFolder", async (folder: any) => {
  const response = await client.createFolder(folder)
  return response
})

export const updateFolder = createAsyncThunk<Folder, any>("pazza/updateFolder", async (folder: any) => {
  const response = await client.updateFolder(folder)
  return response
})

export const deleteFolder = createAsyncThunk<string, string>("pazza/deleteFolder", async (folderId: string) => {
  await client.deleteFolder(folderId)
  return folderId
})

export const createDiscussion = createAsyncThunk<Discussion, any>("pazza/createDiscussion", async (discussion: any) => {
  const response = await client.createDiscussion(discussion)
  return response
})

export const updateDiscussion = createAsyncThunk<any, any>("pazza/updateDiscussion", async (discussion: any) => {
  const response = await client.updateDiscussion(discussion)
  return response
})

export const deleteDiscussion = createAsyncThunk<string, string>(
  "pazza/deleteDiscussion",
  async (discussionId: string) => {
    await client.deleteDiscussion(discussionId)
    return discussionId
  },
)

interface ToggleResolvedParams {
  discussionId: string
  resolved: boolean
}

export const toggleDiscussionResolved = createAsyncThunk<any, ToggleResolvedParams>(
  "pazza/toggleDiscussionResolved",
  async (data: ToggleResolvedParams) => {
    const response = await client.toggleDiscussionResolved(data)
    return response
  },
)

export const createReply = createAsyncThunk<Reply, any>("pazza/createReply", async (reply: any) => {
  const response = await client.createReply(reply)
  return response
})

interface UpdateReplyParams {
  replyId: string
  discussionId: string
  content: string
  updatedAt: string
}

export const updateReply = createAsyncThunk<any, UpdateReplyParams>(
  "pazza/updateReply",
  async (data: UpdateReplyParams) => {
    const response = await client.updateReply(data)
    return response
  },
)

interface DeleteReplyParams {
  replyId: string
  discussionId: string
}

export const deleteReply = createAsyncThunk<DeleteReplyParams, DeleteReplyParams>(
  "pazza/deleteReply",
  async (data: DeleteReplyParams) => {
    await client.deleteReply(data)
    return data
  },
)

// Initial state with proper typing
const initialState: PazzaState = {
  posts: [],
  folders: [],
  discussions: [],
  selectedPost: null,
  selectedFolder: null,
  isPostSidebarVisible: true,
  isCreatingNewPost: false,
  loading: false,
  error: null,
}

// Slice
const pazzaSlice = createSlice({
  name: "pazza",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
      },
    setSelectedPost: (state, action: PayloadAction<string | null>) => {
      state.selectedPost = action.payload
      state.isCreatingNewPost = false
    },
    setSelectedFolder: (state, action: PayloadAction<string | null>) => {
      state.selectedFolder = action.payload
    },
    togglePostSidebar: (state) => {
      state.isPostSidebarVisible = !state.isPostSidebarVisible
    },
    setIsCreatingNewPost: (state, action: PayloadAction<boolean>) => {
      state.isCreatingNewPost = action.payload
      if (action.payload) {
        state.selectedPost = null
      }
    },
  },
  extraReducers: (builder) => {
    // Posts
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.loading = false
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload]
      state.loading = false
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
      state.loading = false
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload)
      state.selectedPost = null
      state.loading = false
    })

    // Answers
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex((post) => post._id === action.payload.post)
      if (postIndex !== -1) {
        if (!state.posts[postIndex].answers) {
          state.posts[postIndex].answers = []
        }
        state.posts[postIndex].answers.push(action.payload)
      }
      state.loading = false
    })
    builder.addCase(updateAnswer.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex((post) => post._id === action.payload.post)
      if (postIndex !== -1) {
        const answerIndex = state.posts[postIndex].answers.findIndex((answer) => answer._id === action.payload._id)
        if (answerIndex !== -1) {
          state.posts[postIndex].answers[answerIndex] = action.payload
        }
      }
      state.loading = false
    })
    builder.addCase(deleteAnswer.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => ({
        ...post,
        answers: post.answers ? post.answers.filter((answer) => answer._id !== action.payload) : [],
      }))
      state.loading = false
    })

    // Folders
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload
      state.loading = false
    })
    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.folders.push(action.payload)
      state.loading = false
    })
    builder.addCase(updateFolder.fulfilled, (state, action) => {
      const index = state.folders.findIndex((folder) => folder._id === action.payload._id)
      if (index !== -1) {
        state.folders[index] = action.payload
      }
      state.loading = false
    })
    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      state.folders = state.folders.filter((folder) => folder._id !== action.payload)
      state.loading = false
    })

    // Discussions
    builder.addCase(createDiscussion.fulfilled, (state, action) => {
      state.discussions.push(action.payload)
      state.loading = false
    })
    builder.addCase(updateDiscussion.fulfilled, (state, action) => {
      const index = state.discussions.findIndex((discussion) => discussion._id === action.payload._id)
      if (index !== -1) {
        state.discussions[index] = {
          ...state.discussions[index],
          content: action.payload.content,
          updatedAt: action.payload.updatedAt,
        }
      }
      state.loading = false
    })
    builder.addCase(deleteDiscussion.fulfilled, (state, action) => {
      state.discussions = state.discussions.filter((discussion) => discussion._id !== action.payload)
      state.loading = false
    })
    builder.addCase(toggleDiscussionResolved.fulfilled, (state, action) => {
      const index = state.discussions.findIndex((discussion) => discussion._id === action.payload._id)
      if (index !== -1) {
        state.discussions[index].resolved = action.payload.resolved
      }
      state.loading = false
    })

    // Replies
    builder.addCase(createReply.fulfilled, (state, action) => {
      const discussionIndex = state.discussions.findIndex((discussion) => discussion._id === action.payload.discussion)
      if (discussionIndex !== -1) {
        if (!state.discussions[discussionIndex].replies) {
          state.discussions[discussionIndex].replies = []
        }
        state.discussions[discussionIndex].replies.push(action.payload)
      }
      state.loading = false
    })
    builder.addCase(updateReply.fulfilled, (state, action) => {
      const discussionIndex = state.discussions.findIndex((discussion) => discussion._id === action.payload.discussion)
      if (discussionIndex !== -1) {
        const replyIndex = state.discussions[discussionIndex].replies.findIndex(
          (reply) => reply._id === action.payload._id,
        )
        if (replyIndex !== -1) {
          state.discussions[discussionIndex].replies[replyIndex] = {
            ...state.discussions[discussionIndex].replies[replyIndex],
            content: action.payload.content,
            updatedAt: action.payload.updatedAt,
          }
        }
      }
      state.loading = false
    })
    builder.addCase(deleteReply.fulfilled, (state, action) => {
      const discussionIndex = state.discussions.findIndex(
        (discussion) => discussion._id === action.payload.discussionId,
      )
      if (discussionIndex !== -1) {
        state.discussions[discussionIndex].replies = state.discussions[discussionIndex].replies.filter(
          (reply) => reply._id !== action.payload.replyId,
        )
      }
      state.loading = false
    })
  },
})

export const { setPosts, setSelectedPost, setSelectedFolder, togglePostSidebar, setIsCreatingNewPost } = pazzaSlice.actions

export default pazzaSlice.reducer
