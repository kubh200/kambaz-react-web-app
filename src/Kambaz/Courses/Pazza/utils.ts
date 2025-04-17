import { format, isToday, isYesterday, startOfWeek, endOfWeek, isWithinInterval } from "date-fns"

// Rename the function to make it clear it's not a reducer
export const groupPostsByDateCategory = (posts: any[]) => {
  const today = new Date()
  const startOfLastWeek = startOfWeek(today, { weekStartsOn: 1 })
  const endOfLastWeek = endOfWeek(today, { weekStartsOn: 1 })

  const result: { [key: string]: any[] } = {
    Today: [],
    Yesterday: [],
    "Last Week": [],
  }

  // Sort posts by createdAt in descending order (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  sortedPosts.forEach((post) => {
    const postDate = new Date(post.createdAt)

    if (isToday(postDate)) {
      result["Today"].push(post)
    } else if (isYesterday(postDate)) {
      result["Yesterday"].push(post)
    } else if (isWithinInterval(postDate, { start: startOfLastWeek, end: endOfLastWeek })) {
      result["Last Week"].push(post)
    } else {
      // For older posts, group by week
      const weekStart = startOfWeek(postDate, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(postDate, { weekStartsOn: 1 })
      const weekLabel = `${format(weekStart, "M/d")} - ${format(weekEnd, "M/d")}`

      if (!result[weekLabel]) {
        result[weekLabel] = []
      }
      result[weekLabel].push(post)
    }
  })

  // Remove empty categories
  Object.keys(result).forEach((key) => {
    if (result[key].length === 0) {
      delete result[key]
    }
  })

  return result
}
