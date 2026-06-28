import { motion } from 'framer-motion'
import type { Post } from '../types'
import { useTime } from '../contexts/TimeContext'
import ReviewActions from './ReviewActions'

interface Props {
  post: Post
  onUpdate: () => void
}

function formatTargetDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PredictionCard({ post, onUpdate }: Props) {
  const { now } = useTime()
  const isPast = now >= post.targetDate

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 backdrop-blur-md bg-white/60 border border-white/40 shadow-md"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-400 to-purple-400 text-white">
          未来予想
        </span>
        <span className="px-2 py-0.5 rounded-full text-xs bg-white/80 text-gray-600">
          {post.category}
        </span>
      </div>

      <p className="text-gray-800 text-base leading-relaxed mb-3">{post.content}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>📅 {formatTargetDate(post.targetDate)}</span>
        {isPast && <span className="text-amber-600 font-medium">期日到来</span>}
      </div>

      {isPast && post.reviewStatus === 'none' && (
        <ReviewActions postId={post.id} onUpdate={onUpdate} />
      )}

      {post.reviewStatus !== 'none' && (
        <div className="mt-3 pt-3 border-t border-gray-200/50">
          <span className="text-sm text-gray-600">
            振り返り:{' '}
            {post.reviewStatus === 'fulfilled' && '✨ 叶った！'}
            {post.reviewStatus === 'missed' && '💭 外れた'}
            {post.reviewStatus === 'in_progress' && '🚀 まだ途中'}
          </span>
        </div>
      )}
    </motion.div>
  )
}
