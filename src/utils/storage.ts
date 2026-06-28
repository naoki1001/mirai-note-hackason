import type { Post, ReviewStatus } from '../types'

const STORAGE_KEY = 'mirai-note-posts'

export function loadPosts(): Post[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw) as Post[]
}

export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function addPost(post: Post): void {
  const posts = loadPosts()
  posts.unshift(post)
  savePosts(posts)
}

export function updateReviewStatus(id: string, status: ReviewStatus): void {
  const posts = loadPosts()
  const target = posts.find((p) => p.id === id)
  if (target) {
    target.reviewStatus = status
    savePosts(posts)
  }
}

export function isFirstLaunch(): boolean {
  return localStorage.getItem(STORAGE_KEY) === null
}
