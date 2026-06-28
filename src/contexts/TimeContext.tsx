import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface TimeContextValue {
  now: number
  advance: (ms: number) => void
  reset: () => void
}

const TimeContext = createContext<TimeContextValue | null>(null)

export function TimeProvider({ children }: { children: ReactNode }) {
  const [offset, setOffset] = useState(0)

  const now = Date.now() + offset

  const advance = useCallback((ms: number) => {
    setOffset((prev) => prev + ms)
  }, [])

  const reset = useCallback(() => {
    setOffset(0)
  }, [])

  return (
    <TimeContext.Provider value={{ now, advance, reset }}>
      {children}
    </TimeContext.Provider>
  )
}

export function useTime() {
  const ctx = useContext(TimeContext)
  if (!ctx) throw new Error('useTime must be used within TimeProvider')
  return ctx
}
