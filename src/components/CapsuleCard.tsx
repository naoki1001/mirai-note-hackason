import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'
import type { Post } from '../types'
import { useTime } from '../contexts/TimeContext'

interface Props {
  post: Post
}

function formatTargetDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getRemainingText(now: number, targetDate: number): string {
  const diff = targetDate - now
  const days = Math.ceil(diff / 86400000)
  if (days > 365) return `あと約${Math.floor(days / 365)}年`
  if (days > 30) return `あと約${Math.floor(days / 30)}ヶ月`
  return `あと${days}日`
}

export default function CapsuleCard({ post }: Props) {
  const { now } = useTime()
  const isOpen = now >= post.targetDate

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden shadow-md"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="open"
            initial={{ filter: 'blur(12px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-5 bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-md border border-purple-200/40"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center gap-1">
                <Unlock size={12} />
                開封済み
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-white/80 text-gray-600">
                {post.category}
              </span>
            </div>
            <p className="text-gray-800 text-base leading-relaxed mb-3">{post.content}</p>
            <div className="text-xs text-gray-500">
              📅 {formatTargetDate(post.targetDate)} に開封
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sealed"
            className="p-5 relative bg-white/30 backdrop-blur-xl border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-400 to-gray-500 text-white flex items-center gap-1">
                <Lock size={12} />
                封印中
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-white/80 text-gray-600">
                {post.category}
              </span>
            </div>
            <div className="relative">
              <p className="text-transparent select-none text-base leading-relaxed mb-3 blur-sm">
                {post.content}
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-gray-500 font-medium bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  🔒 {getRemainingText(now, post.targetDate)}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              📅 {formatTargetDate(post.targetDate)} に開封予定
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
