import type { Post, Category, PostType } from '../types'

const CATEGORIES: Category[] = [
  '自分の未来',
  '仕事の未来',
  '技術の未来',
  '生活の未来',
  '社会の未来',
  '夢・目標',
]

const SAMPLE_PREDICTIONS: { content: string; category: Category; offsetDays: number }[] = [
  { content: '来週のプレゼン、きっとうまくいく。練習の成果を出し切る！', category: '仕事の未来', offsetDays: 7 },
  { content: 'AIが日常の家事を9割自動化している未来が来る', category: '技術の未来', offsetDays: 3650 },
  { content: '1年後には海外で働いている', category: '自分の未来', offsetDays: 365 },
  { content: '電気自動車が道路の8割を占めるようになる', category: '社会の未来', offsetDays: 5475 },
  { content: '3ヶ月後にはフルマラソン完走できる体力がついている', category: '夢・目標', offsetDays: 90 },
  { content: '50年後、人類は火星に恒久的な居住地を持っている', category: '社会の未来', offsetDays: 18250 },
]

const SAMPLE_CAPSULES: { content: string; category: Category; offsetDays: number }[] = [
  { content: '今の自分へ。毎日不安だけど、きっと乗り越えられてるよ。', category: '自分の未来', offsetDays: 30 },
  { content: '転職の決断、正しかったと思えていますか？', category: '仕事の未来', offsetDays: 365 },
  { content: '10年後の自分へ。あの頃描いた夢は叶いましたか？', category: '夢・目標', offsetDays: 3650 },
  { content: '今日始めた新しいプロジェクト、どこまで成長した？', category: '技術の未来', offsetDays: 180 },
]

// 過去に作成され、既にターゲット日を過ぎたサンプル
const PAST_PREDICTIONS: { content: string; category: Category; createdDaysAgo: number; targetDaysAgo: number }[] = [
  { content: '来月にはTypeScriptを使いこなせるようになっている', category: '技術の未来', createdDaysAgo: 60, targetDaysAgo: 30 },
  { content: '今年中に貯金100万円達成する', category: '自分の未来', createdDaysAgo: 200, targetDaysAgo: 10 },
]

function generateId(): string {
  return crypto.randomUUID()
}

export function generateSampleData(): Post[] {
  const now = Date.now()
  const DAY = 86400000

  const posts: Post[] = []

  for (const p of SAMPLE_PREDICTIONS) {
    posts.push({
      id: generateId(),
      type: 'prediction' as PostType,
      createdAt: now - Math.floor(Math.random() * 7 * DAY),
      targetDate: now + p.offsetDays * DAY,
      category: p.category,
      content: p.content,
      reviewStatus: 'none',
    })
  }

  for (const c of SAMPLE_CAPSULES) {
    posts.push({
      id: generateId(),
      type: 'capsule' as PostType,
      createdAt: now - Math.floor(Math.random() * 7 * DAY),
      targetDate: now + c.offsetDays * DAY,
      category: c.category,
      content: c.content,
      reviewStatus: 'none',
    })
  }

  for (const p of PAST_PREDICTIONS) {
    posts.push({
      id: generateId(),
      type: 'prediction' as PostType,
      createdAt: now - p.createdDaysAgo * DAY,
      targetDate: now - p.targetDaysAgo * DAY,
      category: p.category,
      content: p.content,
      reviewStatus: 'none',
    })
  }

  return posts.sort((a, b) => b.createdAt - a.createdAt)
}

export { CATEGORIES }
