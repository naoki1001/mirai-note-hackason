import { useState } from 'react'
import { Button, IconButton, Tooltip, Popover } from '@mui/material'
import { Clock, RotateCcw } from 'lucide-react'
import { useTime } from '../contexts/TimeContext'

const SKIP_OPTIONS = [
  { label: '+1週間', ms: 7 * 86400000 },
  { label: '+1ヶ月', ms: 30 * 86400000 },
  { label: '+1年', ms: 365 * 86400000 },
  { label: '+10年', ms: 3650 * 86400000 },
  { label: '+50年', ms: 18250 * 86400000 },
]

export default function TimeMachine() {
  const { now, advance, reset } = useTime()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const currentDate = new Date(now).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Tooltip title="タイムマシン" placement="left">
        <IconButton
          onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
          sx={{
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, #6366f1, #d946ef)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5, #c026d3)',
            },
          }}
        >
          <Clock size={20} />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              borderRadius: '16px',
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              width: 220,
              mb: 1,
            },
          },
        }}
      >
        <p className="text-xs text-gray-500 mb-1">仮想現在時刻</p>
        <p className="text-sm font-medium text-gray-800 mb-3">{currentDate}</p>

        <div className="flex flex-col gap-1.5">
          {SKIP_OPTIONS.map((opt) => (
            <Button
              key={opt.label}
              size="small"
              variant="outlined"
              onClick={() => advance(opt.ms)}
              fullWidth
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '0.75rem',
                justifyContent: 'flex-start',
              }}
            >
              ⏩ {opt.label}
            </Button>
          ))}
        </div>

        <Button
          size="small"
          onClick={reset}
          fullWidth
          startIcon={<RotateCcw size={14} />}
          sx={{ mt: 2, borderRadius: '10px', textTransform: 'none', fontSize: '0.75rem' }}
        >
          現在に戻る
        </Button>
      </Popover>
    </div>
  )
}
