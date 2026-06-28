import { useRef } from 'react'
import { useMediaQuery } from '@mui/material'
import { TimeProvider } from './contexts/TimeContext'
import PostForm from './components/PostForm'
import Timeline, { type TimelineHandle } from './components/Timeline'
import TimeMachine from './components/TimeMachine'
import MobilePostFab from './components/MobilePostFab'

function App() {
  const timelineRef = useRef<TimelineHandle>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const refreshTimeline = () => {
    timelineRef.current?.refresh()
  }

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
          {!isMobile && <PostForm onPost={refreshTimeline} />}
          <Timeline ref={timelineRef} />
        </main>

        {isMobile && <MobilePostFab onPost={refreshTimeline} />}
        <TimeMachine />
      </div>
    </TimeProvider>
  )
}

export default App
