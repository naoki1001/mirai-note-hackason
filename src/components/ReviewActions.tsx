import { Button } from '@mui/material'
import { updateReviewStatus } from '../utils/storage'
import type { ReviewStatus } from '../types'

interface Props {
  postId: string
  onUpdate: () => void
}

const ACTIONS: { label: string; status: ReviewStatus; emoji: string }[] = [
  { label: '叶った', status: 'fulfilled', emoji: '✨' },
  { label: '外れた', status: 'missed', emoji: '💭' },
  { label: 'まだ途中', status: 'in_progress', emoji: '🚀' },
]

export default function ReviewActions({ postId, onUpdate }: Props) {
  const handleClick = (status: ReviewStatus) => {
    updateReviewStatus(postId, status)
    onUpdate()
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200/50 flex gap-2">
      {ACTIONS.map((a) => (
        <Button
          key={a.status}
          size="small"
          variant="outlined"
          onClick={() => handleClick(a.status)}
          sx={{ borderRadius: '20px', textTransform: 'none', fontSize: '0.75rem' }}
        >
          {a.emoji} {a.label}
        </Button>
      ))}
    </div>
  )
}
