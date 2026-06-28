import { useState, useEffect, useCallback, useMemo, useImperativeHandle, forwardRef } from 'react'
import { Tabs, Tab } from '@mui/material'
import { Home, Sparkles, Unlock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadPosts, savePosts } from '../utils/storage'
import { generateSampleData } from '../utils/sampleData'
import { isFirstLaunch } from '../utils/storage'
import { useTime } from '../contexts/TimeContext'
import type { Post } from '../types'
import PredictionCard from './PredictionCard'
import CapsuleCard from './CapsuleCard'

export interface TimelineHandle {
  refresh: () => void
}

const Timeline = forwardRef<TimelineHandle>(function Timeline(_, ref) {
  const { now } = useTime()
  const [posts, setPosts] = useState<Post[]>([])
  const [tab, setTab] = useState(0)

  const refresh = useCallback(() => {
    if (isFirstLaunch()) {
      const samples = generateSampleData()
      savePosts(samples)
    }
    setPosts(loadPosts())
  }, [])

  useImperativeHandle(ref, () => ({ refresh }))

  useEffect(() => {
    refresh()
  }, [refresh])

  const filteredPosts = useMemo(() => {
    switch (tab) {
      case 1:
        return posts.filter((p) => p.type === 'prediction')
      case 2:
        return posts.filter((p) => p.type === 'capsule' && now >= p.targetDate)
      default:
        return posts
    }
  }, [posts, tab, now])

  const [[page, direction], setPage] = useState([0, 0])

  const handleTabChange = (_: unknown, newValue: number) => {
    setPage([newValue, newValue > tab ? 1 : -1])
    setTab(newValue)
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold && tab < 2) {
      setPage([tab + 1, 1])
      setTab(tab + 1)
    } else if (info.offset.x > swipeThreshold && tab > 0) {
      setPage([tab - 1, -1])
      setTab(tab - 1)
    }
  }

  const swipeVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 200 : -200, opacity: 0 }),
  }

  return (
    <div>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 2,
          '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, minHeight: 48 },
          '& .MuiTabs-indicator': {
            background: 'linear-gradient(90deg, #6366f1, #d946ef)',
            height: 3,
            borderRadius: 2,
          },
        }}
      >
        <Tab icon={<Home size={16} />} iconPosition="start" label="ホーム" />
        <Tab icon={<Sparkles size={16} />} iconPosition="start" label="未来予想" />
        <Tab icon={<Unlock size={16} />} iconPosition="start" label="開封済み" />
      </Tabs>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={swipeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="flex flex-col gap-4"
        >
          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              {tab === 0 && 'まだ投稿がありません'}
              {tab === 1 && '未来予想はまだありません'}
              {tab === 2 && '開封されたカプセルはまだありません'}
            </p>
          )}
          {filteredPosts.map((post) =>
            post.type === 'prediction' ? (
              <PredictionCard key={post.id} post={post} onUpdate={refresh} />
            ) : (
              <CapsuleCard key={post.id} post={post} />
            ),
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
})

export default Timeline
