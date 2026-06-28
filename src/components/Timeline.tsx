import { useState, useEffect, useCallback } from 'react'
import { loadPosts, savePosts } from '../utils/storage'
import { generateSampleData } from '../utils/sampleData'
import { isFirstLaunch } from '../utils/storage'
import type { Post } from '../types'
import PredictionCard from './PredictionCard'
import CapsuleCard from './CapsuleCard'

export default function Timeline() {
  const [posts, setPosts] = useState<Post[]>([])

  const refresh = useCallback(() => {
    if (isFirstLaunch()) {
      const samples = generateSampleData()
      savePosts(samples)
    }
    setPosts(loadPosts())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div className="flex flex-col gap-4">
      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-12">まだ投稿がありません</p>
      )}
      {posts.map((post) =>
        post.type === 'prediction' ? (
          <PredictionCard key={post.id} post={post} onUpdate={refresh} />
        ) : (
          <CapsuleCard key={post.id} post={post} />
        ),
      )}
    </div>
  )
}

export { Timeline }
