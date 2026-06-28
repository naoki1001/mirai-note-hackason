import { useState, useCallback } from 'react'
import { TimeProvider } from './contexts/TimeContext'
import PostForm from './components/PostForm'
import Timeline from './components/Timeline'
import TimeMachine from './components/TimeMachine'

function App() {
  const [timelineKey, setTimelineKey] = useState(0)

  const refreshTimeline = useCallback(() => {
    setTimelineKey((k) => k + 1)
  }, [])

  return (
    <TimeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-white/50">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mirai Note
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">未来のことしか呟けないSNS</p>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6 pb-24">
          <PostForm onPost={refreshTimeline} />
          <Timeline key={timelineKey} />
        </main>

        <TimeMachine />
      </div>
    </TimeProvider>
  )
}

export default App
