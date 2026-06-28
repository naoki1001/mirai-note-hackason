export type PostType = 'prediction' | 'capsule'

export type ReviewStatus = 'none' | 'fulfilled' | 'missed' | 'in_progress'

export type Category =
  | '自分の未来'
  | '仕事の未来'
  | '技術の未来'
  | '生活の未来'
  | '社会の未来'
  | '夢・目標'

export interface Post {
  id: string
  type: PostType
  createdAt: number
  targetDate: number
  category: Category
  content: string
  reviewStatus: ReviewStatus
}
